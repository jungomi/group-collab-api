var express = require('express');
var router = express.Router();

var users = require('./api/user');
var projects = require('./api/project');
var tasks = require('./api/task');
var notes = require('./api/note');
var comments = require('./api/comment');
var auth = require('../controllers/auth');

function isIdValid(id) {
  return id.match(/^[0-9a-fA-F]{24}$/);
}

/**
 * @apiDefine unauthorized
 * @apiError (401) Unauthorized The credentials are invalid.
 */

/**
 * @api {get} /authenticate Authenticate with basic authentication.
 * @apiName Authenticate
 * @apiGroup Authenticate
 *
 * @apiSuccess {Object} user The authenticated user.
 * @apiUse unauthorized
 */
router.route('/authenticate')
  .get(auth.authenticate, function(req, res, next) {
    users.getUserByName(req, res, req.user.username, next);
  });

 /**
  * @apiDefine userParams
  * @apiParam {Object} user The user.
  * @apiParam {String} user.username The username of the user.
  * @apiParam {String} user.password The password of the user.
  * @apiParam {String} user.email The email of the user.
  * @apiParam {String} user.firstName The first name of the user.
  * @apiParam {String} user.lastName The last name of the user.
  */

/**
 * @api {get} /users List all users.
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiSuccess {Array} users The list of users.
 */

/**
 * @api {post} /users Create a new user.
 * @apiName PostUsers
 * @apiGroup Users
 *
 * @apiUse userParams
 *
 * @apiSuccess (201) {Object} user The created user.
 * @apiError (500) ValidationError The validation of the user failed.
 */
router.route('/users')
  .post(function(req, res, next) {
    users.addUser(req, res, next);
  })
  .get(function(req, res, next) {
    users.getUsers(req, res, next);
  });

/**
 * @api {get} /users/:user_id Retrieve the user.
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {String{12}} user_id The id of the user.
 *
 * @apiSuccess (200) {Object} user The requested user.
 * @apiError (404) NotFound The user does not exist.
 */

/**
 * @api {put} /users/:user_id Update the user.
 * @apiName PutUser
 * @apiGroup User
 *
 * @apiParam {String{12}} user_id the id of the user.
 * @apiUse userParams
 *
 * @apiSuccess (200) {Object} user The updated user.
 * @apiError (403) Forbidden Not allowed to modify the user.
 * @apiError (404) NotFound The user does not exist.
 * @apiError (500) ValidationError The validation of the user failed.
 */

/**
 * @api {delete} /users/:user_id Delete the user.
 * @apiName DeleteUser
 * @apiGroup User
 *
 * @apiParam {String{12}} user_id the id of the user.
 *
 * @apiSuccess (204) OK The user has been deleted.
 * @apiError (403) Forbidden Not allowed to delete the user.
 * @apiError (404) NotFound The user does not exist.
 */
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

/**
 * @apiDefine projectParams
 * @apiParam {Object} project The project.
 * @apiParam {String} project.name The name of the project.
 * @apiParam {Boolean} project.isPublic Whether the project is public.
 * @apiParam {String} project.owner The owner of the project.
 * @apiParam {Array} project.members The members of the project.
 */

/**
 * @api {get} /projects List all projects.
 * @apiName GetProjects
 * @apiGroup Projects
 *
 * @apiSuccess {Array} projects The list of projects.
 * @apiUse unauthorized
 */

/**
 * @api {post} /projects Create a new project.
 * @apiName PostProjects
 * @apiGroup Projects
 *
 * @apiUse projectParams
 *
 * @apiSuccess (201) {Object} project The created project.
 * @apiUse unauthorized
 * @apiError (500) ValidationError The validation of the project failed.
 */
router.route('/projects')
  .post(auth.authenticate, function(req, res, next) {
    projects.addProject(req, res, next);
  })
  .get(auth.authenticate, function(req, res, next) {
    projects.getProjects(req, res, next);
  });

/**
 * @api {get} /projects/:project_id Retrieve the project.
 * @apiName GetProject
 * @apiGroup Project
 *
 * @apiParam {String{12}} project_id The id of the project.
 *
 * @apiSuccess (200) {Object} project The requested project.
 * @apiUse unauthorized
 * @apiError (403) Forbidden The credentials are invalid.
 * @apiError (404) NotFound The project does not exist.
 */

