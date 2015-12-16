var _ = require('lodash');
var mongoose = require('mongoose');
var Project = require('../../models/project');
var Note = require('../../models/note');
var Task = require('../../models/task');
var notMember = new Error('Not member');
notMember.status = 400;
var notFound = new Error('Not Found');
notFound.status = 404;

function isProjectVisible(project, user) {
  return project.isPublic || project.owner.username === user.username ||
    _.some(project.members, 'username', user.username);
}

module.exports.addProject = function(req, res, next) {
  var project = new Project(req.body.project);
  project.owner = req.user._id;
  project.save(function(err) {
    if (err) {
      return next(err);
    }
    Project.populate(project, 'owner members', function(err, project) {
      if (err) {
        return next(err);
      }
      res.status(201).json({ project: project });
    });
  });
};

module.exports.getProjects = function(req, res, next) {
  Project
    .find()
    .populate('owner members')
    .exec(function(err, projects) {
      if (err) {
        return next(err);
      }
      projects = _.filter(projects, function(project) {
        return isProjectVisible(project, req.user);
      });
      res.json({projects: projects});
    });
};

module.exports.getProject = function(req, res, id, next) {
  Project
    .findById(id)
    .populate('owner members')
    .exec(function(err, project) {
      if (err) {
        return next(err);
      }
      if (!project) return res.sendStatus(404);
      if (isProjectVisible(project, req.user)) {
          return res.json({project: project});
      }
      res.sendStatus(403);
    });
};

module.exports.updateProject = function(req, res, id, next) {
  Project
    .findById(id)
    .populate('owner members')
    .exec(function(err, project) {
      if (err) {
        return next(err);
      }
      if (!project) return res.sendStatus(404);
      if (project.owner.username !== req.user.username) return res.sendStatus(403);
      project = _.extend(project, req.body.project);
      project.save(function(err) {
        if (err) {
          return next(err);
        }
        Project.populate(project, 'owner members', function(err, project) {
          return res.json({project: project});
        });
      });
    });
};

module.exports.deleteProject = function(req, res, id, next) {
  Project
    .findById(id)
    .populate('owner')
    .exec(function(err, project) {
      if (err) {
        return next(err);
      }
      if (!project) return res.sendStatus(404);
      if (project.owner.username !== req.user.username) return res.sendStatus(403);
      project.remove(function(err) {
        if (err) {
          return next(err);
        }
        Note.remove({ project: id }, function(err) {
          if (err) {
            return next(err);
          }
        });
        Task.remove({ project: id }, function(err) {
          if (err) {
            return next(err);
          }
        });
      });
      return res.sendStatus(204);
    });
};

module.exports.joinProject = function(req, res, id, next) {
  Project
    .findById(id)
    .populate('members')
    .exec(function(err, project) {
      if (err) {
        return next(err);
      }
      if (!project) return res.sendStatus(404);
      if (_.some(project.members, 'username', req.user.username)) {
        return res.send('Already joined');
      }
      project.members.push(req.user);
      project.save(function(err) {
        if (err) {
          return next(err);
        }
        res.sendStatus(200);
      });
    });
};

module.exports.leaveProject = function(req, res, id, next) {
  Project
    .findById(id)
    .populate('members')
    .exec(function(err, project) {
      if (err) {
        return next(err);
      }
      if (!project) return res.sendStatus(404);
      var isMember = _.some(project.members, 'username', req.user.username);
      if (!isMember) return res.send('Not member');
      _.remove(project.members, function(user) {
        return user.username === req.user.username;
      });
      project.markModified('members');
      project.save(function(err) {
        if (err) {
          return next(err);
        }
        res.sendStatus(200);
      });
    });
};

module.exports.leaveAll = function(user_id, next) {
  Project
    .find({ members: user_id })
    .exec(function(err, projects) {
      if (err) {
        return next(err);
      }
      if (!projects) return next(notFound);
      _.each(projects, function(project) {
        _.remove(project.members, function(member) {
          return member == user_id;
        });
        project.markModified('members');
        project.save(function(err) {
          if (err) {
            return next(err);
          }
        });
      });
      return next();
    });
};
