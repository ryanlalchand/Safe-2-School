//register a student form

//import packages needed
const QRCode = require('qrcode')
const express = require('express')
const app = express();
const bp = require('body-parser')

app.set('view','/');
app.set('view engine', 'ejs');

app.use(express.static(__dirname));
app.use(bp.json());

//routing to registration.ejs file
app.get("/",(req, res) =>{
    res.render("registration.html");
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

