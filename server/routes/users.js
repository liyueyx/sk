const express = require('express');
const router = express.Router();
const { md5 } = require('../utils');
const userDao = require('../dao/userDao');


/**
 * 登录
 * */
router.post('/login', (req, res, next) => {

  /*if(req.body.username === 'admin' && req.body.pass === 'admin123'){
    let user = {
      id:'1',
      username: 'admin',
      level: 1
    };
    req.session.userInfo = user
    res.json({
      status: 'success', msg: '', result:user
    })
  }
  else {
    res.json({status: 'error', msg: '账号或密码错误'})// 若登录失败，重定向到登录页面
  }*/

  userDao.getUserByName(req.body.username, (err, result) => {
    if(err){
      res.json({status:'error', msg:'查询数据错误'});
    }
    if(result &&　req.body.username === result.username && md5(req.body.pass) === result.pass){
      let user = {
        id:result.id,
        username:result.username,
        level:result.user_level
      }
      req.session.userInfo = user;
      res.json({status:'success', msg:'', result:user});
    }else{
      res.json({status:'error', msg:'用户名或密码错误'});
    }
  });
})

/**
* 检查登录
* */
router.get('/checklogin',(req, res, next) => {
  let user = req.session.userInfo;
  user ? res.json({status:'success',result:user}) : res.json({status:'error',msg:''});
})
/**
 * 退出登录
 * */
router.get('/loginout', (req, res, next) => {
  req.session.userInfo = null //
  res.json({status: 'success', msg: ''})
})
/**
 * 注册
 * */
router.post('/register', (req, res, next) => {
  userDao.addUser(req.body.telephone, md5(req.body.pass), (err, result) =>{
    if(err){
      res.json({status:'error',msg:'注册失败'});
      return;
    }
    res.json({status:'success',msg:''});
  });
})
/**
 * 用户列表
 * */
router.get('/list', (req, res, next) => {
  let params = {
    pageInfo:{
      pageNum:req.body.pageNum ? req.body.pageNum : 1,
      pageSize:req.body.pageSize ? req.body.pageSize : 10
    }
  }
  userDao.getUserListByCondition(params,(err,rows)=>{
    res.json({status:'success',msg:'',result:rows});
  });
})
/**
 * 用户中心
 * */
router.get('/personalCenter',(req,res,next)=>{

})


/**
 * 测试
 * */
router.get('/test', (req, res, next) => {
  /*let sql = 'select * from users';
  let param = [];
  db.query(sql, param, (err, rows, fields) => {
    if(err) console.log(err);
    console.log('this rows is:');
    console.log(rows);
    console.log('this fields is:');
    console.log(fields);
    res.json({status:'success',msg:'',result:{rows:rows,fields:fields}});
  })*/

  /*userDao.getUserList((err,rows)=>{
    res.json({status:'success',msg:'',result:{rows:rows}});
  });*/
  /*userDao.test(null,(err,rows)=>{
    res.json({status:'success'});
  });*/
  /*userDao.getUserByName('admin',(err,rows) => {
    res.json({status:'success'});
  })*/
})
module.exports = router;