/**
 * @api {put} /projects/:project_id Update the project.
 * @apiName PutProject
 * @apiGroup Project
 *
 * @apiParam {String{12}} project_id the id of the project.
 * @apiUse projectParams
 *
 * @apiSuccess (200) {Object} project The updated project.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to modify the project.
 * @apiError (404) NotFound The project does not exist.
 * @apiError (500) ValidationError The validation of the project failed.
 */

/**
 * @api {delete} /projects/:project_id Delete the project.
 * @apiName DeleteProject
 * @apiGroup Project
 *
 * @apiParam {String{12}} project_id the id of the project.
 *
 * @apiSuccess (204) OK The project has been deleted.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to delete the project.
 * @apiError (404) NotFound The project does not exist.
 */
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

/**
 * @api {post} /projects/:project_id/join Join the project.
 * @apiName JoinProject
 * @apiGroup Project
 *
 * @apiSuccess (200) OK Successfully joined the project.
 * @apiUse unauthorized
 * @apiError (409) AlreadyJoined Already a member of the project.
 */
router.route('/projects/:project_id/join')
  .post(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id)) return res.sendStatus(404);
    projects.joinProject(req, res, req.params.project_id, next);
  });

/**
 * @api {delete} /projects/:project_id/delete Leave the project.
 * @apiName LeaveProject
 * @apiGroup Project
 *
 * @apiSuccess (204) OK Successfully left the project.
 * @apiError (400) NotMember Not a member of the project.
 * @apiUse unauthorized
 */
router.route('/projects/:project_id/leave')
  .delete(auth.authenticate, function(req,res, next) {
    if (!isIdValid(req.params.project_id)) return res.sendStatus(404);
    projects.leaveProject(req, res, req.params.project_id, next);
  });

/**
 * @apiDefine taskParams
 * @apiParam {Object} task The task.
 * @apiParam {String} task.title The title of the task.
 * @apiParam {String} task.text The text of the task.
 * @apiParam {String} task.owner The owner of the task.
 * @apiParam {Date} task.date The date of the task.
 * @apiParam {Date} task.deadline The deadline of the task.
 * @apiParam {Array} task.assignedUsers The assigned users of the task.
 * @apiParam {String} task.color The color of the task.
 * @apiParam {String} task.project The corresponding project of the task.
 * @apiParam {Boolean} task.isDone=false Whether the task is done.
 */

/**
 * @api {get} /tasks List all visible tasks.
 * @apiName GetTasks
 * @apiGroup Tasks
 *
 * @apiSuccess (200) {Array} tasks The list of visible tasks.
 * @apiUse unauthorized
 */
router.route('/tasks')
  .get(auth.authenticate, function(req, res, next) {
    tasks.getTasks(req, res, null, next);
  });

/**
 * @api {get} /projects/:project_id/tasks List all tasks of a project.
 * @apiName GetTasksOfProject
 * @apiGroup Tasks
 *
 * @apiParam {String{12}} project_id The id of the project.
 *
 * @apiSuccess (200) {Array} tasks The list of tasks in the project.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to retrieve tasks of the project.
 * @apiError (404) NotFound Project does not exist.
 */

/**
 * @api {post} /projects/:project_id/tasks Create a new task in the project.
 * @apiName PostTasks
 * @apiGroup Tasks
 *
 * @apiParam {String{12}} project_id The id of the project.
 *
 * @apiUse taskParams
 *
 * @apiSuccess (201) {Object} task The created task.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to create a task in the project.
 * @apiError (404) NotFound Project does not exist.
 */
router.route('/projects/:project_id/tasks')
  .post(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id)) return res.sendStatus(404);
    tasks.addTask(req, res, req.params.project_id, next);
  })
  .get(auth.authenticate, function(req, res, next) {
    tasks.getTasks(req, res, req.params.project_id, null, next);
  });

/**
 * @api {get} /tasks/:task_id Retrieve the task.
 * @apiName GetTask
 * @apiGroup Task
 *
 * @apiParam {String{12}} task_id The id of the task.
 *
 * @apiSuccess (200) {Object} task The requested task.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to retrieve the tasks.
 * @apiError (404) NotFound The task does not exist.
 */

