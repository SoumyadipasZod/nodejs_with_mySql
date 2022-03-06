
const mysql = require('mysql');
var path = require('path');
// var connection = require('../database')
// var mysql = require('mysql');

let connection = mysql.createConnection({
        host: 'localhost',
        database: 'user_management',
        user: 'root',
        password: ''
    })


exports.index = (req, res) => {
    res.render('index')
}


// const con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Panja@21031998',
//     port:3222,
//     database: 'user_management',
//     method:get
// })
exports.home = (req, res) => {


    
    connection.connect((err) => {
        // if (err) throw err;
        console.log('Connect')
        connection.end

        // use the connection
        connection.query('SELECT * FROM `user` WHERE status ="active"', (err, rows) => {



            if (!err) {
                res.render('home', {
                    viewdata: rows
                })
                console.log(rows)
            } else {
                console.log(err)
            }
            connection.end

        })
    })
}

// find User by search
exports.find =(req,res) =>{
    var connection = mysql.createConnection({
        host: 'localhost',
        database: 'user_management',
        user: 'root',
        password: ''
    })
    connection.connect((err) => {
        // if (err) throw err;
        console.log('Connect');

        let searchTerm = req.body.search;

        // use the connection
        connection.query('SELECT * FROM `user` WHERE first_name LIKE ?',['%' + searchTerm + '%'], (err, rows) => {

            connection.release();

            if (!err) {
                res.render('home', {
                    viewdata: rows
                })
                console.log(rows)
            } else {
                console.log(err)
            }

        })
    })


}

exports.form =(req,res) =>{
    res.render('add-user')
}

// exports.create =(req, res) => {
//     let connection = mysql.createConnection({
//         host: 'localhost',
//         database: 'user_management',
//         user: 'root',
//         password: ''
//     })
//     // const { first_name, last_name, email, phone, comment} = req.body;

    
//     connection.connect((err) => {
//         // if (err) throw err;
//         console.log('Connect')
//         connection.end

//         // use the connection
//         connection.query('INSERT INTO `user` SET first_name = ?,  last_name = ?, email = ?, phone = ?, comment = ?, ',[first_name, last_name, email, phone, comment], (err, rows) => {


//             connection.release();
//             if (!err) {
//                 res.render('add-user', {
//                     viewdata: rows
//                 })
//                 console.log(rows)
//             } else {
//                 console.log(err)
//             }
//             connection.end

//         })
//     })
// }

exports.create =(req, res) =>{
    let connection = mysql.createConnection({
        host: 'localhost',
        database: 'user_management',
        user: 'root',
        password: ''
    });

    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var email = req.body.email;
    var phone = req.body.phone;
    var comment = req.body.comment;
console.log(firstName,lastName,email,phone,comment);
    var insertQuery ='insert into `user` (`first_name`, `last_name`, `email`, `phone`, `comments`) VALUES (?,?,?,?,?) '
    var query = mysql.format(insertQuery,[firstName,lastName,email,phone,comment]);
    connection.query(query,(err,response) =>{
        // if(err) throw err;
        // console.log(res);
        // // var getQuery = "select * from `user`";
        // // connection.query(getQuery,(err,res) =>{
        // //     if(err) throw err;
        //     res.render('home')
        // })
        if(!err){
            res.render('add-user',{viewdata:response})
            // res.redirect('/home')
        }else{
            console.log(err)
        }
        
    })
    // connection.query('INSERT INTO user SET first_name = req.body.firstname, last_name = req.body.lastname, email = req.body.email, phone = req.body.phone, comments = req.body.comment', (err, rows) => {
    //     if (!err) {
    //       res.render('add-user', { alert: 'User added successfully.' });
    //     } else {
    //       console.log(err);
    //     }
    //     console.log('The data from user table: \n', rows);
    //   });
}

exports.edit =(req,res) => {
    var id=req.params.id;
    var getQuery="select * from `user` where `id`=?";  
    var query=mysql.format(getQuery,id);
    connection.query(query,(err,result) => {
        if(err) throw err;
        var string =JSON.stringify(result);
        var json =  JSON.parse(string);
        res.render('edit',{ 
            records:json
        })
    })
}

exports.delete =(req, res, next) =>{
    var id=req.params.id;

    var deleteQuery="delete from `user` where `id`=?";
    var query=mysql.format(deleteQuery,id);
     connection.query(query,function(err){

         if(err) throw err;
 res.redirect('/home');
    });
}