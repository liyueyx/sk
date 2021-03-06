/**
 * Created by Administrator on 2018/7/25.
 */
const db = require('./mysql');
const {md5} = require('../utils');

module.exports = {
  /**
   * 获取用户列表
   * fields:Array 可选,需要返回的字段
   * condition:Objec 可选,查询条件,目前只支持逻辑与 例:{id:101,name:'admin'}
   * callback:function 必选,回调函数
   * */
  getUserList: (fields=null,callback)=>{
    if(!callback){
      if(typeof(fields) === 'function'){
        callback = fields;
        fields = null;
      }
    }
    let sql = '';
    if(fields && fields.length >0){
      sql = 'select ';
      for (let item in fields){
        sql += item + ",";
      }
      sql = sql.substr(0,sql.length-1);
      sql += " from users"
    }else{
      sql = 'select * from users';
    }
    //let param = [];
    console.log('sql:'+sql);
    db.query(sql, null, (err, rows, fields) => {
      if(err){
        console.log(err);
        if(callback) callback(err,null,null);
        return;
      }

      if(callback) callback(err,rows);
      //res.json({status:'success',msg:'',result:{rows:rows,fields:fields}});
    });
  },
  /**
   * 根据条件获取用户信息
   * params:{
   *  fields:String,  //需要返回的字段
   *  pageInfo:{  //分页信息
   *      pageNum:number,   //当前页数
   *      pageSize:number,  //每页条数
   *    }
   * }
   * */
  getUserListByCondition: (params,callback) => {
    let sql = '';
    if(params){
      sql += 'select SQL_CALC_FOUND_ROWS';
      let fields = params.fields;
      if(fields && fields.length>0){
        for(let item in fields){
          sql += ' ' + item+',';
        }
        sql = sql.substr(0,sql.length-1);
        sql += ' from users';
      }else{
        sql += ' * from users';
      }

      let pageInfo = params.pageInfo
      if(pageInfo){  //分页信息
        sql += ' limit '+ (pageInfo.pageNum-1)*pageInfo.pageSize + ',' + pageInfo.pageSize
      }
    }else{
      sql = 'seletc * from users';
    }
    console.log('sql:'+sql);
    db.query(sql, (err, rows, fields) => {
      if(err){
        console.log(err);
        if(callback) callback(err,null,null);
        return;
      }
      if(callback) callback(err,rows);
    });

  },
  /**
   * 根据用户ID获取用户信息
   * */
  getUserByID: (id, callback) => {
    let sql = 'select * from users where id=?';
    db.query(sql, [id], (err, rows) => {
      if(callback) callback(err, rows);
    })
  },
  /**
   * 根据手机获取用户信息
   * */
  getUserByTelephone: (telephone, callback) => {
    let sql = 'select * from users where telephone=?';
    db.query(sql, [telephone], (err, rows) => {
      if(err){
        if(callback) callback(err,null);
        return;
      }
      let result = null;
      if(rows && rows.length>0){
        result = rows[0];
      }
      if(callback) callback(err, result);
    })

  },
  /**
   * 用户注册添加用户
   * telephone:string 用户名/手机
   * pass:string 用户密码
   * */
  addUser:(telephone, pass, callback)=>{
    let sql = "INSERT INTO users (TELEPHONE,PASS) VALUES(?,?)";
    let param  = [telephone,pass];
    db.query(sql, param, (err, rows)=>{
      if(err){
        if(callback) callback(err,null);
        return;
      }
      if(callback) callback(err,rows);
    })
  },
  /**
   * 用户修改
   * id:int   要修改的用户id
   * param:Object   要修改的内容{name:'test',age:18}
   * */
  updateUser:(id,param,cb)=>{
    let sql = 'update users set ';

  },
  /**
   * 添加认证
   * id:int   用户id
   * imgUrls:String   图片的url地址数据
   * */
  updateUrl:(id,imgUrls,cb)=>{
    let sql = 'update users set certificate=? where id=?';
    //let sql = 'update users set certificate="'+ imgUrls +'" where id=' + id;
    db.query(sql, [imgUrls,id], (err, rows)=>{
      if(err){
        if(cb) cb(err,null);
        return;
      }
      if(cb) cb(err,rows);
    })

  },
  /**
   * 修改用户基本信息
   * */
  updateUserInfo:(id,params,cb)=>{
    let sql = 'update users set nickname=?,province=?,email=? where id=?';
    db.query(sql, [...params,id],(err, rows)=>{
      if(err){
        if(cb) cb(err,null);
        return;
      }
      if(cb) cb(err,rows);
    });
  },
  /**
   * 修改密码
   * */
  updateUserPass:(id,oldPass,newPass,cb)=>{
    let sql = 'update users set pass=? where pass=? and id=?';
    db.query(sql, [newPass,id,oldPass],(err, rows)=>{
      if(err){
        if(cb) cb(err,null);
        return;
      }
      if(rows.affectedRows>0){
        cb(err,rows);
      }else{
        cb(new Error('密码错误或当前帐号不存在!'),rows);
      }
    });
  },

  /**测试*/
  test:(id,callback)=>{
    /*根据id查询用户信息*/
    /*let sql = 'select * from users where id=?';
    db.query(sql, [id], (err, rows, fields) => {
      if(err){
        console.log(err);
        if(callback) callback(err,null,null);
        return;
      }
      console.log('this rows is:'+rows);
      if(callback) callback(err,rows);

    });*/
    /*------*/

    let sql = 'update users set pass=? where username=?';
    let pass = md5('admin123');
    console.log(pass);

    db.query(sql, [pass, 'admin'], (err, rows, fields)=>{
      console.log(rows);
      if(callback) callback(err,rows);
    })
  }

}