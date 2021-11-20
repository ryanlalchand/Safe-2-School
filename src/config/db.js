//required includes here
//const mongoose = require('mongoose');
const config = require('./dev');
const pwManage = require('./passwordmanage')
const MongoClient = require('mongodb').MongoClient;
//schemas for db here
const fs = require('fs');
//test includes here

//notes 
//updating / updated all functions to be asynchronous
//need to make push students asynchronous *DONE*
//need to make list provide a clean string list that can be outputed *done*
//need to make the push to log file then clean collection *done* //maybe move to pushing json files
//need to add update info for all the above driver / student *done* / admin
//need to think about changing admin and driver data formats to make everything cleaner *done*
//need to think about how to save username and passwords *done*
//user clean text *done*
//passwords ?? some type on encryption not a live service atm so no big deal?*done*

class Database {
    constructor() {}

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
    //returns an object 

    async allStudentQuery() {
        var buildstring = "";
        const client = await MongoClient.connect(config.DB_URI, { useNewUrlParser: true })
            .catch(err => { console.log(err); });

        if (!client) {
            return;
        }

        try {
            const db = client.db("test");



            let collection = db.collection('students');

            var obj = [{}];

            for await (const doc of collection.find()) {

                obj.push({
                    name: doc.name,
                    age: doc.age,
                    location: doc.location,
                    phone: doc.phone,
                    url: doc.url,
                    dropoffAM: doc.dropoffAM,
                    dropoffPM: doc.dropoffPM
                });
                //buildstring = "Name: " + doc.name + " Location: " + doc.location + "\n" + buildstring;
                // Prints documents one at a time
            }

        } catch (err) {

            console.log(err);
        } finally {

            client.close();
            //console.log(buildstring); //test to see if string is made right
            return obj;
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
            const db = client.db("test");

            let collection = db.collection('students');
            for await (const doc of collection.find()) {

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
                const db = client.db("test");
                let collection = db.collection('students');
                await collection.deleteMany();
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
    async pushAdmin(namein, fullage, user, password) {
            const client = await MongoClient.connect(config.DB_URI, { useNewUrlParser: true })
                .catch(err => { console.log(err); });

            if (!client) {
                return;
            }

            try {

                const pw = await new pwManage();

                var passHex = await pw.passSet(password);

                const db = client.db("test");

                let collection = db.collection('admins');

                let query = { name: namein, age: fullage, username: user, password: passHex }

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
    async removeAdmin(user) {
            const client = await MongoClient.connect(config.DB_URI, { useNewUrlParser: true })
                .catch(err => { console.log(err); });

            if (!client) {
                return;
            }

            try {

                const db = client.db("test");

                let collection = db.collection('admins');

                let query = { user: user }

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
    async findAdmin(user) {
        var buildstring;
        const client = await MongoClient.connect(config.DB_URI, { useNewUrlParser: true })
            .catch(err => { console.log(err); });

        if (!client) {
            return;
        }

        try {

            const db = client.db("test");

            let collection = db.collection('admins');

            let query = { user: user }

            let res = await collection.findOne(query);

            buildstring = " Name: " + res.name + " Age: " + res.age; //+ " Phone Number: " + 
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

    async updateAdmin(namein, fullage, username, password) {
        const client = await MongoClient.connect(config.DB_URI, { useNewUrlParser: true })
            .catch(err => { console.log(err); });

        if (!client) {
            return;
        }

        try {


            const pw = await new pwManage();

            var passHex = await pw.passSet(password);

            const db = client.db("test");

            let collection = db.collection('admins');

            let query = { user: user }

            let update = { name: namein, age: fullage, user: username, password: passHex }

            let res = await collection.findOneAndReplace(query, update);

        } catch (err) {

            console.log(err);
        } finally {

            client.close();
            console.log("updated " + namein)
        }
    }

    async adminLogIn(user, password) {
        const client = await MongoClient.connect(config.DB_URI, { useNewUrlParser: true })
            .catch(err => { console.log(err); });

        var passBool

        if (!client) {
            return;
        }

        try {

            const pw = await new pwManage();

            const db = client.db("test");

            let collection = db.collection('admins');

            let query = { username: user }

            let res = await collection.findOne(query);

            passBool = await pw.validPassword(password, res.password)



        } catch (err) {
            passBool = false;
        } finally {

            client.close();
            return passBool
        }

    }

    //add drivers
    async pushDriver(fullname, fullage, username, password) {
            const client = await MongoClient.connect(config.DB_URI, { useNewUrlParser: true })
                .catch(err => { console.log(err); });

            if (!client) {
                return;
            }

            try {

                const pw = await new pwManage();

                var passHex = await pw.passSet(password);

                const db = client.db("test");

                let collection = db.collection('drivers');

                let query = { name: fullname, age: fullage, username: username, password: passHex }

                let res = await collection.insertOne(query);

                console.log("user added")

            } catch (err) {

                console.log(err);
            } finally {

                client.close();

            }




        }
        //remove drivers from
        //tested works
    async removeDriver(user) {
            const client = await MongoClient.connect(config.DB_URI, { useNewUrlParser: true })
                .catch(err => { console.log(err); });

            if (!client) {
                return;
            }

            try {

                const db = client.db("test");

                let collection = db.collection('drivers');

                let query = { user: user }

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
    async findDriver(user) {
        var buildstring;
        const client = await MongoClient.connect(config.DB_URI, { useNewUrlParser: true })
            .catch(err => { console.log(err); });

        if (!client) {
            return;
        }

        try {

            const db = client.db("test");

            let collection = db.collection('drivers');

            let query = { user: user }

            let res = await collection.findOne(query);

            buildstring = " Name: " + res.name + " Age: " + res.age; //+ " Phone Number: " + 
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
    async updateDriver(namein, fullage, username, password) {
        const client = await MongoClient.connect(config.DB_URI, { useNewUrlParser: true })
            .catch(err => { console.log(err); });

        if (!client) {
            return;
        }

        try {


            const pw = await new pwManage();

            var passHex = await pw.passSet(password);

            const db = client.db("test");

            let collection = db.collection('drivers');

            let query = { user: user }

            let update = { name: namein, age: fullage, username: username, password: passHex }

            let res = await collection.findOneAndReplace(query, update);

        } catch (err) {

            console.log(err);
        } finally {

            client.close();
            console.log("updated " + namein)
        }
    }

    async driverLogIn(username, password) {
        const client = await MongoClient.connect(config.DB_URI, { useNewUrlParser: true })
            .catch(err => { console.log(err); });

        var passBool

        if (!client) {
            return;
        }

        try {

            const pw = await new pwManage();

            const db = client.db("test");

            let collection = db.collection('drivers');

            let query = { username: username }

            let res = await collection.findOne(query);

            passBool = await pw.validPassword(password, res.password)

        } catch (err) {

            passBool = false;
        } finally {

            client.close();
            return passBool
        }

    }

}
module.exports = Database;