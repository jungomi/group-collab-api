/*jshint expr: true*/
process.env.NODE_ENV = 'test';
var expect = require('chai').expect;
var request = require('superagent');
var _ = require('lodash');
var User = require('../../models/user');
var Project = require('../../models/project');
var Task = require('../../models/task');
var http = require('http');
var port = 2555;
var url = 'http://localhost:' + port + '/api';

describe('/tasks', function() {
  var app = require('../../app.js');
  var server;
  var username = 'myuser';
  var password = 'mypassword';
  var user = new User({ username: username, password: password });
  var taskUrl = url + '/tasks';

  before(function(done) {
    app.set('port', port);
    server = http.createServer(app);
    server.listen(port);
    user.save(function(err) {
      if (err) {
        return done(err);
      }
    });
    done();
  });

  after(function(done) {
    user.remove(function(err) {
      if (err) {
        return done(err);
      }
    });
    server.close(done);
  });

  describe('GET', function() {
    describe('with incorrect credentials', function() {
      it('returns an unauthorized error', function(done) {
        request
          .get(taskUrl)
          .end(function(err, res) {
            expect(err).to.exist;
            expect(err).to.have.property('status', 401);
            done();
          });
      });
    });

    describe('with correct credentials', function() {
      it('returns the list of tasks', function(done) {
        request
          .get(taskUrl)
          .auth(username, password)
          .end(function(err, res) {
            expect(err).to.not.exist;
            expect(res).to.have.property('status', 200);
            expect(res).to.have.property('body')
              .that.has.property('tasks')
              .that.is.an('array');
            done();
          });
      });
    });
  });
});

describe('/projects/:project_id/tasks', function() {
  var app = require('../../app.js');
  var server;
  var title = 'my title';
  var username = 'myuser';
  var password = 'mypassword';
  var user = new User({ username: username, password: password });
  var project = new Project({ name: 'my project', owner: user._id });
  var docs = [user, project];
  var taskUrl = url + '/projects/' + project._id + '/tasks';

  before(function(done) {
    app.set('port', port);
    server = http.createServer(app);
    server.listen(port);
    _.each(docs, function(doc) {
      doc.save(function(err) {
        if (err) {
          return done(err);
        }
      });
    });
    done();
  });

  after(function(done) {
    project.remove(function(err) {
      if (err) {
        return done(err);
      }
    });
    user.remove(function(err) {
      if (err) {
        return done(err);
      }
      server.close(done);
    });
  });

  describe('GET', function() {
    describe('with incorrect credentials', function() {
      it('returns an unauthorized error', function(done) {
        request
          .get(taskUrl)
          .end(function(err, res) {
            expect(err).to.exist;
            expect(err).to.have.property('status', 401);
            done();
          });
      });
    });

    describe('with correct credentials', function() {
      it('returns the list of tasks', function(done) {
        request
          .get(taskUrl)
          .auth(username, password)
          .end(function(err, res) {
            expect(err).to.not.exist;
            expect(res).to.have.property('status', 200);
            expect(res).to.have.property('body')
              .that.has.property('tasks')
              .that.is.an('array');
            done();
          });
      });
    });
  });

  describe('POST', function() {
      describe('with incorrect credentials', function() {
        it('returns an unauthorized error', function(done) {
          request
            .post(taskUrl)
            .end(function(err, res) {
              expect(err).to.exist;
              expect(err).to.have.property('status', 401);
              done();
            });
        });
      });

      describe('with correct credentials', function() {
        describe('with incomplete informations', function() {
          it('returns a validation error', function(done) {
            request
              .post(taskUrl)
              .auth(username, password)
              .send({ task: {} })
              .end(function(err, res) {
                expect(err).to.exist;
                expect(err).to.have.property('status', 500);
                done();
              });
          });
        });

        describe('with complete informations', function() {
          it('returns the created created task', function(done) {
            request
              .post(taskUrl)
              .auth(username, password)
              .send({ task: { title: title } })
              .end(function(err, res) {
                expect(err).to.not.exist;
                expect(res).to.have.property('status', 201);
                expect(res).to.have.property('body')
                  .that.has.property('task');
                expect(res.body.task).to.have.property('title', title);
              });
              done();
          });
        });
      });
  });
});

