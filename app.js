const QRCode = require('qrcode');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const Database = require('./src/config/db.js');
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
    response.sendFile(path.join(__dirname + '/src/views/login.html'));
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
    async function studentDriver() {
        const db = new Database();
        var students = await db.allStudentQuery();
        response.render("students.ejs", { students: students });
        response.end();
    }
    if (request.session.loggedin) {
        studentDriver();
    } else
        response.send('Please login to view this page or you do not have permission to view this page!');


});

app.get('/signout', function(request, response) {
    request.session.type == '';
    request.session.loggedin = false;
    request.session.username = ''
    response.render('login.ejs');

    response.end();
});


app.get('/registration', function(request, response) {
    var name = request.session.name;
    if (request.session.loggedin) {
        response.render('registration.ejs', {
            name: name
        });
    } else {
        response.send('Please login to view this page or you do not have permission to view this page!');
    }
    response.end();
});

app.post('/register', function(request, response) {

    var first = request.body.firstName;
    var last = request.body.lastName;
    var phone = request.body.phoneNumber;
    var age = request.body.age;
    var address = request.body.address;

    async function studentRegister() {
        const db = new Database();
        await db.pushStudent(first + " " + last, age, address, phone, null, null, null);
        request.session.name = first + " " + last + " was registered."
        var name = request.session.name;
        response.render('registration.ejs', {
            name: name
        });
        response.end();
    }
    if (phone.length == 10)
        studentRegister();
    else {
        var name = "Please enter a valid phone number without the -";
        response.render('registration.ejs', {
            name: name
        });
        response.end();
    }
});



//POST request listener to convert text/URL to QRcode
app.get("/scan", (req, res) => {
    const url = req.body.url;

    //if input is null give error
    if (url.length === 0) res.send("Error: No data");

    QRCode.toDataURL(url, (err, src) => {
        if (err) res.send("Error occurred");

        res.render("scan", { src });
    });
});

//set up data for students (needs setters and getters for actual students)
let data = {
    name: "Jane Doe",
    phnumber: "888888888"
}

//converting into data 
let stringdata = JSON.stringify(data)

//testing purposes
QRCode.toString(stringdata, { type: 'terminal' }, function(err, url) {
    if (err) return console.log("error occured")
    console.log(url)
})

//getting base64 URL
QRCode.toDataURL(stringdata, function(err, url) {
    if (err) return console.log("error occured")
    console.log(url)
})


app.set('views', path.join(__dirname, '/src/views/ejsfiles'));
app.set('view engine', 'ejs');
app.use("/", router);
app.listen(3000, () => console.log(" go to http://localhost:3000"));