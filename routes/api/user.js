var _ = require('lodash');
var mongoose = require('mongoose');
var User = require('../../models/user');

module.exports.addUser = function(req, res) {
  var user = new User(req.body.user);
  user.save(function(err) {
    if (err) return res.send(err);
    user.password = "*";
    res.json({user: user});
  });
};

module.exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err) {
      return res.send(err);
    }
    res.json({users: users});
  });
};

module.exports.getUser = function(req, res, id) {
  User.findById(id, function(err, user) {
    if (err) return res.send(err);
    res.json({user: user});
  });
};

module.exports.updateUser = function(req, res, id) {
  User.findById(id, function(err, user) {
    if (err) return res.send(err);
    if (user.username !== req.user.username) return res.sendStatus(401);
    user = _.extend(user, req.body.user);
    user.save(function(err) {
      if (err) return res.send(err);
      if (typeof user.password !== "undefined") user.password = "*";
      res.json({user: user});
    });
  });
};

module.exports.deleteUser = function(req, res, id) {
  User.findById(id, function(err, user) {
    if (err) return res.send(err);
    if (user.username !== req.user.username) return res.sendStatus(401);
    user.remove();
    res.sendStatus(200);
  });
};

