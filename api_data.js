define({ "api": [
  {
    "type": "get",
    "url": "/authenticate",
    "title": "Authenticate with basic authentication.",
    "name": "Authenticate",
    "group": "Authenticate",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>The authenticated user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Authenticate",
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/comments/:comment_id",
    "title": "Delete the comment.",
    "name": "DeleteComment",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "comment_id",
            "description": "<p>the id of the comment.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "OK",
            "description": "<p>The comment has been deleted.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to delete the comment.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The comment does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Comment"
  },
  {
    "type": "delete",
    "url": "/projects/:project_id/comments/:comment_id",
    "title": "Delete the comment of a project.",
    "name": "DeleteCommentOfProject",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "project_id",
            "description": "<p>the id of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "comment_id",
            "description": "<p>the id of the comment.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "OK",
            "description": "<p>The comment has been deleted.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to delete the comment.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The project or comment does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Comment"
  },
  {
    "type": "delete",
    "url": "/tasks/:task_id/comments/:comment_id",
    "title": "Delete the comment of a task.",
    "name": "DeleteCommentOfTask",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "task_id",
            "description": "<p>the id of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "comment_id",
            "description": "<p>the id of the comment.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "OK",
            "description": "<p>The comment has been deleted.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to delete the comment.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The task or comment does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Comment"
  },
  {
    "type": "delete",
    "url": "/projects/:project_id/tasks/:task_id/comments/:comment_id",
    "title": "Delete the comment of a task in a project.",
    "name": "DeleteCommentOfTaskInProject",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "project_id",
            "description": "<p>the id of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "task_id",
            "description": "<p>the id of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "comment_id",
            "description": "<p>the id of the comment.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "OK",
            "description": "<p>The comment has been deleted.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to delete the comment.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The project, task or comment does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Comment"
  },
  {
    "type": "get",
    "url": "/comments/:comment_id",
    "title": "Retrieve the comment.",
    "name": "GetComment",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "comment_id",
            "description": "<p>The id of the comment.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "comment",
            "description": "<p>The requested comment.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to retrieve the comments.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The comment does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Comment"
  },
  {
    "type": "get",
    "url": "/projects/:project_id/comments/:comment_id",
    "title": "Retrieve the comment of a project.",
    "name": "GetCommentOfProject",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "project_id",
            "description": "<p>the id of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "comment_id",
            "description": "<p>The id of the comment.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "comment",
            "description": "<p>The requested comment.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to retrieve the comments.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The project or comment does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Comment"
  },
  {
    "type": "get",
    "url": "/tasks/:task_id/comments/:comment_id",
    "title": "Retrieve the comment of a task.",
    "name": "GetCommentOfTask",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "task_id",
            "description": "<p>the id of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "comment_id",
            "description": "<p>The id of the comment.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "comment",
            "description": "<p>The requested comment.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to retrieve the comments.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The task or comment does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Comment"
  },
  {
    "type": "get",
    "url": "/projects/:project_id/tasks/:task_id/comments/:comment_id",
    "title": "Retrieve the comment of a task in a project.",
    "name": "GetCommentOfTaskInProject",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "project_id",
            "description": "<p>the id of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "task_id",
            "description": "<p>the id of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "comment_id",
            "description": "<p>The id of the comment.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "comment",
            "description": "<p>The requested comment.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to retrieve the comments.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The project, task or comment does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Comment"
  },
  {
    "type": "put",
    "url": "/comments/:comment_id",
    "title": "Update the comment.",
    "name": "PutComment",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "comment_id",
            "description": "<p>the id of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "comment",
            "description": "<p>The comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment.title",
            "description": "<p>The title of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment.text",
            "description": "<p>The text of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment.user",
            "description": "<p>The user of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "comment.date",
            "description": "<p>The date of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment.task",
            "description": "<p>The corresponding task of the comment.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "comment",
            "description": "<p>The updated comment.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to modify the comment.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The comment does not exist.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>The validation of the comment failed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Comment"
  },
  {
    "type": "put",
    "url": "/projects/:project_id/comments/:comment_id",
    "title": "Update the comment of a project.",
    "name": "PutCommentOfProject",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "project_id",
            "description": "<p>the id of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "comment_id",
            "description": "<p>the id of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "comment",
            "description": "<p>The comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment.title",
            "description": "<p>The title of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment.text",
            "description": "<p>The text of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment.user",
            "description": "<p>The user of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "comment.date",
            "description": "<p>The date of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment.task",
            "description": "<p>The corresponding task of the comment.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "comment",
            "description": "<p>The updated comment.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to modify the comment.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The project or comment does not exist.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>The validation of the comment failed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Comment"
  },
  {
    "type": "put",
    "url": "/tasks/:task_id/comments/:comment_id",
    "title": "Update the comment of a task.",
    "name": "PutCommentOfTask",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "task_id",
            "description": "<p>the id of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "comment_id",
            "description": "<p>the id of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "comment",
            "description": "<p>The comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment.title",
            "description": "<p>The title of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment.text",
            "description": "<p>The text of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment.user",
            "description": "<p>The user of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "comment.date",
            "description": "<p>The date of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment.task",
            "description": "<p>The corresponding task of the comment.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "comment",
            "description": "<p>The updated comment.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to modify the comment.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The task or comment does not exist.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>The validation of the comment failed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Comment"
  },
  {
    "type": "put",
    "url": "/projects/:project_id/tasks/:task_id/comments/:comment_id",
    "title": "Update the comment of a task in a project.",
    "name": "PutCommentOfTaskInProject",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "project_id",
            "description": "<p>the id of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "task_id",
            "description": "<p>the id of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "comment_id",
            "description": "<p>the id of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "comment",
            "description": "<p>The comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment.title",
            "description": "<p>The title of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment.text",
            "description": "<p>The text of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment.user",
            "description": "<p>The user of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "comment.date",
            "description": "<p>The date of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment.task",
            "description": "<p>The corresponding task of the comment.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "comment",
            "description": "<p>The updated comment.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to modify the comment.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The project, task or comment does not exist.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>The validation of the comment failed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Comment"
  },
  {
    "type": "get",
    "url": "/comments",
    "title": "List all visible comments.",
    "name": "GetComments",
    "group": "Comments",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "comments",
            "description": "<p>The list of visible comments.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Comments",
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/projects/:project_id/comments",
    "title": "List all comments of a project.",
    "name": "GetCommentsOfProject",
    "group": "Comments",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "project_id",
            "description": "<p>The id of the project.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "comments",
            "description": "<p>The list of comments in the project.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to retrieve comments of the project.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Project does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Comments"
  },
  {
    "type": "get",
    "url": "/projects/:project_id/tasks/:task_id/comments",
    "title": "List all comments of a task in the project.",
    "name": "GetCommentsOfTaskInProject",
    "group": "Comments",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "project_id",
            "description": "<p>The id of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "task_id",
            "description": "<p>The id of the task.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "comments",
            "description": "<p>The list of comments of the task in the project.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to retrieve comments of the task.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Project or task does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Comments"
  },
  {
    "type": "get",
    "url": "/tasks/:task_id/comments",
    "title": "List all comments of a task.",
    "name": "GetCommentsOftask",
    "group": "Comments",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "comments",
            "description": "<p>The list of comments in the task.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to retrieve comments of the task.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>task does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Comments"
  },
  {
    "type": "post",
    "url": "/tasks/:task_id/comments",
    "title": "Create a new comment in the task.",
    "name": "PostComments",
    "group": "Comments",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "task_id",
            "description": "<p>The id of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "comment",
            "description": "<p>The comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment.title",
            "description": "<p>The title of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment.text",
            "description": "<p>The text of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment.user",
            "description": "<p>The user of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "comment.date",
            "description": "<p>The date of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment.task",
            "description": "<p>The corresponding task of the comment.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "comment",
            "description": "<p>The created comment.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to create a comment in the task.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>task does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Comments"
  },
  {
    "type": "post",
    "url": "/projects/:project_id/tasks/:task_id/comments",
    "title": "Create a new comment of the task in the project.",
    "name": "PostCommentsOfTaskInProject",
    "group": "Comments",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "project_id",
            "description": "<p>The id of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "task_id",
            "description": "<p>The id of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "comment",
            "description": "<p>The comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment.title",
            "description": "<p>The title of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment.text",
            "description": "<p>The text of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment.user",
            "description": "<p>The user of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "comment.date",
            "description": "<p>The date of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment.task",
            "description": "<p>The corresponding task of the comment.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "comment",
            "description": "<p>The created comment.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to create a comment in the project.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Project does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Comments"
  },
  {
    "type": "delete",
    "url": "/notes/:note_id",
    "title": "Delete the note.",
    "name": "DeleteNote",
    "group": "Note",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "note_id",
            "description": "<p>the id of the note.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "OK",
            "description": "<p>The note has been deleted.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to delete the note.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The note does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Note"
  },
  {
    "type": "delete",
    "url": "/projects/:project_id/notes/:note_id",
    "title": "Delete the note of the project.",
    "name": "DeleteNoteOfProject",
    "group": "Note",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "project_id",
            "description": "<p>The id of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "note_id",
            "description": "<p>the id of the note.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "OK",
            "description": "<p>The note has been deleted.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to delete the note.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The note does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Note"
  },
  {
    "type": "get",
    "url": "/notes/:note_id",
    "title": "Retrieve the note.",
    "name": "GetNote",
    "group": "Note",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "note_id",
            "description": "<p>The id of the note.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "note",
            "description": "<p>The requested note.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to retrieve the notes.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The note does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Note"
  },
  {
    "type": "get",
    "url": "/projects/:project_id/notes/:note_id",
    "title": "Retrieve the note of the project.",
    "name": "GetNoteOfProject",
    "group": "Note",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "project_id",
            "description": "<p>The id of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "note_id",
            "description": "<p>The id of the note.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "note",
            "description": "<p>The requested note.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to retrieve the notes.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The note does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Note"
  },
  {
    "type": "put",
    "url": "/notes/:note_id",
    "title": "Update the note.",
    "name": "PutNote",
    "group": "Note",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "note_id",
            "description": "<p>the id of the note.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "note",
            "description": "<p>The note.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "note.text",
            "description": "<p>The text of the note.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "note.owner",
            "description": "<p>The owner of the note.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "note.date",
            "description": "<p>The date of the note.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "note.color",
            "description": "<p>The color of the note.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "note.priority",
            "description": "<p>The priority of the note.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "note.project",
            "description": "<p>The corresponding project of the note.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "note",
            "description": "<p>The updated note.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to modify the note.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The note does not exist.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>The validation of the note failed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Note"
  },
  {
    "type": "put",
    "url": "/projects/:project_id/notes/:note_id",
    "title": "Update the note of the project.",
    "name": "PutNoteOfProject",
    "group": "Note",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "project_id",
            "description": "<p>The id of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "note_id",
            "description": "<p>the id of the note.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "note",
            "description": "<p>The note.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "note.text",
            "description": "<p>The text of the note.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "note.owner",
            "description": "<p>The owner of the note.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "note.date",
            "description": "<p>The date of the note.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "note.color",
            "description": "<p>The color of the note.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "note.priority",
            "description": "<p>The priority of the note.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "note.project",
            "description": "<p>The corresponding project of the note.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "note",
            "description": "<p>The updated note.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to modify the note.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The note does not exist.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>The validation of the note failed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Note"
  },
  {
    "type": "get",
    "url": "/notes",
    "title": "List all visible notes.",
    "name": "GetNotes",
    "group": "Notes",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "notes",
            "description": "<p>The list of visible notes.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Notes",
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/projects/:project_id/notes",
    "title": "List all notes of a project.",
    "name": "GetNotesOfProject",
    "group": "Notes",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "notes",
            "description": "<p>The list of notes in the project.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to retrieve notes of the project.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Project does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Notes"
  },
  {
    "type": "post",
    "url": "/projects/:project_id/notes",
    "title": "Create a new note in the project.",
    "name": "PostNotes",
    "group": "Notes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "project_id",
            "description": "<p>The id of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "note",
            "description": "<p>The note.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "note.text",
            "description": "<p>The text of the note.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "note.owner",
            "description": "<p>The owner of the note.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "note.date",
            "description": "<p>The date of the note.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "note.color",
            "description": "<p>The color of the note.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "note.priority",
            "description": "<p>The priority of the note.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "note.project",
            "description": "<p>The corresponding project of the note.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "note",
            "description": "<p>The created note.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to create a note in the project.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Project does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Notes"
  },
  {
    "type": "delete",
    "url": "/projects/:project_id",
    "title": "Delete the project.",
    "name": "DeleteProject",
    "group": "Project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "project_id",
            "description": "<p>the id of the project.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "OK",
            "description": "<p>The project has been deleted.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to delete the project.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The project does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/projects/:project_id",
    "title": "Retrieve the project.",
    "name": "GetProject",
    "group": "Project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "project_id",
            "description": "<p>The id of the project.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "project",
            "description": "<p>The requested project.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The project does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Project"
  },
  {
    "type": "post",
    "url": "/projects/:project_id/join",
    "title": "Join the project.",
    "name": "JoinProject",
    "group": "Project",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "OK",
            "description": "<p>Successfully joined the project.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "409": [
          {
            "group": "409",
            "optional": false,
            "field": "AlreadyJoined",
            "description": "<p>Already a member of the project.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Project"
  },
  {
    "type": "delete",
    "url": "/projects/:project_id/delete",
    "title": "Leave the project.",
    "name": "LeaveProject",
    "group": "Project",
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "OK",
            "description": "<p>Successfully left the project.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "NotMember",
            "description": "<p>Not a member of the project.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Project"
  },
  {
    "type": "put",
    "url": "/projects/:project_id",
    "title": "Update the project.",
    "name": "PutProject",
    "group": "Project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "project_id",
            "description": "<p>the id of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "project",
            "description": "<p>The project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "project.name",
            "description": "<p>The name of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "project.isPublic",
            "description": "<p>Whether the project is public.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "project.owner",
            "description": "<p>The owner of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "project.members",
            "description": "<p>The members of the project.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "project",
            "description": "<p>The updated project.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to modify the project.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The project does not exist.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>The validation of the project failed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/projects",
    "title": "List all projects.",
    "name": "GetProjects",
    "group": "Projects",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "projects",
            "description": "<p>The list of projects.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Projects",
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/projects",
    "title": "Create a new project.",
    "name": "PostProjects",
    "group": "Projects",
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "project",
            "description": "<p>The created project.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>The validation of the project failed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Projects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "project",
            "description": "<p>The project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "project.name",
            "description": "<p>The name of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "project.isPublic",
            "description": "<p>Whether the project is public.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "project.owner",
            "description": "<p>The owner of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "project.members",
            "description": "<p>The members of the project.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/tasks/:task_id",
    "title": "Delete the task.",
    "name": "DeleteTask",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "task_id",
            "description": "<p>the id of the task.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "OK",
            "description": "<p>The task has been deleted.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to delete the task.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The task does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Task"
  },
  {
    "type": "delete",
    "url": "/projects/:project_id/tasks/:task_id",
    "title": "Delete the task of the project.",
    "name": "DeleteTaskOfProject",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "project_id",
            "description": "<p>The id of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "task_id",
            "description": "<p>the id of the task.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "OK",
            "description": "<p>The task has been deleted.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to delete the task.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The task does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Task"
  },
  {
    "type": "get",
    "url": "/tasks/:task_id",
    "title": "Retrieve the task.",
    "name": "GetTask",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "task_id",
            "description": "<p>The id of the task.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "task",
            "description": "<p>The requested task.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to retrieve the tasks.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The task does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Task"
  },
  {
    "type": "get",
    "url": "/projects/:project_id/tasks/:task_id",
    "title": "Retrieve the task of the project.",
    "name": "GetTaskOfProject",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "project_id",
            "description": "<p>The id of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "task_id",
            "description": "<p>The id of the task.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "task",
            "description": "<p>The requested task.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to retrieve the tasks of the project.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The task does not exist in the project.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Task"
  },
  {
    "type": "post",
    "url": "/tasks/:task_id/join",
    "title": "Join the task.",
    "name": "JoinTask",
    "group": "Task",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "OK",
            "description": "<p>Successfully joined the task.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "409": [
          {
            "group": "409",
            "optional": false,
            "field": "AlreadyJoined",
            "description": "<p>Already a member of the task.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Task"
  },
  {
    "type": "post",
    "url": "/projects/:project_id/tasks/:task_id/join",
    "title": "Join the task of a project.",
    "name": "JoinTaskOfProject",
    "group": "Task",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "OK",
            "description": "<p>Successfully joined the task.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "409": [
          {
            "group": "409",
            "optional": false,
            "field": "AlreadyJoined",
            "description": "<p>Already a member of the task.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Task"
  },
  {
    "type": "delete",
    "url": "/tasks/:task_id/delete",
    "title": "Leave the task.",
    "name": "LeaveTask",
    "group": "Task",
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "OK",
            "description": "<p>Successfully left the task.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "NotMember",
            "description": "<p>Not a member of the task.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Task"
  },
  {
    "type": "delete",
    "url": "/projects/:project_id/tasks/:task_id/delete",
    "title": "Leave the task of a project.",
    "name": "LeaveTaskOfProject",
    "group": "Task",
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "OK",
            "description": "<p>Successfully left the task.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "NotMember",
            "description": "<p>Not a member of the task.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Task"
  },
  {
    "type": "put",
    "url": "/tasks/:task_id",
    "title": "Update the task.",
    "name": "PutTask",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "task_id",
            "description": "<p>the id of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "task",
            "description": "<p>The task.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "task.title",
            "description": "<p>The title of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "task.text",
            "description": "<p>The text of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "task.owner",
            "description": "<p>The owner of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "task.date",
            "description": "<p>The date of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "task.deadline",
            "description": "<p>The deadline of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "task.assignedUsers",
            "description": "<p>The assigned users of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "task.color",
            "description": "<p>The color of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "task.project",
            "description": "<p>The corresponding project of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "task.isDone",
            "defaultValue": "false",
            "description": "<p>Whether the task is done.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "task",
            "description": "<p>The updated task.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to modify the task.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The task does not exist.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>The validation of the task failed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Task"
  },
  {
    "type": "put",
    "url": "/projects/:project_id/tasks/:task_id",
    "title": "Update the task of the project.",
    "name": "PutTaskOfProject",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "project_id",
            "description": "<p>The id of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "task_id",
            "description": "<p>the id of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "task",
            "description": "<p>The task.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "task.title",
            "description": "<p>The title of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "task.text",
            "description": "<p>The text of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "task.owner",
            "description": "<p>The owner of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "task.date",
            "description": "<p>The date of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "task.deadline",
            "description": "<p>The deadline of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "task.assignedUsers",
            "description": "<p>The assigned users of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "task.color",
            "description": "<p>The color of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "task.project",
            "description": "<p>The corresponding project of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "task.isDone",
            "defaultValue": "false",
            "description": "<p>Whether the task is done.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "task",
            "description": "<p>The updated task.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to modify the task.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The task does not exist.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>The validation of the task failed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Task"
  },
  {
    "type": "get",
    "url": "/tasks",
    "title": "List all visible tasks.",
    "name": "GetTasks",
    "group": "Tasks",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "tasks",
            "description": "<p>The list of visible tasks.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Tasks",
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/projects/:project_id/tasks",
    "title": "List all tasks of a project.",
    "name": "GetTasksOfProject",
    "group": "Tasks",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "project_id",
            "description": "<p>The id of the project.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "tasks",
            "description": "<p>The list of tasks in the project.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to retrieve tasks of the project.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Project does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Tasks"
  },
  {
    "type": "post",
    "url": "/projects/:project_id/tasks",
    "title": "Create a new task in the project.",
    "name": "PostTasks",
    "group": "Tasks",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "project_id",
            "description": "<p>The id of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "task",
            "description": "<p>The task.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "task.title",
            "description": "<p>The title of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "task.text",
            "description": "<p>The text of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "task.owner",
            "description": "<p>The owner of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "task.date",
            "description": "<p>The date of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "task.deadline",
            "description": "<p>The deadline of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "task.assignedUsers",
            "description": "<p>The assigned users of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "task.color",
            "description": "<p>The color of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "task.project",
            "description": "<p>The corresponding project of the task.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "task.isDone",
            "defaultValue": "false",
            "description": "<p>Whether the task is done.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "task",
            "description": "<p>The created task.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The credentials are invalid.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to create a task in the project.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Project does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Tasks"
  },
  {
    "type": "delete",
    "url": "/users/:user_id",
    "title": "Delete the user.",
    "name": "DeleteUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "user_id",
            "description": "<p>the id of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "OK",
            "description": "<p>The user has been deleted.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to delete the user.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The user does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:user_id",
    "title": "Retrieve the user.",
    "name": "GetUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "user_id",
            "description": "<p>The id of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>The requested user.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The user does not exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/:user_id",
    "title": "Update the user.",
    "name": "PutUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "12",
            "optional": false,
            "field": "user_id",
            "description": "<p>the id of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>The user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": "<p>The username of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.password",
            "description": "<p>The password of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>The email of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.firstName",
            "description": "<p>The first name of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.lastName",
            "description": "<p>The last name of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>The updated user.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed to modify the user.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The user does not exist.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>The validation of the user failed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "List all users.",
    "name": "GetUsers",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "users",
            "description": "<p>The list of users.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create a new user.",
    "name": "PostUsers",
    "group": "Users",
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>The created user.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>The validation of the user failed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>The user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": "<p>The username of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.password",
            "description": "<p>The password of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>The email of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.firstName",
            "description": "<p>The first name of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.lastName",
            "description": "<p>The last name of the user.</p>"
          }
        ]
      }
    }
  }
] });
