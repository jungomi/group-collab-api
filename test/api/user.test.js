/*jshint expr: true*/
process.env.NODE_ENV = 'test';
var expect = require('chai').expect;
var request = require('superagent');
var app = require('../../app.js');
var User = require('../../models/user');
var http = require('http');
var port = 2555;
var server;
var url = 'http://localhost:' + port + '/api/users';

describe('/users', function() {
  before(function(done) {
    app.set('port', port);
    server = http.createServer(app);
    server.listen(port);
    done();
  });

  after(function() {
    server.close();
  });

  describe('GET', function() {
    it('returns the list of users', function(done) {
      request
        .get(url)
        .end(function(err, res) {
          expect(err).to.not.exist;
          expect(res).to.have.property('status', 200);
          expect(res).to.have.property('body')
           .that.has.property('users')
           .that.is.an('array');
          done();
        });
    });
  });

  describe('POST', function() {
    var username = 'myuser';
    var password = 'mypassword';

    after(function(done) {
      User.remove({ username: username }, function(err) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    describe('with missing informations', function() {
      it('returns an error', function(done) {
        request
         .post(url)
         .send({ user: { username: username } })
         .end(function(err, res) {
           expect(err).to.exist;
           done();
         });
      });
    });

    describe('with complete informations', function() {
      it('returns the created user', function(done) {
        request
        .post(url)
        .send({ user: { username: username, password: password } })
        .end(function(err, res) {
          expect(err).to.not.exist;
          expect(res).to.have.property('body')
            .that.has.property('user');
          expect(res.body.user).to.have.property('username', username);
        });
        done();
      });
    });

    describe('when user already exists', function() {
      it('returns an error', function(done) {
        request
        .post(url)
        .send({ user: { username: username, password: password } })
        .end(function(err, res) {
          expect(err).to.exist;
        });
        done();
      });
    });
  });
});

describe('/users/:user_id', function() {
  var username = 'myuser';
  var password = 'mypassword';
  var firstName = 'first';
  var id;
  var user = new User({ username: username,
                      password: password,
                      firstName: firstName });

  before(function(done) {
    app.set('port', port);
    server = http.createServer(app);
    server.listen(port);
    user.save(function(err) {
      if (err) {
        return done(err);
      }
      id = user._id;
    });
    done();
  });

  after(function(done) {
    if (!User.findById(id)) {
      return done();
    }
    User.remove({ _id: id }, function(err) {
      if (err) {
        return done(err);
      }
    });
    server.close();
    done();
  });

  describe('GET', function() {
    describe('with an invalid id', function() {
      it('returns an error', function(done) {
        request
          .get(url + '/123')
          .end(function(err, res) {
            expect(err).to.exist;
            done();
          });
      });
    });

    describe('with a valid id', function() {
      it('returns the user', function(done) {
        request
          .get(url + '/' + id)
          .end(function(err, res) {
            expect(err).to.not.exist;
            expect(res).to.have.property('body')
              .that.has.property('user');
            expect(res.body.user).to.have.property('username', username);
            expect(res.body.user).to.have.property('firstName', firstName);
            done();
          });
      });
    });
  });

  describe('PUT', function() {
    var newName = 'new name';
    var payload = { user: { firstName: newName } };

    describe('with an invalid id', function() {
      it('returns an error', function(done) {
        request
          .put(url + '/123')
          .auth(username, password)
          .send(payload)
          .end(function(err, res) {
            expect(err).to.exist;
            done();
          });
      });
    });

    describe('with a valid id', function() {
      describe('with incorrect credentials', function() {
        it('returns an error', function(done) {
          request
            .put(url + '/' + id)
            .send(payload)
            .end(function(err, res) {
              expect(err).to.exist;
              done();
            });
        });
      });

      describe('when trying to edit another user', function() {
        var anotherId;
        var anotherUser = new User({ username: 'anotheruser',
                                     password: password });

        before(function(done) {
          anotherUser.save(function(err) {
            if (err) {
              return done(err);
            }
            anotherId = anotherUser._id;
          });
          done();
        });

        after(function(done) {
          if (!User.findById(anotherId)) {
            return done();
          }
          User.remove({ _id: anotherId }, function(err) {
            if (err) {
              return done(err);
            }
          });
          done();
        });

        it('returns a forbidden error', function(done) {
          request
            .put(url + '/' + anotherId)
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
        it('returns the modified user', function(done) {
          request
            .put(url + '/' + id)
            .auth(username, password)
            .send(payload)
            .end(function(err, res) {
              expect(err).to.not.exist;
              expect(res).to.have.property('body')
                .that.has.property('user');
              expect(res.body.user).to.have.property('username', username);
              expect(res.body.user).to.have.property('firstName', newName);
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

      describe('when trying to edit another user', function() {
        var anotherId;
        var anotherUser = new User({ username: 'anotheruser',
                                     password: password });

        before(function(done) {
          anotherUser.save(function(err) {
            if (err) {
              return done(err);
            }
            anotherId = anotherUser._id;
          });
          done();
        });

        after(function(done) {
          if (!User.findById(anotherId)) {
            return done();
          }
          User.remove({ _id: anotherId }, function(err) {
            if (err) {
              return done(err);
            }
          });
          done();
        });

        it('returns a forbidden error', function(done) {
          request
            .delete(url + '/' + anotherId)
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
