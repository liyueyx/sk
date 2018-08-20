const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const ejs = require('ejs')


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express)
app.set('view engine', 'html');

app.use(logger('dev'));   //设置日志

app.use(bodyParser.json()); // 使用bodyparder中间件
app.use(bodyParser.urlencoded({ extended: true })); //可
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('secret'));

app.use(session({
  secret :  'secret', // 对session id 相关的cookie 进行签名
  key:'sid',
  resave : true,
  saveUninitialized:true, // 是否保存未初始化的会话
  cookie : {
    maxAge : 1000 * 60 * 60, // 设置 session 的有效时间，单位毫秒
    //secure: true,
  },
}));


//设置跨域并清除缓存
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:80");
  res.header('Access-Control-Allow-Credentials', true);// Allow Cookie
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')


  if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
  else  next();
});


//app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//登录拦截
app.use(function (req,res,next) {
  let user = req.session.userInfo;
  console.log(JSON.stringify(user));
  if(user &&　user.id){
    console.log('用户已经登录');
    next();
  }else{
    console.log('用户没有登录');
    if(noIntercept(req.originalUrl)){
      next();
    }else{
      res.json({
        status:'not-logged-in',
        msg:'当前未登录',
        result:''
      });
    }
  }
});

app.use('/', indexRouter);
app.use('/user', usersRouter);

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

/*
* 不拦截地址
* return true
*/
var noIntercept = (url)=>{
  var flag  = false;
  var addr = [
    '/',
    '/user/login',
    '/user/logout',
    '/user/checklogin',
    '/user/register'

  ];
  if(addr.indexOf(url) != -1){
    flag = true;
  }
  return flag;
}

module.exports = app;
