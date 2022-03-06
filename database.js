var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    database:'user_management',
    user:'root',
    password:''
})

module.exports = connection