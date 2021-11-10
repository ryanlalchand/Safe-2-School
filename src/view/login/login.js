var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const Database = require('./../db.js')
const router = express.Router();

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
            var adminLog = await db.adminLogIn(username, password);
            var driverLog = await db.driverLogIn(username, password);

            if (adminLog == true) {
                request.session.loggedin = true;
                request.session.username = username;
                request.session.type = 'admin';
                console.log("worked admin");
                response.redirect('/admin');

            } else if (driverLog == true) {
                request.session.loggedin = true;
                request.session.username = username;
                request.session.type = 'driver';
                console.log("worked driver");
                response.redirect('/driver');

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

app.get('/admin', function(request, response) {
    if (request.session.loggedin && request.session.type == 'admin') {
        var user = request.session.username;
        response.render('admin.ejs', {
            user: user
        });


    } else {
        response.send('Please login to view this page or you do not have permission to view this page!');
    }
    response.end();
});

app.get('/driver', function(request, response) {
    if (request.session.loggedin && request.session.type == 'driver') {
        response.render('driver.ejs');
    } else {
        response.send('Please login to view this page or you do not have permission to view this page!');
    }
    response.end();
});

app.get("/students", function(request, response) {
    var students = [{ fullname: "Caroline Snyder", age: "22", location: "Ohio" },
        { fullname: "Haroline Snyder", age: "23", location: "PA" },
        { fullname: "Bob Boberinton", age: "12", location: "New York" }
    ];
    response.render("students.ejs", { students: students });
});
app.set('view engine', 'ejs');
app.use("/", router);
app.listen(3000);