/**
 * @api {put} /tasks/:task_id Update the task.
 * @apiName PutTask
 * @apiGroup Task
 *
 * @apiParam {String{12}} task_id the id of the task.
 * @apiUse taskParams
 *
 * @apiSuccess (200) {Object} task The updated task.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to modify the task.
 * @apiError (404) NotFound The task does not exist.
 * @apiError (500) ValidationError The validation of the task failed.
 */

/**
 * @api {delete} /tasks/:task_id Delete the task.
 * @apiName DeleteTask
 * @apiGroup Task
 *
 * @apiParam {String{12}} task_id the id of the task.
 *
 * @apiSuccess (204) OK The task has been deleted.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to delete the task.
 * @apiError (404) NotFound The task does not exist.
 */
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

/**
 * @api {get} /projects/:project_id/tasks/:task_id Retrieve the task of the project.
 * @apiName GetTaskOfProject
 * @apiGroup Task
 *
 * @apiParam {String{12}} project_id The id of the project.
 * @apiParam {String{12}} task_id The id of the task.
 *
 * @apiSuccess (200) {Object} task The requested task.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to retrieve the tasks of the project.
 * @apiError (404) NotFound The task does not exist in the project.
 */

/**
 * @api {put} /projects/:project_id/tasks/:task_id Update the task of the project.
 * @apiName PutTaskOfProject
 * @apiGroup Task
 *
 * @apiParam {String{12}} project_id The id of the project.
 * @apiParam {String{12}} task_id the id of the task.
 * @apiUse taskParams
 *
 * @apiSuccess (200) {Object} task The updated task.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to modify the task.
 * @apiError (404) NotFound The task does not exist.
 * @apiError (500) ValidationError The validation of the task failed.
 */

/**
 * @api {delete} /projects/:project_id/tasks/:task_id Delete the task of the project.
 * @apiName DeleteTaskOfProject
 * @apiGroup Task
 *
 * @apiParam {String{12}} project_id The id of the project.
 * @apiParam {String{12}} task_id the id of the task.
 *
 * @apiSuccess (204) OK The task has been deleted.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to delete the task.
 * @apiError (404) NotFound The task does not exist.
 */
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

/**
 * @api {post} /tasks/:task_id/join Join the task.
 * @apiName JoinTask
 * @apiGroup Task
 *
 * @apiSuccess (200) OK Successfully joined the task.
 * @apiUse unauthorized
 * @apiError (409) AlreadyJoined Already a member of the task.
 */
router.route('/tasks/:task_id/join')
  .post(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.task_id)) {
      return res.sendStatus(404);
    }
    tasks.joinTask(req, res, req.params.task_id, null, next);
  });

/**
 * @api {post} /projects/:project_id/tasks/:task_id/join Join the task of a project.
 * @apiName JoinTaskOfProject
 * @apiGroup Task
 *
 * @apiSuccess (200) OK Successfully joined the task.
 * @apiUse unauthorized
 * @apiError (409) AlreadyJoined Already a member of the task.
 */
router.route('/projects/:project_id/tasks/:task_id/join')
  .post(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id) || !isIdValid(req.params.task_id)) {
      return res.sendStatus(404);
    }
    tasks.joinTask(req, res, req.params.task_id, req.params.project_id, next);
  });

/**
 * @api {delete} /tasks/:task_id/delete Leave the task.
 * @apiName LeaveTask
 * @apiGroup Task
 *
 * @apiSuccess (204) OK Successfully left the task.
 * @apiError (400) NotMember Not a member of the task.
 * @apiUse unauthorized
 */
router.route('/tasks/:task_id/leave')
  .delete(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.task_id)) {
      return res.sendStatus(404);
    }
    tasks.leaveTask(req, res, req.params.task_id, null, next);
  });

/**
 * @api {delete} /projects/:project_id/tasks/:task_id/delete Leave the task of a project.
 * @apiName LeaveTaskOfProject
 * @apiGroup Task
 *
 * @apiSuccess (204) OK Successfully left the task.
 * @apiError (400) NotMember Not a member of the task.
 * @apiUse unauthorized
 */
router.route('/projects/:project_id/tasks/:task_id/leave')
  .delete(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id) || !isIdValid(req.params.task_id)) {
      return res.sendStatus(404);
    }
    tasks.leaveTask(req, res, req.params.task_id, req.params.project_id, next);
  });