describe('/tasks/:task_id', function() {
  var app = require('../../app.js');
  var server;
  var title = 'my title';
  var username = 'myuser';
  var password = 'mypassword';
  var user = new User({ username: username, password: password });
  var otherUser = new User({ username: 'other', password: 'otherpw' });
  var project = new Project({ name: 'my project', owner: user._id });
  var otherProject = new Project({ name: 'not mine', owner: otherUser._id });
  var task = new Task({ title: title, owner: user._id, project: project._id });
  var otherTask = new Task({ title: 'other', owner: otherUser._id,
                             project: otherProject._id });
  var docs = [user, otherUser, project, otherProject, task, otherTask];
  var taskUrl = url + '/tasks/';

  before(function(done) {
    app.set('port', port);
    server = http.createServer(app);
    server.listen(port);
    _.each(docs, function(doc) {
      doc.save(function(err) {
        if (err) {
          return done(err);
        }
      });
    });
    done();
  });

  after(function(done) {
    var rev = docs.reverse();
    _.each(rev, function(doc) {
      doc.remove(function(err) {
        if (err) {
          return done(err);
        }
      });
    });
    server.close(done);
  });

  describe('GET', function() {
    describe('with an invalid id', function() {
      it('returns an unauthorized error', function(done) {
        request
          .get(taskUrl + '123')
          .end(function(err, res) {
            expect(err).to.exist;
            expect(err).to.have.property('status', 401);
            done();
          });
      });
    });

    describe('with a valid id', function() {
      it('returns the task', function(done) {
        request
          .get(taskUrl + task._id)
          .auth(username, password)
          .end(function(err, res) {
            expect(err).to.not.exist;
            expect(res).to.have.property('body')
              .that.has.property('task');
            expect(res.body.task).to.have.property('title', title);
            expect(res.body.task.owner).to.have.property('username', username);
            done();
          });
      });
    });
  });

  describe('PUT', function() {
    var text = 'my text';
    var payload = { task: { text: text } };

    describe('with an invalid id', function() {
      it('returns a not found error', function(done) {
        request
          .put(taskUrl + '123')
          .auth(username, password)
          .send(payload)
          .end(function(err, res) {
            expect(err).to.exist;
            expect(err).to.have.property('status', 404);
            done();
          });
      });
    });

    describe('with a valid id', function() {
      describe('with incorrect credentials', function() {
        it('returns an unauthorized error', function(done) {
          request
            .put(taskUrl + task._id)
            .send(payload)
            .end(function(err, res) {
              expect(err).to.exist;
              expect(err).to.have.property('status', 401);
              done();
            });
        });
      });

      describe('when not the owner', function() {
        it('returns a forbidden error', function(done) {
          request
            .put(taskUrl + otherTask._id)
            .auth(username, password)
            .send(payload)
            .end(function(err, res) {
              expect(err).to.exist;
              expect(err).to.have.property('status', 403);
              done();
            });
        });
      });

      describe('with correct credentials', function() {
        it('returns the modified task', function(done) {
          request
            .put(taskUrl + task._id)
            .auth(username, password)
            .send(payload)
            .end(function(err, res) {
              expect(err).to.not.exist;
              expect(res).to.have.property('body')
                .that.has.property('task');
              expect(res.body.task).to.have.property('title', title);
              expect(res.body.task).to.have.property('text', text);
              expect(res.body.task.owner).to.have.property('username', username);
              done();
            });
        });
      });

      describe('when changing assigned users', function() {
        it('returns the populated task', function(done) {
          request
            .put(taskUrl + task._id)
            .auth(username, password)
            .send({ task: { assignedUsers: [otherUser._id] } })
            .end(function(err, res) {
              expect(err).to.not.exist;
              expect(res).to.have.property('body')
                .that.has.property('task');
              expect(res.body.task).to.have.property('title', title);
              expect(res.body.task).to.have.property('assignedUsers')
                .that.is.an('array');
              expect(res.body.task.assignedUsers[0])
                .to.have.property('username', 'other');
              done();
            });
        });
      });
    });
  });

  describe('DELETE', function() {
    describe('with an invalid id', function() {
      describe('with invalid credentials', function() {
        it('returns an unauthorized error', function(done) {
          request
            .delete(taskUrl + '123')
            .end(function(err, res) {
              expect(err).to.exist;
              expect(err).to.have.property('status', 401);
              done();
            });
        });
      });

      describe('with valid credentials', function() {
        it('returns a not found error', function(done) {
          request
            .delete(taskUrl + '123')
            .auth(username, password)
            .end(function(err, res) {
              expect(err).to.exist;
              expect(err).to.have.property('status', 404);
              done();
            });
        });
      });
    });

    describe('with a valid id', function() {
      describe('with invalid credentials', function() {
        it('returns an unauthorized error', function(done) {
          request
            .delete(taskUrl + task._id)
            .end(function(err, res) {
              expect(err).to.exist;
              expect(err).to.have.property('status', 401);
              done();
            });
        });
      });

      describe('when not the owner', function() {
        it('returns a forbidden error', function(done) {
          request
            .delete(taskUrl + otherTask._id)
            .auth(username, password)
            .end(function(err, res) {
              expect(err).to.exist;
              expect(err).to.have.property('status', 403);
              done();
            });
        });
      });

      describe('with valid credentials', function() {
        it('returns success', function(done) {
          request
            .delete(taskUrl + task._id)
            .auth(username, password)
            .end(function(err, res) {
              expect(err).to.not.exist;
              expect(res).to.have.property('status', 204);
              done();
            });
        });
      });
    });
  });
});

