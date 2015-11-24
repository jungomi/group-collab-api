var _ = require('lodash');
var mongoose = require('mongoose');
var User = require('../../models/user');

module.exports.addUser = function(req, res, next) {
  var user = new User(req.body.user);
  user.save(function(err) {
    if (err) {
      return next(err);
    }
    user.password = "*";
    res.status(201).json({user: user});
  });
};

module.exports.getUsers = function(req, res, next) {
  User.find(function(err, users) {
    if (err) {
      return next(err);
    }
    res.json({users: users});
  });
};

module.exports.getUser = function(req, res, id, next) {
  User.findById(id, function(err, user) {
    if (err) {
      return next(err);
    }
    if (user === null) return res.sendStatus(404);
    res.json({user: user});
  });
};

module.exports.updateUser = function(req, res, id, next) {
  User.findById(id, function(err, user) {
    if (err) {
      return next(err);
    }
    if (user === null) return res.sendStatus(404);
    if (user.username !== req.user.username) return res.sendStatus(403);
    user = _.extend(user, req.body.user);
    user.save(function(err) {
      if (err) {
        return next(err);
      }
      if (typeof user.password !== "undefined") user.password = "*";
      res.json({user: user});
    });
  });
};

module.exports.deleteUser = function(req, res, id, next) {
  User.findById(id, function(err, user) {
    if (err) {
      return next(err);
    }
    if (user === null) return res.sendStatus(404);
    if (user.username !== req.user.username) return res.sendStatus(403);
    user.remove();
    res.sendStatus(200);
  });
};

