var _ = require('lodash');
var mongoose = require('mongoose');
var Note = require('../../models/note');
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
  return project.isPublic || project.owner.username === user.username ||
    _.some(project.members, 'username', user.username);
}

module.exports.addNote = function(req, res, project_id, next) {
  Project
    .findById(project_id)
    .populate('owner members')
    .exec(function(err, project) {
      if (!isProjectVisible(project, req.user)) return res.sendStatus(403);
      var note = new Note(req.body.note);
      note.project = project_id;
      note.owner = req.user._id;
      note.save(function(err) {
        if (err) {
          return next(err);
        }
        Note.populate(note, 'owner', function(err, note) {
          if (err) {
            return next(err);
          }
          note.project = project;
          return res.status(201).json({ note: note });
        });
      });
    });
};

module.exports.getNotes = function(req, res, project_id, next) {
  var filter = {};
  if (project_id) filter.project = project_id;
  Note
    .find(filter)
    .populate('owner assignedUsers project')
    .exec(function(err, _notes) {
      if (err) {
        return next(err);
      }
      Note.populate(_notes, {
        path: 'project.owner project.members',
        model: 'User',
      }, function(err, notes) {
        if (err) {
          return next(err);
        }
        notes = _.filter(notes, function(note) {
          return isProjectVisible(note.project, req.user);
        });
        return res.json({ notes: notes });
      });
    });
};

module.exports.getNote = function(req, res, note_id, project_id, next) {
  var filter = { _id: note_id };
  if (project_id) filter.project = project_id;
  Note
    .findOne(filter)
    .populate('owner assignedUsers project')
    .exec(function(err, _note) {
      if (err) {
        return next(err);
      }
      if (!_note) {
        return next(notFound);
      }
      Note.populate(_note, {
        path: 'project.owner project.members',
        model: 'User',
      }, function(err, note) {
        if (err) {
          return next(err);
        }
        if (isProjectVisible(note.project, req.user)) {
          return res.json({ note: note });
        }
        return next(forbidden);
      });
    });
};

module.exports.updateNote = function(req, res, note_id, project_id, next) {
  var filter = { _id: note_id };
  if (project_id) filter.project = project_id;
  Note
    .findOne(filter)
    .populate('owner assignedUsers project')
    .exec(function(err, _note) {
      if (err) {
        return next(err);
      }
      if (!_note) {
        return next(notFound);
      }
      Note.populate(_note, {
        path: 'project.owner project.members',
        model: 'User',
      }, function(err, note) {
        if (err) {
          return next(err);
        }
        if (!isProjectVisible(note.project, req.user) ||
            (note.project.owner.username !== req.user.username &&
             note.owner.username !== req.user.username)) {
          return next(forbidden);
        }
        note = _.extend(note, req.body.note);
        note.save(function(err) {
          if (err) {
            return next(err);
          }
          Note.populate(note, 'owner assignedUsers project', function(err, note) {
            if (err) {
              return next(err);
            }
            Note.populate(_task, {
              path: 'project.owner project.members',
              model: 'User',
            }, function(err, task) {
              if (err) {
                return next(err);
              }
              return res.json({ note: note });
            });
          });
        });
      });
    });
};

module.exports.deleteNote = function(req, res, note_id, project_id, next) {
  var filter = { _id: note_id };
  if (project_id) filter.project = project_id;
  Note
    .findOne(filter)
    .populate('owner assignedUsers project')
    .exec(function(err, _note) {
      if (err) {
        return next(err);
      }
      if (!_note) {
        return next(notFound);
      }
      Note.populate(_note, {
        path: 'project.owner project.members',
        model: 'User',
      }, function(err, note) {
        if (err) {
          return next(err);
        }
        if (!isProjectVisible(note.project, req.user) ||
            (note.project.owner.username !== req.user.username &&
             note.owner.username !== req.user.username)) {
          return next(forbidden);
        }
        note.remove(function(err) {
          if (err) {
            return next(err);
          }
          return res.sendStatus(204);
        });
      });
    });
};

