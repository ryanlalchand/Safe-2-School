//required includes here
const express = require('express');
//const mongoose = require('mongoose');
const config = require('./config/dev');
const MongoClient = require('mongodb').MongoClient;
//schemas for db here
const Driver = require('./models/driver');
const Student = require('./models/students');
const Admin = require('./models/admin');
const fs = require('fs');
//test includes here



//notes 
//updating / updated all functions to be asynchronous
//need to make push students asynchronous *DONE*
//need to make list provide a clean string list that can be outputed *done*
//need to make the push to log file then clean collection *done* //maybe move to pushing json files
//need to add update info for all the above driver / student *done* / admin
//need to think about changing admin and driver data formats to make everything cleaner 
//need to think about how to save username and passwords 
//user clean text 
//passwords ?? some type on encryption not a live service atm so no big deal?

class Database {
    constructor() {
        //dont use this causes too many issues with async functions and promise returns
        //on creation of database object connect to db and run through and make connection
        ///  mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(() => {

        //const fakeDb = new FakeDb();
        // fakeDb.seedDb();

        //  });

        //  const app = express();

        //  app.get('/users', function(req, res) {
        //      res.json({ "success": true });
        //  });

        //   const PORT = process.env.PORT || 3001;
        ///  
        //  app.listen(PORT, function() {
        //      console.log("Node Server is Running");
        //  });
    }


    //push students 
    //js you cannot overload functions
    //but you can leave options out and the DB will push successfully
    //only issue is if for some reason you had a dropoff in PM and not AM you decided to drop
    //which one so maybe just first dropoff then second?
    //issues solved move to asynch with new functions structure :D
    async pushStudent(fullname, fullage, curloc, phone, url, dropoffAM, dropoffPM) {
        const client = await MongoClient.connect(config.DB_URI, { useNewUrlParser: true })
            .catch(err => { console.log(err); });

        if (!client) {
            return;
        }

        try {

            const db = client.db("test");

            let collection = db.collection('students');

            let query = {
                name: fullname,
                age: fullage,
                location: curloc,
                phonenumber: phone,
                url: url,
                dropoffAM: dropoffAM,
                dropoffPM: dropoffPM
            }

            let res = await collection.insertOne(query);

            console.log("user added")

        } catch (err) {

            console.log(err);
        } finally {

            client.close();

        }


    }

    //remove students from
    //this needs working on and not complete throws error *fixed*
    //will look into i am assuming has to do with call *fixed*
    async removeStudent(namein) {
        const client = await MongoClient.connect(config.DB_URI, { useNewUrlParser: true })
            .catch(err => { console.log(err); });

        if (!client) {
            return;
        }

        try {

            const db = client.db("test");

            let collection = db.collection('students');

            let query = { name: namein }

            let res = await collection.findOneAndDelete(query);

            console.log("Deleted student")

        } catch (err) {

            console.log(err);
        } finally {

            client.close();
        }
    }


    //query singular student
    //tested works
    async findStudent(namein) {
        var buildstring;
        const client = await MongoClient.connect(config.DB_URI, { useNewUrlParser: true })
            .catch(err => { console.log(err); });

        if (!client) {
            return;
        }

        try {

            const db = client.db("test");

            let collection = db.collection('students');

            let query = { name: namein }

            let res = await collection.findOne(query);

            buildstring = " Name: " + res.name + " Age: " + res.age +
                " Location: " + res.location + " Phone Number: " +
                res.phonenumber + " url: " + res.url + " First Drop: " + res.dropoffAM +
                " Second Drop: " + res.dropoffPM;

            //console.log(buildstring);

        } catch (err) {

            console.log(err);
        } finally {

            client.close();

            return buildstring;
        }
    }


    //
    //query all student
    //this will flash a json file at you probably best to put into a string t
    //then parse a json will need to work on this a big becuase should be able
    //to change how it exports data into nice lines need to look into it
    //changed to formatting nicely instead of dumping documents
    //calls to allstudentquery must be made async

    async allStudentQuery() {
        var buildstring = "";
        const client = await MongoClient.connect(config.DB_URI, { useNewUrlParser: true })
            .catch(err => { console.log(err); });

        if (!client) {
            return;
        }

        try {

            for await (const doc of Student.find()) {
                buildstring = "Name: " + doc.name + " Location: " + doc.location + "\n" + buildstring;
                // Prints documents one at a time
            }

        } catch (err) {

            console.log(err);
        } finally {

            client.close();
            //console.log(buildstring); //test to see if string is made right
            return buildstring;
        }
    }


    //dangerous function drops entire collection without warning
    //logs to backup log file in straight text format 
    //maybe shift to exporting a json?
    async cleanStudentsAndLog() {
        var buildstring = "";
        const client = await MongoClient.connect(config.DB_URI, { useNewUrlParser: true })
            .catch(err => { console.log(err); });

        if (!client) {
            return;
        }

        try {

            for await (const doc of Student.find()) {
                buildstring = "Name: " + doc.name + " Location: " + doc.location + "\n" + buildstring;
                // Prints documents one at a time
            }

        } catch (err) {

            console.log(err);
        } finally {


            //console.log(buildstring); //test to see if string is made right
            try {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                await fs.writeFile('log' + date + '.txt', buildstring, function(err) {
                    if (err) return console.log(err);
                });
            } catch (err) {
                console.log(err)
            } finally {
                console.log("log file created")
                Student.collection.deleteMany();
                console.log("Student Collection Cleared")
                client.close();
            }
        }


    }

