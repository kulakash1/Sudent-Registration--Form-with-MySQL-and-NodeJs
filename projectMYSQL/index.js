var con = require("./connection");
var express = require("express");
var app = express();

app.listen(7000);
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.sendFile(__dirname+"/register.html");
});

app.post('/', function(req,res){
    var name = req.body.name;
    var email = req.body.email;
    var mno = req.body.mno;
    
    con.connect(function(error){
        if(error) throw error;
        else
        {
            // var sql = "INSERT INTO students(name,email,mno) VALUES('"+name+"','"+email+"','"+mno+"')";
            var sql = "INSERT INTO students(name,email,mno) VALUES ?";
            var values = [
                [name,email,mno]
            ]

            con.query(sql,[values], function(error,result){
                if(error) throw error;
                res.redirect('/students');
                // else res.send("Student Registration Successfull"+result.insertId);
            });
        } 

    });

})


app.get('/students', function(req,res){

    con.connect(function(error){
        if(error) throw error;
        else
        {
            var sql = "SELECT * FROM students";
            
            con.query(sql, function(error,result){
                if(error) throw error;
                else res.render(__dirname+"/students.ejs",{students:result});
            });
        } 

    });

});


app.get('/delete-student', function(req,res){

    con.connect(function(error){
        if(error) throw error;
        else
        {
            var sql = "delete FROM students where id=?";
            var id = req.query.id;

            con.query(sql,[id], function(error,result){
                if(error) throw error;
                else res.redirect('/students');
            });
        } 

    });

});


app.get('/update-student', function(req,res){
    var id = req.query.id;
    var sql = "SELECT * FROM students WHERE id=?";
    con.query(sql, [id], function(err, result){
        if(err) throw err;
        res.render(__dirname+"/update-student.ejs", {students:result});
    });
});
// app.get('/update-student', function(req,res){

//     con.connect(function(error){
//         if(error) throw error;
//         else
//         {
//             var sql = "SELECT * FROM students where id=?";
//             var id = req.query.id;

//             con.query(sql,[id], function(error,result){
//                 if(error) throw error;
//                 else res.render(__dirname+"/update-student.ejs"+{students:result});
//             });
//         } 

//     });

// });