/**
 * @apiDefine noteParams
 * @apiParam {Object} note The note.
 * @apiParam {String} note.text The text of the note.
 * @apiParam {String} note.owner The owner of the note.
 * @apiParam {Date} note.date The date of the note.
 * @apiParam {String} note.color The color of the note.
 * @apiParam {String} note.priority The priority of the note.
 * @apiParam {String} note.project The corresponding project of the note.
 */

/**
 * @api {get} /notes List all visible notes.
 * @apiName GetNotes
 * @apiGroup Notes
 *
 * @apiSuccess (200) {Array} notes The list of visible notes.
 * @apiUse unauthorized
 */
router.route('/notes')
  .get(auth.authenticate, function(req, res, next) {
    notes.getNotes(req, res, null, next);
  });

/**
 * @api {get} /projects/:project_id/notes List all notes of a project.
 * @apiName GetNotesOfProject
 * @apiGroup Notes
 *
 * @apiSuccess (200) {Array} notes The list of notes in the project.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to retrieve notes of the project.
 * @apiError (404) NotFound Project does not exist.
 */

/**
 * @api {post} /projects/:project_id/notes Create a new note in the project.
 * @apiName PostNotes
 * @apiGroup Notes
 *
 * @apiParam {String{12}} project_id The id of the project.
 *
 * @apiUse noteParams
 *
 * @apiSuccess (201) {Object} note The created note.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to create a note in the project.
 * @apiError (404) NotFound Project does not exist.
 */
router.route('/projects/:project_id/notes')
  .post(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id)) return res.sendStatus(404);
    notes.addNote(req, res, req.params.project_id, next);
  })
  .get(auth.authenticate, function(req, res, next) {
    notes.getNotes(req, res, req.params.project_id, next);
  });

/**
 * @api {get} /notes/:note_id Retrieve the note.
 * @apiName GetNote
 * @apiGroup Note
 *
 * @apiParam {String{12}} note_id The id of the note.
 *
 * @apiSuccess (200) {Object} note The requested note.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to retrieve the notes.
 * @apiError (404) NotFound The note does not exist.
 */

/**
 * @api {put} /notes/:note_id Update the note.
 * @apiName PutNote
 * @apiGroup Note
 *
 * @apiParam {String{12}} note_id the id of the note.
 * @apiUse noteParams
 *
 * @apiSuccess (200) {Object} note The updated note.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to modify the note.
 * @apiError (404) NotFound The note does not exist.
 * @apiError (500) ValidationError The validation of the note failed.
 */

/**
 * @api {delete} /notes/:note_id Delete the note.
 * @apiName DeleteNote
 * @apiGroup Note
 *
 * @apiParam {String{12}} note_id the id of the note.
 *
 * @apiSuccess (204) OK The note has been deleted.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to delete the note.
 * @apiError (404) NotFound The note does not exist.
 */
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

/**
 * @api {get} /projects/:project_id/notes/:note_id Retrieve the note of the project.
 * @apiName GetNoteOfProject
 * @apiGroup Note
 *
 * @apiParam {String{12}} project_id The id of the project.
 * @apiParam {String{12}} note_id The id of the note.
 *
 * @apiSuccess (200) {Object} note The requested note.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to retrieve the notes.
 * @apiError (404) NotFound The note does not exist.
 */

/**
 * @api {put} /projects/:project_id/notes/:note_id Update the note of the project.
 * @apiName PutNoteOfProject
 * @apiGroup Note
 *
 * @apiParam {String{12}} project_id The id of the project.
 * @apiParam {String{12}} note_id the id of the note.
 * @apiUse noteParams
 *
 * @apiSuccess (200) {Object} note The updated note.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to modify the note.
 * @apiError (404) NotFound The note does not exist.
 * @apiError (500) ValidationError The validation of the note failed.
 */

/**
 * @api {delete} /projects/:project_id/notes/:note_id Delete the note of the project.
 * @apiName DeleteNoteOfProject
 * @apiGroup Note
 *
 * @apiParam {String{12}} project_id The id of the project.
 * @apiParam {String{12}} note_id the id of the note.
 *
 * @apiSuccess (204) OK The note has been deleted.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to delete the note.
 * @apiError (404) NotFound The note does not exist.
 */
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

