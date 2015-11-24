var express = require('express');
var router = express.Router();

var users = require('./api/user');
var projects = require('./api/project');
var auth = require('../controllers/auth');

function isIdValid(id) {
  return id.match(/^[0-9a-fA-F]{24}$/);
}

router.route('/authenticate')
  .get(auth.authenticate, function(req, res, next) {
    res.sendStatus(200);
  });

/* User routes */
router.route('/users')
  .post(function(req, res, next) {
    users.addUser(req, res, next)
  })
  .get(function(req, res, next) {
    users.getUsers(req, res, next)
  });

/* Single user routes */
router.route('/users/:user_id')
  .get(function(req, res, next) {
    if (!isIdValid(req.params.user_id)) return res.sendStatus(404);
    users.getUser(req, res, req.params.user_id, next)
  })
  .put(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.user_id)) return res.sendStatus(404);
    users.updateUser(req, res, req.params.user_id, next)
  })
  .delete(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.user_id)) return res.sendStatus(404);
    users.deleteUser(req, res, req.params.user_id, next)
  });

/* Project routes */
router.route('/projects')
  .post(auth.authenticate, function(req, res, next) {
    projects.addProject(req,res, next)
  })
  .get(auth.authenticate, function(req, res, next) {
    projects.getProjects(req,res, next)
  });

/* Single project routes */
router.route('/projects/:project_id')
  .get(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id)) return res.sendStatus(404);
    projects.getProject(req, res, req.params.project_id, next)
  })
  .put(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id)) return res.sendStatus(404);
    projects.updateProject(req, res, req.params.project_id, next)
  })
  .delete(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id)) return res.sendStatus(404);
    projects.deleteProject(req, res, req.params.project_id, next)
  });

router.route('/projects/:project_id/join')
  .post(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id)) return res.sendStatus(404);
    projects.joinProject(req, res, req.params.project_id, next)
  });

router.route('/projects/:project_id/leave')
  .delete(auth.authenticate, function(req,res, next) {
    if (!isIdValid(req.params.project_id)) return res.sendStatus(404);
    projects.leaveProject(req, res, req.params.project_id, next)
  });

module.exports = router;

