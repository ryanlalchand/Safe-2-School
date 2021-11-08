var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const Database = require('../../db.js')


var app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;

    console.log(username);

    async function loginpagedriver() {
        if (username && password) {
            const db = new Database();
            var userLog = await db.adminLogIn(username, password);
            if (userLog == true) {
                request.session.loggedin = true;
                request.session.username = username;
                console.log("worked");
                response.redirect('/home');
            } else {
                response.send("Incorrect user or pass");
            }
            response.end();
        } else {
            response.send('Please enter Username and Password!');
            response.end();
        }
    }
    loginpagedriver();
});



app.get('/home', function(request, response) {
    if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username + '!');
    } else {
        response.send('Please login to view this page!');
    }
    response.end();
});

app.listen(3000);