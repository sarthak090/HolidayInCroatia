var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hotelRouter = require('./routes/hotels');
var postRouter = require('./routes/post');
var orderRouter = require('./routes/order');

const passport = require("passport")
var cors = require('cors')
var app = express();
var methodOverride=require("method-override")
const flash = require('connect-flash');
const session = require('express-session');

require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);


// Connect flash
app.use(flash());
app.use(express.static(path.join(__dirname, '/public')));
app.use("/public", express.static(__dirname + '/public'));



app.use(methodOverride("_method"));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/api/hotels",hotelRouter)
app.use("/api/post",postRouter)
app.use("/api/order",orderRouter)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT||5000,()=>{
  console.log(`Process is Up and Running`)
})
//module.exports = app;
