var express = require('express');
var router = express.Router();

var users = require('./api/user');
var projects = require('./api/project');
var tasks = require('./api/task');
var notes = require('./api/note');
var auth = require('../controllers/auth');

function isIdValid(id) {
  return id.match(/^[0-9a-fA-F]{24}$/);
}

router.route('/authenticate')
  .get(auth.authenticate, function(req, res, next) {
    users.getUserByName(req, res, req.user.username, next);
  });

/* User routes */
router.route('/users')
  .post(function(req, res, next) {
    users.addUser(req, res, next);
  })
  .get(function(req, res, next) {
    users.getUsers(req, res, next);
  });

/* Single user routes */
router.route('/users/:user_id')
  .get(function(req, res, next) {
    if (!isIdValid(req.params.user_id)) return res.sendStatus(404);
    users.getUser(req, res, req.params.user_id, next);
  })
  .put(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.user_id)) return res.sendStatus(404);
    users.updateUser(req, res, req.params.user_id, next);
  })
  .delete(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.user_id)) return res.sendStatus(404);
    users.deleteUser(req, res, req.params.user_id, next);
  });

/* Project routes */
router.route('/projects')
  .post(auth.authenticate, function(req, res, next) {
    projects.addProject(req, res, next);
  })
  .get(auth.authenticate, function(req, res, next) {
    projects.getProjects(req, res, next);
  });

/* Single project routes */
router.route('/projects/:project_id')
  .get(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id)) return res.sendStatus(404);
    projects.getProject(req, res, req.params.project_id, next);
  })
  .put(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id)) return res.sendStatus(404);
    projects.updateProject(req, res, req.params.project_id, next);
  })
  .delete(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id)) return res.sendStatus(404);
    projects.deleteProject(req, res, req.params.project_id, next);
  });

router.route('/projects/:project_id/join')
  .post(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id)) return res.sendStatus(404);
    projects.joinProject(req, res, req.params.project_id, next);
  });

router.route('/projects/:project_id/leave')
  .delete(auth.authenticate, function(req,res, next) {
    if (!isIdValid(req.params.project_id)) return res.sendStatus(404);
    projects.leaveProject(req, res, req.params.project_id, next);
  });

/* Task routes */
router.route('/tasks')
  .get(auth.authenticate, function(req, res, next) {
    tasks.getTasks(req, res, null, next);
  });

router.route('/projects/:project_id/tasks')
  .post(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id)) return res.sendStatus(404);
    tasks.addTask(req, res, req.params.project_id, null, next);
  })
  .get(auth.authenticate, function(req, res, next) {
    tasks.getTasks(req, res, req.params.project_id, null, next);
  });

/* Single task routes */
router.route('/tasks/:task_id')
  .get(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.task_id)) {
      return res.sendStatus(404);
    }
    tasks.getTask(req, res, req.params.task_id, null, next);
  })
  .put(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.task_id)) {
      return res.sendStatus(404);
    }
    tasks.updateTask(req, res, req.params.task_id, null, next);
  })
  .delete(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.task_id)) {
      return res.sendStatus(404);
    }
    tasks.deleteTask(req, res, req.params.task_id, null, next);
  });

router.route('/projects/:project_id/tasks/:task_id')
  .get(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id) || !isIdValid(req.params.task_id)) {
      return res.sendStatus(404);
    }
    tasks.getTask(req, res, req.params.task_id, req.params.project_id, next);
  })
  .put(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id) || !isIdValid(req.params.task_id)) {
      return res.sendStatus(404);
    }
    tasks.updateTask(req, res, req.params.task_id, req.params.project_id, next);
  })
  .delete(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id) || !isIdValid(req.params.task_id)) {
      return res.sendStatus(404);
    }
    tasks.deleteTask(req, res, req.params.task_id, req.params.project_id, next);
  });

router.route('/tasks/:task_id/join')
  .post(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.task_id)) {
      return res.sendStatus(404);
    }
    tasks.joinTask(req, res, req.params.task_id, null, next);
  });

router.route('/projects/:project_id/tasks/:task_id/join')
  .post(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id) || !isIdValid(req.params.task_id)) {
      return res.sendStatus(404);
    }
    tasks.joinTask(req, res, req.params.task_id, req.params.project_id, next);
  });

router.route('/tasks/:task_id/leave')
  .delete(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.task_id)) {
      return res.sendStatus(404);
    }
    tasks.leaveTask(req, res, req.params.task_id, null, next);
  });

router.route('/projects/:project_id/tasks/:task_id/leave')
  .delete(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id) || !isIdValid(req.params.task_id)) {
      return res.sendStatus(404);
    }
    tasks.leaveTask(req, res, req.params.task_id, req.params.project_id, next);
  });

/* Note routes */
router.route('/notes')
  .get(auth.authenticate, function(req, res, next) {
    notes.getNotes(req, res, null, next);
  });

router.route('/projects/:project_id/notes')
  .post(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id)) return res.sendStatus(404);
    notes.addNote(req, res, req.params.project_id, null, next);
  })
  .get(auth.authenticate, function(req, res, next) {
    notes.getNotes(req, res, req.params.project_id, null, next);
  });

/* Single note routes */
router.route('/notes/:note_id')
  .get(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.note_id)) {
      return res.sendStatus(404);
    }
    notes.getNote(req, res, req.params.note_id, null, next);
  })
  .put(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.note_id)) {
      return res.sendStatus(404);
    }
    notes.updateNote(req, res, req.params.note_id, null, next);
  })
  .delete(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.note_id)) {
      return res.sendStatus(404);
    }
    notes.deleteNote(req, res, req.params.note_id, null, next);
  });

router.route('/projects/:project_id/notes/:note_id')
  .get(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id) || !isIdValid(req.params.note_id)) {
      return res.sendStatus(404);
    }
    notes.getNote(req, res, req.params.note_id, req.params.project_id, next);
  })
  .put(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id) || !isIdValid(req.params.note_id)) {
      return res.sendStatus(404);
    }
    notes.updateNote(req, res, req.params.note_id, req.params.project_id, next);
  })
  .delete(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id) || !isIdValid(req.params.note_id)) {
      return res.sendStatus(404);
    }
    notes.deleteNote(req, res, req.params.note_id, req.params.project_id, next);
  });

module.exports = router;

