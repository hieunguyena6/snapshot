var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session')

var indexRouter = require('./routes/index');
var galleryRouter = require('./routes/gallery');
var app = express();
app.use(session({
  secret: 'mySecretKey',
  resave: true,
  saveUninitialized: false,
  cookie:{maxAge:60000000}
}));
mongoose.connect('mongodb://localhost/mydb',{useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true,},function(err){
  if (err) console.log('connect error');
  else console.log('connected');
})
app.use(flash());
// view engine setup
app.set('views', [path.join(__dirname, 'views'),
                  path.join(__dirname, 'views/guest'),
                  path.join(__dirname, 'views/user'),
                  path.join(__dirname, 'views/general')]);
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/gallery', galleryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
