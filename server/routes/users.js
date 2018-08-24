const express = require('express');
const router = express.Router();
const { md5, getUploadDirName} = require('../utils');
const userDao = require('../dao/userDao');
const multer = require('multer');
const fs = require('fs');

var storage = multer.diskStorage({
  destination:(req, file, cb) => {
    let dist = '/public/uploads/' + getUploadDirName();
    if (!fs.existsSync(dist)) {
      fs.mkdirSync(dist);
    }
    console.log('this:'+dist);
    cb(null, dist);
  },
  filename:(req, file, cb) => {
    const fileformat = (file.originalname).split('.');
    //cb(null, file.fieldname+'-'+Date.now()+'.'+fileformat[fileformat.length-1]);
    cb(null, Date.now()+'.'+fileformat[fileformat.length-1]);
  }
});

//const upload = multer({ dest: 'public/uploads' });

const upload = multer({ storage: storage  });




/**
 * 登录
 * */
router.post('/login', (req, res, next) => {
  userDao.getUserByTelephone(req.body.telephone, (err, result) => {
    if(err){
      res.json({status:'error', msg:'查询数据错误'});
      return;
    }
    if(result &&　req.body.telephone === result.telephone && md5(req.body.pass) === result.pass){
      let user = {
        id:result.id,
        nickname:result.nickname,
        level:result.level,
        telephone:result.telephone
      }
      req.session.userInfo = user;
      res.json({status:'success', msg:'', result:user});
      return;
    }else{
      res.json({status:'error', msg:'用户名或密码错误'});
      return;
    }
  });
});

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
router.get('/logout', (req, res, next) => {
  req.session.userInfo = null //
  res.json({status: 'success', msg: ''})
});
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
});
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
});
/**
 * 用户中心
 * */
router.get('/personalCenter',(req,res,next)=>{

});

/**
* 用户上传认证信息
* */
router.post('/upload/authentication',  upload.single('imageFile'), (req,res,next)=>{
  let id = req.session.userInfo.id;
  let promise = new Promise((resolve,reject)=>{
    userDao.getUserByID(id,(err,rows)=>{
      if(err){
        reject(err);
      }
      resolve(rows[0].certificate);
    });
  });
  promise.then(data=>{
    let imgUrls = '';
    imgUrls = data ? data+',' : '';
    userDao.updateUrl(id,imgUrls+req.file.path.replace(/\\/g,'\\\\'),err=>{
      if(err){
        res.json({status:'error',msg:'插入数据失败'});
      }else{
        res.json({status:'success',msg:''});
      }

    });
  },err=>{});
  //let urls = [];
  //urls.push(req.file.path);

  //res.json({status:'success',msg:''});
});
/**
 * 获取用户信息
 * */
router.get('/userInfo',(req,res,next)=>{
  userDao.getUserByID(req.session.userInfo.id,(err,rows)=>{
    let result = (rows && rows.length>0) ? rows[0] : [];
    err ? res.json({status:'error',msg:'获取用户失败'}) : res.json({status:'success',result:result});
  });
});
/**
 * 修改用户基本信息
 * */
router.put('/userInfo', (req, res, next)=>{
  let params = [];
  params.push(req.body.nickname);
  params.push(req.body.province);
  params.push(req.body.email);
  console.log(params);
  userDao.updateUserInfo(req.session.userInfo.id,params,(err,rows)=>{
    err ? res.json({status:'error',msg:'修改用户基本信息失败'}) : res.json({status:'success'});
  });
});
/**
 * 修改密码
 * */
router.put('/pass', (req, res, next)=>{
  let oldPass = md5(req.body.oldPass);
  let newPass = md5(req.body.newPass);
  userDao.updateUserPass(req.session.userInfo.id,oldPass,newPass,(err,rows)=>{
    err ? res.json({status:'error',msg:err.message}) : res.json({status:'success'});
  });
});

/**
 * 测试
 * */
router.post('/test', (req, res, next) => {
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
  //res.json({status:'success',msg:'test success return!'});
  let username = req.body.username;
  let pass = req.body.pass;
  console.log('this username:%s,pass:%s',username,pass);
  res.json({status:'success',msg:'this test return!',username:username,pass:pass})
});
module.exports = router;

