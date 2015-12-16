var _ = require('lodash');
var mongoose = require('mongoose');
var User = require('../../models/user');
var Project = require('../../models/project');
var projects = require('./project');
var Task = require('../../models/task');
var tasks = require('./task');
var Note = require('../../models/note');
var Comment = require('../../models/comment');

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

module.exports.getUserByName = function(req, res, name, next) {
  User.findOne({ username: name }, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) return res.sendStatus(404);
    return res.json({user: user});
  });
};

module.exports.getUser = function(req, res, id, next) {
  User.findById(id, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) return res.sendStatus(404);
    res.json({user: user});
  });
};

module.exports.updateUser = function(req, res, id, next) {
  User.findById(id, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) return res.sendStatus(404);
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
    if (!user) return res.sendStatus(404);
    if (user.username !== req.user.username) return res.sendStatus(403);
    user.remove(function(err) {
      if (err) {
        return next(err);
      }
      Project.remove({ owner: id }, function(err) {
        if (err) {
          return next(err);
        }
      });
      projects.leaveAll(id, function(err) {
        if (err) {
          return next(err);
        }
      });
      Task.remove({ owner: id }, function(err) {
        if (err) {
          return next(err);
        }
      });
      tasks.leaveAll(id, function(err) {
        if (err) {
          return next(err);
        }
      });
      Note.remove({ owner: id }, function(err) {
        if (err) {
          return next(err);
        }
      });
      Comment.remove({ user: id }, function(err) {
        if (err) {
          return next(err);
        }
      });
    });
    return res.sendStatus(204);
  });
};

