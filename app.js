var express = require('express');
var path = require('path');
var cors = require('cors');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var http = require ('http');
var mongoose = require('mongoose');
var uristring =
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/GroupCollab';

mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Successfully connected to: ' + uristring);
  }
});

var app = express();
var api = require('./routes/api');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use('/api', api);
app.use(passport.initialize());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function errorHandlerDev(err, req, res, next) {
    res.status(err.status || 500);
    console.error(err.stack);
    res.send(err.stack);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err.stack);
  res.send(err.message);
});

module.exports = app;

