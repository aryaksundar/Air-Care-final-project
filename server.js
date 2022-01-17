var express = require('express');
var config = require("config");
var bodyParser = require("body-parser");
var session = require("express-session");
const path = require('path');
var app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: config.get("secret_key"),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
// view files .ejs
app.set("views",__dirname + "/apps/views");
app.set("view engine", "ejs");

//Assign session to global for all ejs files
app.use(function(req,res,next){
  res.locals.admin=req.session.admin;
  res.locals.customer=req.session.customer;
  res.locals.technician=req.session.technician;
  next();
  });



// static
app.use("/static", express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname,'public')));
// host and port
 var host = 'localhost';
 var port = 3000;

var controllers = require(__dirname + "/apps/controllers");
app.use(controllers);

app.listen(port, host, function(err, res) {
    console.log("Server is running on port",port);
})