/**
 * @apiDefine commentParams
 * @apiParam {Object} comment The comment.
 * @apiParam {String} comment.title The title of the comment.
 * @apiParam {String} comment.text The text of the comment.
 * @apiParam {String} comment.user The user of the comment.
 * @apiParam {Date} comment.date The date of the comment.
 * @apiParam {String} comment.task The corresponding task of the comment.
 */

/**
 * @api {get} /comments List all visible comments.
 * @apiName GetComments
 * @apiGroup Comments
 *
 * @apiSuccess (200) {Array} comments The list of visible comments.
 * @apiUse unauthorized
 */
router.route('/comments')
  .get(auth.authenticate, function(req, res, next) {
    comments.getComments(req, res, null, null, next);
  });

/**
 * @api {get} /tasks/:task_id/comments List all comments of a task.
 * @apiName GetCommentsOftask
 * @apiGroup Comments
 *
 * @apiSuccess (200) {Array} comments The list of comments in the task.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to retrieve comments of the task.
 * @apiError (404) NotFound task does not exist.
 */

/**
 * @api {post} /tasks/:task_id/comments Create a new comment in the task.
 * @apiName PostComments
 * @apiGroup Comments
 *
 * @apiParam {String{12}} task_id The id of the task.
 *
 * @apiUse commentParams
 *
 * @apiSuccess (201) {Object} comment The created comment.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to create a comment in the task.
 * @apiError (404) NotFound task does not exist.
 */
router.route('/tasks/:task_id/comments')
  .post(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.task_id)) {
      return res.sendStatus(404);
    }
    comments.addComment(req, res, req.params.task_id, null, next);
  })
  .get(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.task_id)) return next(notFound);
    comments.getComments(req, res, req.params.task_id, null, next);
  });

/**
 * @api {get} /projects/:project_id/comments List all comments of a project.
 * @apiName GetCommentsOfProject
 * @apiGroup Comments
 *
 * @apiParam {String{12}} project_id The id of the project.
 *
 * @apiSuccess (200) {Array} comments The list of comments in the project.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to retrieve comments of the project.
 * @apiError (404) NotFound Project does not exist.
 */
router.route('/projects/:project_id/comments')
  .get(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id)) return next(notFound);
    comments.getComments(req, res, null, req.params.project_id, next);
  });

/**
 * @api {get} /projects/:project_id/tasks/:task_id/comments List all comments of a task in the project.
 * @apiName GetCommentsOfTaskInProject
 * @apiGroup Comments
 *
 * @apiParam {String{12}} project_id The id of the project.
 * @apiParam {String{12}} task_id The id of the task.
 *
 * @apiSuccess (200) {Array} comments The list of comments of the task in the project.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to retrieve comments of the task.
 * @apiError (404) NotFound Project or task does not exist.
 */

/**
 * @api {post} /projects/:project_id/tasks/:task_id/comments Create a new comment of the task in the project.
 * @apiName PostCommentsOfTaskInProject
 * @apiGroup Comments
 *
 * @apiParam {String{12}} project_id The id of the project.
 * @apiParam {String{12}} task_id The id of the task.
 * @apiUse commentParams
 *
 * @apiSuccess (201) {Object} comment The created comment.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to create a comment in the project.
 * @apiError (404) NotFound Project does not exist.
 */
router.route('/projects/:project_id/tasks/:task_id/comments')
  .post(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id) || !isIdValid(req.params.task_id)) {
      return res.sendStatus(404);
    }
    comments.addComment(req, res, req.params.task_id, req.params.project_id, next);
  })
  .get(auth.authenticate, function(req, res, next) {
    console.log(req.params);
    console.log(!isIdValid(req.params.project_id));
    if (!isIdValid(req.params.project_id) || !isIdValid(req.params.task_id)) {
      return res.sendStatus(404);
    }
    comments.getComments(req, res, req.params.task_id, req.params.project_id, next);
  });

/**
 * @api {get} /comments/:comment_id Retrieve the comment.
 * @apiName GetComment
 * @apiGroup Comment
 *
 * @apiParam {String{12}} comment_id The id of the comment.
 *
 * @apiSuccess (200) {Object} comment The requested comment.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to retrieve the comments.
 * @apiError (404) NotFound The comment does not exist.
 */

