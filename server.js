const express = require('express');
const ejs = require('ejs');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { application } = require('express');
var connection = require('./database')
var path = require('path')

require('dotenv').config();

// ejs and set viewengine
app.set('view engine', 'ejs');
app.set('views','views');

// connection port
// const pool = mysql.createPool({
//     connectionLimit : 100,
//     host            : process.env.DB_HOST,
//     database        : process.env.DB_NAME,
//     user            : process.env.DB_USER,
//     password        : process.env.DB_PASS,
    

// })

// connct to db
// pool.getConnection((err, connection) => {
//     if(err) throw err;
//     console.log('Connected as Id' + connection.threadId)
// })

// var con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Panja@21031998',
//     port:3306,
//     database: 'user_management'
// })
// con.query(
//     'SELECT "foo" AS first_field, "bar" AS second_field',
//     function(err, results, fields) {
//         console.log(err);
//         console.log(results);
//         con.end();
//     }
// );
// con.connect((err) =>{
//     if(err){
//         console.log(err,'error occureed')
//     }else{
//     console.log('Connect' + con.threadId)
//     }
// })
app.use(bodyParser.urlencoded({extended:false}));

// parse application/json
// app.use(bodyParser.json());

// require route
const UserRoute = require('./routes/userRoute');
app.use(UserRoute);

const port = process.env.PORT ||3222;

// parsiing middleware
// parse application / x-www-form-urlencoded


// make public static folder
app.use(express.static('public'))

app.listen(port,() =>{
    console.log(`server running at http://localhost:${port}`);
    connection.connect((err) =>{
        if(err) throw err;
        console.log('database connected')
    })
})