    //updates a student document based on name atm
    //needs to be supplied with all fields for everything to update
    async updateStudent(namein, fullage, curloc, phone, url, dropoffAM, dropoffPM) {
        const client = await MongoClient.connect(config.DB_URI, { useNewUrlParser: true })
            .catch(err => { console.log(err); });

        if (!client) {
            return;
        }

        try {

            const db = client.db("test");

            let collection = db.collection('students');

            let query = { name: namein }

            let update = { name: namein, age: fullage, location: curloc, phonenumber: phone, url: url, dropoffAM: dropoffAM, dropoffPM: dropoffPM }

            let res = await collection.findOneAndReplace(query, update);

        } catch (err) {

            console.log(err);
        } finally {

            client.close();
            console.log("updated " + namein)
        }
    }

    //add administrators
    //tested works
    async pushAdmin(namein, fullage, curloc) {
            const client = await MongoClient.connect(config.DB_URI, { useNewUrlParser: true })
                .catch(err => { console.log(err); });

            if (!client) {
                return;
            }

            try {

                const db = client.db("test");

                let collection = db.collection('admins');

                let query = { name: namein, age: fullage, location: curloc }

                let res = await collection.insertOne(query);

                console.log("user added")

            } catch (err) {

                console.log(err);
            } finally {

                client.close();

            }


        }
        //remove administrators from
        //tested works
    async removeAdmin(namein) {
            const client = await MongoClient.connect(config.DB_URI, { useNewUrlParser: true })
                .catch(err => { console.log(err); });

            if (!client) {
                return;
            }

            try {

                const db = client.db("test");

                let collection = db.collection('admins');

                let query = { name: namein }

                let res = await collection.findOneAndDelete(query);

                console.log("Deleted admin")

            } catch (err) {

                console.log(err);
            } finally {

                client.close();
            }
        }
        //query admins
        //tested works
    async findAdmin(namein) {
        var buildstring;
        const client = await MongoClient.connect(config.DB_URI, { useNewUrlParser: true })
            .catch(err => { console.log(err); });

        if (!client) {
            return;
        }

        try {

            const db = client.db("test");

            let collection = db.collection('admins');

            let query = { name: namein }

            let res = await collection.findOne(query);

            buildstring = " Name: " + res.name + " Age: " + res.age +
                " Location: " + res.location; //+ " Phone Number: " + 
            //res.phonenumber + " url: " + res.url + " First Drop: " + res.dropoffAM
            // + " Second Drop: " + res.dropoffPM;

            //console.log(buildstring);

        } catch (err) {

            console.log(err);
        } finally {

            client.close();

            return buildstring;
        }
    }

    //add drivers
    pushDriver(fullname, fullage, curloc) {
            console.log("updating drivers");
            //grab from schema files
            var DriverInfo = mongoose.model('Driver')
                //take info coming in from call put into var
            var info = new DriverInfo({ name: fullname, age: fullage, location: curloc });
            //save to database
            info.save(function(err, Driver) {
                if (err) return console.error(err);
                console.log(info.name + " saved to collection.");
            });


        }
        //remove drivers from
        //tested works
    async removeDriver(namein) {
            const client = await MongoClient.connect(config.DB_URI, { useNewUrlParser: true })
                .catch(err => { console.log(err); });

            if (!client) {
                return;
            }

            try {

                const db = client.db("test");

                let collection = db.collection('drivers');

                let query = { name: namein }

                let res = await collection.findOneAndDelete(query);

                console.log("Deleted Driver")

            } catch (err) {

                console.log(err);
            } finally {

                client.close();
            }
        }
        //query drivers
        //tested works
    async findDriver(namein) {
        var buildstring;
        const client = await MongoClient.connect(config.DB_URI, { useNewUrlParser: true })
            .catch(err => { console.log(err); });

        if (!client) {
            return;
        }

        try {

            const db = client.db("test");

            let collection = db.collection('drivers');

            let query = { name: namein }

            let res = await collection.findOne(query);

            buildstring = " Name: " + res.name + " Age: " + res.age +
                " Location: " + res.location; //+ " Phone Number: " + 
            //res.phonenumber + " url: " + res.url + " First Drop: " + res.dropoffAM
            // + " Second Drop: " + res.dropoffPM;

            //console.log(buildstring);

        } catch (err) {

            console.log(err);
        } finally {

            client.close();

            return buildstring;
        }
    }

    //updates a student document based on name atm
    //needs to be supplied with all fields for everything to update
    async updateDriver(namein, fullage, curloc) {
        const client = await MongoClient.connect(config.DB_URI, { useNewUrlParser: true })
            .catch(err => { console.log(err); });

        if (!client) {
            return;
        }

        try {

            const db = client.db("test");

            let collection = db.collection('drivers');

            let query = { name: namein }

            let update = { name: namein, age: fullage, location: curloc }

            let res = await collection.findOneAndReplace(query, update);

        } catch (err) {

            console.log(err);
        } finally {

            client.close();
            console.log("updated " + namein)
        }
    }

}
module.exports = Database;