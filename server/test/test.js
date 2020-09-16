/*
const db = require('../utils/mysql.js')
const {md5} = require('../utils')

//let sql = 'INSERT INTO users (username,pass) VALUES(?,?)';
//let sql = 'UPDATE users SET pass=?';
let sql = 'SELECT * FROM users';
let param = [
  md5('admin123')
];
db.query(sql, param, function(err, rows, fields){
  if (err) {
    console.log(err);
    return;
  }
  console.log(rows);
  console.log(fields);

});
*/
