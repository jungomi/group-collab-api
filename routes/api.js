var express = require('express');
var router = express.Router();

var users = require('./api/user');
var projects = require('./api/project');
var auth = require('../controllers/auth');

router.route('/authenticate')
  .get(auth.authenticate, function(req, res) {
    res.sendStatus(200);
  });

/* User routes */
router.route('/users')
  .post(function(req,res) {
    users.addUser(req,res)
  })
  .get(function(req,res) {
    users.getUsers(req,res)
  });

/* Single user routes */
router.route('/users/:user_id')
  .get(function(req, res) {
    users.getUser(req, res, req.params.user_id)
  })
  .put(auth.authenticate, function(req, res) {
    users.updateUser(req, res, req.params.user_id)
  })
  .delete(auth.authenticate, function(req, res) {
    users.deleteUser(req, res, req.params.user_id)
  });

/* Project routes */
router.route('/projects')
  .post(auth.authenticate, function(req,res) {
    projects.addProject(req,res)
  })
  .get(auth.authenticate, function(req,res) {
    projects.getProjects(req,res)
  });

/* Single project routes */
router.route('/projects/:project_id')
  .get(auth.authenticate, function(req, res) {
    projects.getProject(req, res, req.params.project_id)
  })
  .put(auth.authenticate, function(req, res) {
    projects.updateProject(req, res, req.params.project_id)
  })
  .delete(auth.authenticate, function(req, res) {
    projects.deleteProject(req, res, req.params.project_id)
  });

router.route('/projects/:project_id/join')
  .post(auth.authenticate, function(req,res) {
    projects.joinProject(req, res, req.params.project_id)
  });

router.route('/projects/:project_id/leave')
  .delete(auth.authenticate, function(req,res) {
    projects.leaveProject(req, res, req.params.project_id)
  });

module.exports = router;

