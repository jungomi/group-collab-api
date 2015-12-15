var _ = require('lodash');
var mongoose = require('mongoose');
var Comment = require('../../models/comment');
var Project = require('../../models/project');
var Task = require('../../models/task');

var notMember = new Error('Not member');
notMember.status = 400;
var forbidden = new Error('Forbidden');
forbidden.status = 403;
var notFound = new Error('Not Found');
notFound.status = 404;
var alreadyJoined = new Error('Already joined');
alreadyJoined.status = 409;

function deepPopulateComment(comment, next) {
  Comment
    .populate(comment, 'user task', function(err, _commentWithTask) {
      if (err) {
        return next(err);
      }
      Comment.populate(_commentWithTask, {
        path: 'task.project',
        model: 'Project'
      }, function(err, _commentWithProject) {
        if (err) {
          return next(err);
        }
        Comment.populate(_commentWithProject, {
          path: 'task.project.owner task.project.members task.assignedUsers task.owner',
          model: 'User'
        }, function(err, comment) {
          if (err) {
            return next(err);
          }
          return next(null, comment);
        });
      });
    });
}

function isTaskInProject(task, project_id) {
  if (!project_id) return true;
  return task.project._id == project_id;
}

function isProjectVisible(project, user) {
  return project.isPublic || project.owner.username === user.username ||
    _.some(project.members, 'username', user.username);
}

module.exports.addComment = function(req, res, task_id, project_id, next) {
  Task
    .findOne({ _id: task_id, project: project_id })
    .populate('owner assignedUsers project')
    .exec(function(err, _task) {
      if (err) {
        return next(err);
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
        var comment = new Comment(req.body.comment);
        comment.task = task._id;
        comment.user = req.user._id;
        comment.save(function(err) {
          if (err) {
            return next(err);
          }
          Comment.populate(comment, 'user', function(err, comment) {
            comment.task = task;
            return res.status(201).json({ comment: comment });
          });
        });
      });
    });
};

module.exports.getComments = function(req, res, task_id, project_id, next) {
  var filter = {};
  if (task_id) filter.task = task_id;
  Comment
    .find(filter, function(err, comments) {
      deepPopulateComment(comments, function(err, comments) {
        comments = _.filter(comments, function(comment) {
          if (project_id && comment.task.project._id != project_id) {
            return false;
          }
          return isProjectVisible(comment.task.project, req.user);
        });
        return res.json({ comments: comments });
      });
    });
};

module.exports.getComment = function(req, res, comment_id, task_id, project_id, next) {
  var filter = { _id: comment_id };
  if (task_id) filter.task = task_id;
  Comment
    .findOne(filter, function(err, _comment) {
      if (err) {
        return next(err);
      }
      if (!_comment) {
        return next(notFound);
      }
      deepPopulateComment(_comment, function(err, comment) {
        if (!isTaskInProject(comment.task, project_id)) {
          return next(notFound);
        }
        if (!isProjectVisible(comment.task.project, req.user)) {
          return next(forbidden);
        }
        return res.json({ comment: comment });
      });
    });
};

module.exports.updateComment = function(req, res, comment_id, task_id, project_id, next) {
  var filter = { _id: comment_id };
  if (task_id) filter.task = task_id;
  Comment
    .findOne(filter, function(err, _comment) {
      if (err) {
        return next(err);
      }
      if (!_comment) {
        return next(notFound);
      }
      deepPopulateComment(_comment, function(err, comment) {
        if (!isTaskInProject(comment.task, project_id)) {
          return next(notFound);
        }
        if (!isProjectVisible(comment.task.project, req.user) ||
            (comment.task.project.owner.username !== req.user.username &&
             comment.user.username !== req.user.username)) {
          return next(forbidden);
        }
        comment = _.extend(comment, req.body.comment);
        comment.save(function(err) {
          if (err) {
            return next(err);
          }
          deepPopulateComment(comment, function(err, comment) {
            if (err) {
              return next(err);
            }
            return res.json({ comment: comment });
          });
        });
      });
    });
};

module.exports.deleteComment = function(req, res, comment_id, task_id, project_id, next) {
  var filter = { _id: comment_id };
  if (task_id) filter.task = task_id;
  Comment
    .findOne(filter, function(err, _comment) {
      if (err) {
        return next(err);
      }
      if (!_comment) {
        return next(notFound);
      }
      deepPopulateComment(_comment, function(err, comment) {
        if (!isTaskInProject(comment.task, project_id)) {
          return next(notFound);
        }
        if (!isProjectVisible(comment.task.project, req.user) ||
            (comment.task.project.owner.username !== req.user.username &&
             comment.user.username !== req.user.username)) {
          return next(forbidden);
        }
        comment.remove(function(err) {
          if (err) {
            return next(err);
          }
          return res.sendStatus(204);
        });
      });
    });
};

