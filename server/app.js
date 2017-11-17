var http = require('http')
  , express = require('express')
  , app = express()
  , server = http.createServer(app)
  , io = require('socket.io')(server)
  , count = 0
  , logger = require('morgan');

// uncomment after placing your favicon in /public
app.use(logger('dev'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

io.on('connection', function (socket) {
  count++;
  io.emit('news', { msg: 'One more person is online', count: count });
  socket.emit('private', { msg: 'Welcome you are the ' + count + ' person here' });
  socket.on('private', function (data) {
    console.log(data);
  });
  socket.on('disconnect', function() {
    count--;
    io.emit('news', { msg: 'Someone went home', count: count });
  });
});

module.exports = app;