describe('assigned users', function() {
  var app = require('../../app.js');
  var server;
  var title = 'my title';
  var username = 'myuser';
  var password = 'mypassword';
  var user = new User({ username: username, password: password });
  var project = new Project({ name: 'my project', owner: user._id });
  var task = new Task({ title: title, owner: user._id, project: project._id });
  var docs = [user, project, task];
  var taskUrl = url + '/tasks/' + task._id;

  before(function(done) {
    app.set('port', port);
    server = http.createServer(app);
    server.listen(port);
    _.each(docs, function(doc) {
      doc.save(function(err) {
        if (err) {
          return done(err);
        }
      });
    });
    done();
  });

  after(function(done) {
    _.each(docs, function(doc) {
      doc.remove(function(err) {
        if (err) {
          return done(err);
        }
      });
    });
    server.close(done);
  });

  describe('/join', function() {
    describe('with incorrect credentials', function() {
      it('returns an unauthorized error', function(done) {
        request
          .post(taskUrl + '/join')
          .end(function(err, res) {
            expect(err).to.exist;
            expect(err).to.have.property('status', 401);
            done();
          });
      });
    });

    describe('with correct credentials', function() {
      it('returns success', function(done) {
        request
          .post(taskUrl + '/join')
          .auth(username, password)
          .end(function(err, res) {
            expect(err).to.not.exist;
            expect(res).to.have.property('status', 200);
            done();
          });
      });
    });

    describe('when already member', function() {
      it('returns a already member error', function(done) {
        request
          .post(taskUrl + '/join')
          .auth(username, password)
          .end(function(err, res) {
            expect(err).to.exist;
            expect(err).to.have.property('status', 409);
            done();
          });
      });
    });
  });

  describe('/leave', function() {
    describe('with incorrect credentials', function() {
      it('returns an unauthorized error', function(done) {
        request
          .delete(taskUrl + '/leave')
          .end(function(err, res) {
            expect(err).to.exist;
            expect(err).to.have.property('status', 401);
            done();
          });
      });
    });

    describe('with correct credentials', function() {
      it('returns success', function(done) {
        request
          .delete(taskUrl + '/leave')
          .auth(username, password)
          .end(function(err, res) {
            expect(err).to.not.exist;
            expect(res).to.have.property('status', 204);
            done();
          });
      });
    });

    describe('when not member', function() {
      it('returns a not a member error', function(done) {
        request
          .delete(taskUrl + '/leave')
          .auth(username, password)
          .end(function(err, res) {
            expect(err).to.exist;
            expect(err).to.have.property('status', 400);
            done();
          });
      });
    });
  });
});