/**
 * @api {put} /comments/:comment_id Update the comment.
 * @apiName PutComment
 * @apiGroup Comment
 *
 * @apiParam {String{12}} comment_id the id of the comment.
 * @apiUse commentParams
 *
 * @apiSuccess (200) {Object} comment The updated comment.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to modify the comment.
 * @apiError (404) NotFound The comment does not exist.
 * @apiError (500) ValidationError The validation of the comment failed.
 */

/**
 * @api {delete} /comments/:comment_id Delete the comment.
 * @apiName DeleteComment
 * @apiGroup Comment
 *
 * @apiParam {String{12}} comment_id the id of the comment.
 *
 * @apiSuccess (204) OK The comment has been deleted.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to delete the comment.
 * @apiError (404) NotFound The comment does not exist.
 */
router.route('/comments/:comment_id')
  .get(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.comment_id)) {
      return res.sendStatus(404);
    }
    comments.getComment(req, res, req.params.comment_id, null, null, next);
  })
  .put(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.comment_id)) {
      return res.sendStatus(404);
    }
    comments.updateComment(req, res, req.params.comment_id, null, null, next);
  })
  .delete(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.comment_id)) {
      return res.sendStatus(404);
    }
    comments.deleteComment(req, res, req.params.comment_id, null, null, next);
  });

/**
 * @api {get} /tasks/:task_id/comments/:comment_id Retrieve the comment of a task.
 * @apiName GetCommentOfTask
 * @apiGroup Comment
 *
 * @apiParam {String{12}} task_id the id of the task.
 * @apiParam {String{12}} comment_id The id of the comment.
 *
 * @apiSuccess (200) {Object} comment The requested comment.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to retrieve the comments.
 * @apiError (404) NotFound The task or comment does not exist.
 */

/**
 * @api {put} /tasks/:task_id/comments/:comment_id Update the comment of a task.
 * @apiName PutCommentOfTask
 * @apiGroup Comment
 *
 * @apiParam {String{12}} task_id the id of the task.
 * @apiParam {String{12}} comment_id the id of the comment.
 * @apiUse commentParams
 *
 * @apiSuccess (200) {Object} comment The updated comment.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to modify the comment.
 * @apiError (404) NotFound The task or comment does not exist.
 * @apiError (500) ValidationError The validation of the comment failed.
 */

/**
 * @api {delete} /tasks/:task_id/comments/:comment_id Delete the comment of a task.
 * @apiName DeleteCommentOfTask
 * @apiGroup Comment
 *
 * @apiParam {String{12}} task_id the id of the task.
 * @apiParam {String{12}} comment_id the id of the comment.
 *
 * @apiSuccess (204) OK The comment has been deleted.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to delete the comment.
 * @apiError (404) NotFound The task or comment does not exist.
 */
router.route('/tasks/:task_id/comments/:comment_id')
  .get(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.task_id) || !isIdValid(req.params.comment_id)) {
      return res.sendStatus(404);
    }
    comments.getComment(req, res, req.params.comment_id, req.params.task_id, null, next);
  })
  .put(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.task_id) || !isIdValid(req.params.comment_id)) {
      return res.sendStatus(404);
    }
    comments.updateComment(req, res, req.params.comment_id, req.params.task_id, null, next);
  })
  .delete(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.task_id) || !isIdValid(req.params.comment_id)) {
      return res.sendStatus(404);
    }
    comments.deleteComment(req, res, req.params.comment_id, req.params.task_id, null, next);
  });

/**
 * @api {get} /projects/:project_id/comments/:comment_id Retrieve the comment of a project.
 * @apiName GetCommentOfProject
 * @apiGroup Comment
 *
 * @apiParam {String{12}} project_id the id of the project.
 * @apiParam {String{12}} comment_id The id of the comment.
 *
 * @apiSuccess (200) {Object} comment The requested comment.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to retrieve the comments.
 * @apiError (404) NotFound The project or comment does not exist.
 */

