var _ = require('lodash');
var mongoose = require('mongoose');
var Task = require('../../models/task');
var Project = require('../../models/project');

var notMember = new Error('Not member');
notMember.status = 400;
var forbidden = new Error('Forbidden');
forbidden.status = 403;
var notFound = new Error('Not Found');
notFound.status = 404;
var alreadyJoined = new Error('Already joined');
alreadyJoined.status = 409;

function isProjectVisible(project, user) {
  return project.isPublic || project.owner.username === user.username
    || _.some(project.members, 'username', user.username);
}

module.exports.addTask = function(req, res, project_id, next) {
  Project
    .findById(project_id)
    .populate('owner members')
    .exec(function(err, project) {
      if (!isProjectVisible(project, req.user)) return res.sendStatus(403);
      var task = new Task(req.body.task);
      task.project = project_id;
      task.owner = req.user._id;
      task.save(function(err) {
        if (err) {
          return next(err);
        }
        return res.status(201).json({task: task});
      });
    });
};

module.exports.getTasks = function(req, res, project_id, next) {
  var filter = {};
  if (project_id) filter['project'] = project_id;
  Task
    .find(filter)
    .populate('owner assignedUsers project')
    .exec(function(err, _tasks) {
      if (err) {
        return next(err);
      }
      Task.populate(_tasks, {
        path: 'project.owner project.members',
        model: 'User',
      }, function(err, tasks) {
        if (err) {
          return next(err);
        }
        tasks = _.filter(tasks, function(task) {
          return isProjectVisible(task.project, req.user);
        });
        return res.json({ tasks: tasks });
      });
    });
}

module.exports.getTask = function(req, res, task_id, project_id, next) {
  var filter = { _id: task_id };
  if (project_id) filter['project'] = project_id;
  Task
    .findOne(filter)
    .populate('owner assignedUsers project')
    .exec(function(err, _task) {
      if (err) {
        return next(err);
      }
      if (!_task) {
        return next(notFound);
      }
      Task.populate(_task, {
        path: 'project.owner project.members',
        model: 'User',
      }, function(err, task) {
        if (err) {
          return next(err);
        }
        if (isProjectVisible(task.project, req.user)) {
          return res.json({ task: task });
        }
        return next(forbidden);
      });
    });
}

module.exports.updateTask = function(req, res, task_id, project_id, next) {
  var filter = { _id: task_id };
  if (project_id) filter['project'] = project_id;
  Task
    .findOne(filter)
    .populate('owner assignedUsers project')
    .exec(function(err, _task) {
      if (err) {
        return next(err);
      }
      if (!_task) {
        return next(notFound);
      }
      Task.populate(_task, {
        path: 'project.owner project.members',
        model: 'User',
      }, function(err, task) {
        if (err) {
          return next(err);
        }
        if (!isProjectVisible(task.project, req.user)
          || task.project.owner.username !== req.user.username) {
          return next(forbidden);
        }
        task = _.extend(task, req.body.task);
        task.save(function(err) {
          if (err) {
            return next(err);
          }
          return res.json({ task: task });
        });
      });
    });
};

module.exports.deleteTask = function(req, res, task_id, project_id, next) {
  var filter = { _id: task_id };
  if (project_id) filter['project'] = project_id;
  Task
    .findOne(filter)
    .populate('owner assignedUsers project')
    .exec(function(err, _task) {
      if (err) {
        return next(err);
      }
      if (!_task) {
        return next(notFound);
      }
      Task.populate(_task, {
        path: 'project.owner project.members',
        model: 'User',
      }, function(err, task) {
        if (err) {
          return next(err);
        }
        if (!isProjectVisible(task.project, req.user)
          || task.owner.username !== req.user.username) {
          return next(forbidden);
        }
        task.remove(function(err) {
          if (err) {
            return next(err);
          }
          return res.sendStatus(200);
        });
      });
    });
};

module.exports.joinTask = function(req, res, task_id, project_id, next) {
  var filter = { _id: task_id };
  if (project_id) filter['project'] = project_id;
  Task
    .findOne(filter)
    .populate('owner assignedUsers project')
    .exec(function(err, _task) {
      if (err) {
        return next(err);
      }
      if (!_task) {
        return next(notFound);
      }
      Task.populate(_task, {
        path: 'project.owner project.members',
        model: 'User',
      }, function(err, task) {
        if (err) {
          return next(err);
        }
        if (!isProjectVisible(task.project, req.user)) {
          return next(forbidden);
        }
        if (_.some(task.assignedUsers, 'username', req.user.username)) {
          return next(alreadyJoined);
        }
        task.assignedUsers.push(req.user);
        task.save(function(err) {
          if (err) {
            return next(err);
          }
          return res.sendStatus(200);
        });
      });
    });
};

module.exports.leaveTask = function(req, res, task_id, project_id, next) {
  var filter = { _id: task_id };
  if (project_id) filter['project'] = project_id;
  Task
    .findOne(filter)
    .populate('owner assignedUsers project')
    .exec(function(err, _task) {
      if (err) {
        return next(err);
      }
      if (!_task) {
        return next(notFound);
      }
      Task.populate(_task, {
        path: 'project.owner project.members',
        model: 'User',
      }, function(err, task) {
        if (err) {
          return next(err);
        }
        if (!isProjectVisible(task.project, req.user)) {
          return next(forbidden);
        }
        var isMember = _.some(task.assignedUsers, 'username', req.user.username);
        if (!isMember) return next(notMember);
        _.remove(task.assignedUsers, function(assignedUser) {
          return assignedUser.username === req.user.username;
        });
        task.markModified('assignedUsers');
        task.save(function(err) {
          if (err) {
            return next(err);
          }
          return res.sendStatus(200);
        });
      });
    });
};

