// Server/main/app.js
// ==================
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('@server/routes/index');

const app = express();

const basePath = path.dirname(
    path.dirname(process.argv[1]) // Server/main
)+"/";
console.log(basePath);
const viewsPath = path.resolve(basePath+'../Client/main');
const clientPath = path.resolve('dist/Client');

// view engine setup
app.set('views', viewsPath);
  // Old views directory moved to client/main
  // There will be the only views directly served by express
  // In order to allow error pages to be rendered.
  // Rest of the application will be generated from Webpack
  // and statically served.
  //
  // TODO: Get rid of Express template handling.
  //       Instead: manually require and use needed templates
  //       in error handling routes to AVOID accessing sources
  //       at runtime.
  //
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, clientPath)));

app.use('/', indexRouter);

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
