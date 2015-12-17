/*jshint expr: true*/
process.env.NODE_ENV = 'test';
var expect = require('chai').expect;
var request = require('superagent');
var app = require('../../app.js');
var User = require('../../models/user');
var Project = require('../../models/project');
var http = require('http');
var port = 2555;
var server;
var url = 'http://localhost:' + port + '/api/projects';

describe('/projects', function() {
  var name = 'my name';
  var username = 'myuser';
  var password = 'mypassword';
  var user = new User({ username: username, password: password });
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
    if (User.findOne({ username: username })) {
      User.remove({ username: username }, function(err) {
        if (err) {
          return done(err);
        }
      });
    }
    server.close();
    done();
  });

  describe('GET', function() {
    describe('with incorrect credentials', function() {
      it('returns an unauthorized error', function(done) {
        request
          .get(url)
          .end(function(err, res) {
            expect(err).to.exist;
            expect(err).to.have.property('status', 401);
            done();
          });
      });
    });

    describe('with correct credentials', function() {
        it('returns the list of projects', function(done) {
          request
            .get(url)
            .auth(username, password)
            .end(function(err, res) {
              expect(err).to.not.exist;
              expect(res).to.have.property('status', 200);
              expect(res).to.have.property('body')
                .that.has.property('projects')
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
          .post(url)
          .end(function(err, res) {
            expect(err).to.exist;
            expect(err).to.have.property('status', 401);
            done();
          });
      });
    });

    describe('with correct credentials', function() {
      describe('with missing informations', function() {
        it('returns a validation error', function(done) {
          request
            .post(url)
            .auth(username, password)
            .send({ project: {} })
            .end(function(err, res) {
              expect(err).to.exist;
              expect(err).to.have.property('status', 500);
              done();
            });
        });
      });

      describe('with complete informations', function() {
        it('returns the created created project', function(done) {
          request
            .post(url)
            .auth(username, password)
            .send({ project: { name: name } })
            .end(function(err, res) {
              expect(err).to.not.exist;
              expect(res).to.have.property('status', 201);
              expect(res).to.have.property('body')
                .that.has.property('project');
              expect(res.body.project).to.have.property('name', name);
            });
            done();
        });
      });
    });
  });
});

describe('/projects/:project_id', function() {
  var id;
  var otherId;
  var name = 'my name';
  var username = 'myuser';
  var password = 'mypassword';
  var user = new User({ username: username, password: password });
  var otherUser = new User({ username: 'other', password: 'otherpw' });
  var project = new Project({ name: name, owner: user._id });
  var otherProject = new Project({ name: name, owner: otherUser._id });

  before(function(done) {
    app.set('port', port);
    server = http.createServer(app);
    server.listen(port);
    user.save(function(err) {
      if (err) {
        return done(err);
      }
    });
    otherUser.save(function(err) {
      if (err) {
        return done(err);
      }
    });
    project.save(function(err) {
      if (err) {
        return done(err);
      }
      id = project._id;
    });
    otherProject.save(function(err) {
      if (err) {
        return done(err);
      }
      otherId = otherProject._id;
    });
    done();
  });

  after(function(done) {
    User.remove({ username: username }, function(err) {
      if (err) {
        return done(err);
      }
    });
    User.remove({ username: 'other' }, function(err) {
      if (err) {
        return done(err);
      }
    });
    Project.remove({ _id: id }, function(err) {
      if (err) {
        return done(err);
      }
    });
    Project.remove({ _id: otherId }, function(err) {
      if (err) {
        return done(err);
      }
    });
    server.close();
    done();
  });

  describe('GET', function() {
    describe('with an invalid id', function() {
      it('returns an unauthorized error', function(done) {
        request
          .get(url + '/123')
          .end(function(err, res) {
            expect(err).to.exist;
            expect(err).to.have.property('status', 401);
            done();
          });
      });
    });

    describe('with a valid id', function() {
      it('returns the project', function(done) {
        request
          .get(url + '/' + id)
          .auth(username, password)
          .end(function(err, res) {
            expect(err).to.not.exist;
            expect(res).to.have.property('body')
              .that.has.property('project');
            expect(res.body.project).to.have.property('name', name);
            expect(res.body.project.owner).to.have.property('username', username);
            done();
          });
      });
    });
  });

  describe('PUT', function() {
    var isPublic = false;
    var payload = { project: { isPublic: isPublic } };

    describe('with an invalid id', function() {
      it('returns a not found error', function(done) {
        request
          .put(url + '/123')
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
            .put(url + '/' + id)
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
            .put(url + '/' + otherId)
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
        it('returns the modified project', function(done) {
          request
            .put(url + '/' + id)
            .auth(username, password)
            .send(payload)
            .end(function(err, res) {
              expect(err).to.not.exist;
              expect(res).to.have.property('body')
                .that.has.property('project');
              expect(res.body.project).to.have.property('name', name);
              expect(res.body.project).to.have.property('isPublic', isPublic);
              expect(res.body.project.owner).to.have.property('username', username);
              done();
            });
        });
      });

      describe('when changing members', function() {
        it('returns the populated project', function(done) {
          request
            .put(url + '/' + id)
            .auth(username, password)
            .send({ project: { members: [otherUser._id] } })
            .end(function(err, res) {
              expect(err).to.not.exist;
              expect(res).to.have.property('body')
                .that.has.property('project');
              expect(res.body.project).to.have.property('name', name);
              expect(res.body.project).to.have.property('members')
                .that.is.an('array');
              expect(res.body.project.members[0])
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
            .delete(url + '/123')
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
            .delete(url + '/123')
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
            .delete(url + '/' + id)
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
            .delete(url + '/' + otherId)
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
            .delete(url + '/' + id)
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

describe('membership', function() {
  var id;
  var name = 'my name';
  var username = 'myuser';
  var password = 'mypassword';
  var user = new User({ username: username, password: password });
  var project = new Project({ name: name, owner: user._id });

  before(function(done) {
    app.set('port', port);
    server = http.createServer(app);
    server.listen(port);
    user.save(function(err) {
      if (err) {
        return done(err);
      }
    });
    project.save(function(err) {
      if (err) {
        return done(err);
      }
      id = project._id;
    });
    done();
  });

  after(function(done) {
    User.remove({ username: username }, function(err) {
      if (err) {
        return done(err);
      }
    });
    Project.remove({ _id: id }, function(err) {
      if (err) {
        return done(err);
      }
    });
    server.close();
    done();
  });

  describe('/join', function() {
    describe('with incorrect credentials', function() {
      it('returns an unauthorized error', function(done) {
        request
          .post(url + '/' + id + '/join')
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
          .post(url + '/' + id + '/join')
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
          .post(url + '/' + id + '/join')
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
          .delete(url + '/' + id + '/leave')
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
          .delete(url + '/' + id + '/leave')
          .auth(username, password)
          .end(function(err, res) {
            expect(err).to.not.exist;
            expect(res).to.have.property('status', 200);
            done();
          });
      });
    });

    describe('when not member', function() {
      it('returns a not a member error', function(done) {
        request
          .delete(url + '/' + id + '/leave')
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
