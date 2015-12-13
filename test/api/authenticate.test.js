/*jshint expr: true*/
process.env.NODE_ENV = 'test';
var expect = require('chai').expect;
var request = require('superagent');
var app = require('../../app.js');
var User = require('../../models/user');
var http = require('http');
var port = 2555;
var server;
var url = 'http://localhost:' + port + '/api/authenticate';

describe('/authenticate', function() {
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
    User.remove({ username: username }, function(err) {
      if (err) {
        return done(err);
      }
    });
    server.close();
    done();
  });

  describe('without credentials', function() {
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

  describe('when user does not exist', function() {
    it('returns an unauthorized error', function(done) {
      request
        .get(url)
        .auth('nonexisting', password)
        .end(function(err, res) {
          expect(err).to.exist;
          expect(err).to.have.property('status', 401);
          done();
        });
    });
  });

  describe('with incorrect password', function() {
    it('returns an unauthorized error', function(done) {
      request
        .get(url)
        .auth(username, 'incorrectpassword')
        .end(function(err, res) {
          expect(err).to.exist;
          expect(err).to.have.property('status', 401);
          done();
        });
    });
  });

  describe('with correct credentials', function() {
    it('returns the authenticated user', function(done) {
      request
        .get(url)
        .auth(username, password)
        .end(function(err, res) {
          expect(err).to.not.exist;
          expect(res).to.have.property('body')
            .that.has.property('user');
          expect(res.body.user).to.have.property('username', username);
          done();
        });
    });
  });
});