/**
 * @api {put} /projects/:project_id/comments/:comment_id Update the comment of a project.
 * @apiName PutCommentOfProject
 * @apiGroup Comment
 *
 * @apiParam {String{12}} project_id the id of the project.
 * @apiParam {String{12}} comment_id the id of the comment.
 * @apiUse commentParams
 *
 * @apiSuccess (200) {Object} comment The updated comment.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to modify the comment.
 * @apiError (404) NotFound The project or comment does not exist.
 * @apiError (500) ValidationError The validation of the comment failed.
 */

/**
 * @api {delete} /projects/:project_id/comments/:comment_id Delete the comment of a project.
 * @apiName DeleteCommentOfProject
 * @apiGroup Comment
 *
 * @apiParam {String{12}} project_id the id of the project.
 * @apiParam {String{12}} comment_id the id of the comment.
 *
 * @apiSuccess (204) OK The comment has been deleted.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to delete the comment.
 * @apiError (404) NotFound The project or comment does not exist.
 */
router.route('/projects/:project_id/comments/:comment_id')
  .get(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id) || !isIdValid(req.params.comment_id)) {
      return res.sendStatus(404);
    }
    comments.getComment(req, res, req.params.comment_id, null, req.params.project_id, next);
  })
  .put(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id) || !isIdValid(req.params.comment_id)) {
      return res.sendStatus(404);
    }
    comments.updateComment(req, res, req.params.comment_id, null, req.params.project_id, next);
  })
  .delete(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id) || !isIdValid(req.params.comment_id)) {
      return res.sendStatus(404);
    }
    comments.deleteComment(req, res, req.params.comment_id, null, req.params.project_id, next);
  });

/**
 * @api {get} /projects/:project_id/tasks/:task_id/comments/:comment_id Retrieve the comment of a task in a project.
 * @apiName GetCommentOfTaskInProject
 * @apiGroup Comment
 *
 * @apiParam {String{12}} project_id the id of the project.
 * @apiParam {String{12}} task_id the id of the task.
 * @apiParam {String{12}} comment_id The id of the comment.
 *
 * @apiSuccess (200) {Object} comment The requested comment.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to retrieve the comments.
 * @apiError (404) NotFound The project, task or comment does not exist.
 */

/**
 * @api {put} /projects/:project_id/tasks/:task_id/comments/:comment_id Update the comment of a task in a project.
 * @apiName PutCommentOfTaskInProject
 * @apiGroup Comment
 *
 * @apiParam {String{12}} project_id the id of the project.
 * @apiParam {String{12}} task_id the id of the task.
 * @apiParam {String{12}} comment_id the id of the comment.
 * @apiUse commentParams
 *
 * @apiSuccess (200) {Object} comment The updated comment.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to modify the comment.
 * @apiError (404) NotFound The project, task or comment does not exist.
 * @apiError (500) ValidationError The validation of the comment failed.
 */

/**
 * @api {delete} /projects/:project_id/tasks/:task_id/comments/:comment_id Delete the comment of a task in a project.
 * @apiName DeleteCommentOfTaskInProject
 * @apiGroup Comment
 *
 * @apiParam {String{12}} project_id the id of the project.
 * @apiParam {String{12}} task_id the id of the task.
 * @apiParam {String{12}} comment_id the id of the comment.
 *
 * @apiSuccess (204) OK The comment has been deleted.
 * @apiUse unauthorized
 * @apiError (403) Forbidden Not allowed to delete the comment.
 * @apiError (404) NotFound The project, task or comment does not exist.
 */
router.route('/projects/:project_id/tasks/:task_id/comments/:comment_id')
  .get(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id) || !isIdValid(req.params.task_id) ||
        !isIdValid(req.params.comment_id)) {
      return res.sendStatus(404);
    }
    comments.getComment(req, res, req.params.comment_id, req.params.task_id, req.params.project_id, next);
  })
  .put(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id) || !isIdValid(req.params.task_id) ||
        !isIdValid(req.params.comment_id)) {
      return res.sendStatus(404);
    }
    comments.updateComment(req, res, req.params.comment_id, req.params.task_id, req.params.project_id, next);
  })
  .delete(auth.authenticate, function(req, res, next) {
    if (!isIdValid(req.params.project_id) || !isIdValid(req.params.task_id) ||
        !isIdValid(req.params.comment_id)) {
      return res.sendStatus(404);
    }
    comments.deleteComment(req, res, req.params.comment_id, req.params.task_id, req.params.project_id, next);
  });

module.exports = router;

