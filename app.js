var express=require("express");
var bodyParser=require("body-parser");
var app=express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/userauth');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})




app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/sign_up', function(req,res){
	var name = req.body.name;
	var email =req.body.email;
	var pass = req.body.password;
	var phone =req.body.phone;

	var data = {
		"name": name,
		"email":email,
		"password":pass,
		"phone":phone
	}
db.collection('auth').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
		console.log(data);
			
	});
		
	return res.redirect('signup_success.html');
})


app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('./index.html');
}).listen(8000)


console.log("server listening at http://localhost:8000/");
