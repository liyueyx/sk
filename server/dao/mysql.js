/**
 * Created by Administrator on 2018/7/25.
 */
const mysql = require('mysql');
const db = {};

const pool = mysql.createPool({
  connectionLimit : 10,
  //host            : 'localhost',
  host            : '47.104.210.56',
  user            : 'root',
  password        : 'fanjinbao_%@!',
  database        : 'sk'
});

db.query = (sql, param={}, callback) => {
  if(!callback && typeof(param) === 'function'){
    callback = param;
    param = null;
  }
  if (!sql) {
    callback();
    return;
  }
  pool.query(sql, param, (err, rows, fields) => {

    if (err) {
      console.log(err);
      callback(err, null);
      return;
    };

    callback(null, rows, fields);
  });
}
module.exports = db;




