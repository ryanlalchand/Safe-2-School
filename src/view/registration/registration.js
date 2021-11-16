const QRCode = require('qrcode');
var express = require('express');
var session = require('express-session');
var path = require('path');
const bodyParser = require('body-parser');
const Database = require('../../db.js');

var app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routing to registration.html
app.get("/",(req, res) =>{
    res.sendFile(path.join(__dirname + "/registration.html"));
});

//POST request listener to convert text/URL to QRcode
app.post("/scan", (req, res) =>{
    const url = req.body.url;

//if input is null give error
if (url.length === 0) res.send("Error: No data");


QRCode.toDataURL(url,(err, src)=>{
if (err) res.send("Error occurred");

res.render("scan",{ src });
    });
}); 


//set up port
const port = 8085;
app.listen(port, () => console.log(" go to http://localhost:8085"));


//set up data for students (needs setters and getters for actual students)
let data = {
    name: "Jane Doe",
    phnumber:"888888888"
}

//converting into data 
let stringdata = JSON.stringify(data)

//testing purposes
QRCode.toString(stringdata,{type:'terminal'}, function(err,url){
if(err) return console.log("error occured")
console.log(url)
})

//getting base64 URL
QRCode.toDataURL(stringdata, function(err, url){
    if(err) return console.log("error occured")
    console.log(url)

})

