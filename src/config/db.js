const config = require("./dev");
const pwManage = require("./passwordmanage");
const MongoClient = require("mongodb").MongoClient;
//schemas for db here
const fs = require("fs");
//test includes here

class Database {
  constructor() {}

  async pushStudent(
    fullname,
    fullage,
    curloc,
    phone,
    url,
    dropoffAM,
    dropoffPM
  ) {
    const client = await MongoClient.connect(config.DB_URI, {
      useNewUrlParser: true,
    }).catch((err) => {
      console.log(err);
    });

    if (!client) {
      return;
    }

    try {
      const db = client.db("test");

      let collection = db.collection("students");

      let query = {
        name: fullname,
        age: fullage,
        location: curloc,
        phonenumber: phone,
        url: url,
        dropoffAM: dropoffAM,
        dropoffPM: dropoffPM,
      };

      let res = await collection.insertOne(query);

      console.log("user added");
    } catch (err) {
      console.log(err);
    } finally {
      client.close();
    }
  }

  async removeStudent(namein) {
    const client = await MongoClient.connect(config.DB_URI, {
      useNewUrlParser: true,
    }).catch((err) => {
      console.log(err);
    });

    if (!client) {
      return;
    }

    try {
      const db = client.db("test");

      let collection = db.collection("students");

      let query = { name: namein };

      let res = await collection.findOneAndDelete(query);

      console.log("Deleted student");
    } catch (err) {
      console.log(err);
    } finally {
      client.close();
    }
  }

  async findStudent(namein) {
    var buildstring;
    const client = await MongoClient.connect(config.DB_URI, {
      useNewUrlParser: true,
    }).catch((err) => {
      console.log(err);
    });

    if (!client) {
      return;
    }

    try {
      const db = client.db("test");

      let collection = db.collection("students");

      let query = { name: namein };

      let res = await collection.findOne(query);
      var obj;
      obj = {
        name: doc.name,
        age: doc.age,
        location: doc.location,
        phone: doc.phone,
        url: doc.url,
        dropoffAM: doc.dropoffAM,
        dropoffPM: doc.dropoffPM,
      };
    } catch (err) {
      console.log(err);
    } finally {
      client.close();

      return obj;
    }
  }

  async allStudentQuery() {
    var buildstring = "";
    const client = await MongoClient.connect(config.DB_URI, {
      useNewUrlParser: true,
    }).catch((err) => {
      console.log(err);
    });

    if (!client) {
      return;
    }

    try {
      const db = client.db("test");

      let collection = db.collection("students");

      var obj = [{}];

      for await (const doc of collection.find()) {
        obj.push({
          name: doc.name,
          age: doc.age,
          location: doc.location,
          phone: doc.phone,
          url: doc.url,
          dropoffAM: doc.dropoffAM,
          dropoffPM: doc.dropoffPM,
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
    const client = await MongoClient.connect(config.DB_URI, {
      useNewUrlParser: true,
    }).catch((err) => {
      console.log(err);
    });

    if (!client) {
      return;
    }

    try {
      const db = client.db("test");

      let collection = db.collection("students");
      for await (const doc of collection.find()) {
        buildstring =
          "Name: " +
          doc.name +
          " Location: " +
          doc.location +
          "\n" +
          buildstring;
        // Prints documents one at a time
      }
    } catch (err) {
      console.log(err);
    } finally {
      //console.log(buildstring); //test to see if string is made right
      try {
        var today = new Date();
        var date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        await fs.writeFile("log" + date + ".txt", buildstring, function (err) {
          if (err) return console.log(err);
        });
      } catch (err) {
        console.log(err);
      } finally {
        console.log("log file created");
        const db = client.db("test");
        let collection = db.collection("students");
        await collection.deleteMany();
        console.log("Student Collection Cleared");
        client.close();
      }
    }
  }

  //updates a student document based on name 
  //needs to be supplied with all fields for everything to update
  async updateStudent(
    namein,
    fullage,
    curloc,
    phone,
    url,
    dropoffAM,
    dropoffPM
  ) {
    const client = await MongoClient.connect(config.DB_URI, {
      useNewUrlParser: true,
    }).catch((err) => {
      console.log(err);
    });

    if (!client) {
      return;
    }

    try {
      const db = client.db("test");

      let collection = db.collection("students");

      let query = { name: namein };

      let update = {
        name: namein,
        age: fullage,
        location: curloc,
        phonenumber: phone,
        url: url,
        dropoffAM: dropoffAM,
        dropoffPM: dropoffPM,
      };

      let res = await collection.findOneAndReplace(query, update);
    } catch (err) {
      console.log(err);
    } finally {
      client.close();
      console.log("updated " + namein);
    }
  }

  //add administrators

  async pushAdmin(namein, fullage, user, password) {
    const client = await MongoClient.connect(config.DB_URI, {
      useNewUrlParser: true,
    }).catch((err) => {
      console.log(err);
    });

    if (!client) {
      return;
    }

    try {
      const pw = await new pwManage();

      var passHex = await pw.passSet(password);

      const db = client.db("test");

      let collection = db.collection("admins");

      let query = {
        name: namein,
        age: fullage,
        username: user,
        password: passHex,
      };

      let res = await collection.insertOne(query);

      console.log("user added");
    } catch (err) {
      console.log(err);
    } finally {
      client.close();
    }
  }
  //remove administrators from
  //tested works
  async removeAdmin(user) {
    const client = await MongoClient.connect(config.DB_URI, {
      useNewUrlParser: true,
    }).catch((err) => {
      console.log(err);
    });

    if (!client) {
      return;
    }

    try {
      const db = client.db("test");

      let collection = db.collection("admins");

      let query = { user: user };

      let res = await collection.findOneAndDelete(query);

      console.log("Deleted admin");
    } catch (err) {
      console.log(err);
    } finally {
      client.close();
    }
  }
  //query admins

  async findAdmin(user) {
    var buildstring;
    const client = await MongoClient.connect(config.DB_URI, {
      useNewUrlParser: true,
    }).catch((err) => {
      console.log(err);
    });

    if (!client) {
      return;
    }

    try {
      const db = client.db("test");

      let collection = db.collection("admins");

      let query = { user: user };

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
    const client = await MongoClient.connect(config.DB_URI, {
      useNewUrlParser: true,
    }).catch((err) => {
      console.log(err);
    });

    if (!client) {
      return;
    }

    try {
      const pw = await new pwManage();

      var passHex = await pw.passSet(password);

      const db = client.db("test");

      let collection = db.collection("admins");

      let query = { user: user };

      let update = {
        name: namein,
        age: fullage,
        user: username,
        password: passHex,
      };

      let res = await collection.findOneAndReplace(query, update);
    } catch (err) {
      console.log(err);
    } finally {
      client.close();
      console.log("updated " + namein);
    }
  }

  async adminLogIn(user, password) {
    const client = await MongoClient.connect(config.DB_URI, {
      useNewUrlParser: true,
    }).catch((err) => {
      console.log(err);
    });

    var passBool;

    if (!client) {
      return;
    }

    try {
      const pw = await new pwManage();

      const db = client.db("test");

      let collection = db.collection("admins");

      let query = { username: user };

      let res = await collection.findOne(query);

      passBool = await pw.validPassword(password, res.password);
    } catch (err) {
      passBool = false;
    } finally {
      client.close();
      return passBool;
    }
  }

  //add drivers
  async pushDriver(fullname, fullage, username, password) {
    const client = await MongoClient.connect(config.DB_URI, {
      useNewUrlParser: true,
    }).catch((err) => {
      console.log(err);
    });

    if (!client) {
      return;
    }

    try {
      const pw = await new pwManage();

      var passHex = await pw.passSet(password);

      const db = client.db("test");

      let collection = db.collection("drivers");

      let query = {
        name: fullname,
        age: fullage,
        username: username,
        password: passHex,
      };

      let res = await collection.insertOne(query);

      console.log("user added");
    } catch (err) {
      console.log(err);
    } finally {
      client.close();
    }
  }
  //remove drivers 
  async removeDriver(user) {
    const client = await MongoClient.connect(config.DB_URI, {
      useNewUrlParser: true,
    }).catch((err) => {
      console.log(err);
    });

    if (!client) {
      return;
    }

    try {
      const db = client.db("test");

      let collection = db.collection("drivers");

      let query = { user: user };

      let res = await collection.findOneAndDelete(query);

      console.log("Deleted Driver");
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
    const client = await MongoClient.connect(config.DB_URI, {
      useNewUrlParser: true,
    }).catch((err) => {
      console.log(err);
    });

    if (!client) {
      return;
    }

    try {
      const db = client.db("test");

      let collection = db.collection("drivers");

      let query = { user: user };

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
    const client = await MongoClient.connect(config.DB_URI, {
      useNewUrlParser: true,
    }).catch((err) => {
      console.log(err);
    });

    if (!client) {
      return;
    }

    try {
      const pw = await new pwManage();

      var passHex = await pw.passSet(password);

      const db = client.db("test");

      let collection = db.collection("drivers");

      let query = { user: user };

      let update = {
        name: namein,
        age: fullage,
        username: username,
        password: passHex,
      };

      let res = await collection.findOneAndReplace(query, update);
    } catch (err) {
      console.log(err);
    } finally {
      client.close();
      console.log("updated " + namein);
    }
  }

  async driverLogIn(username, password) {
    const client = await MongoClient.connect(config.DB_URI, {
      useNewUrlParser: true,
    }).catch((err) => {
      console.log(err);
    });

    var passBool;

    if (!client) {
      return;
    }

    try {
      const pw = await new pwManage();

      const db = client.db("test");

      let collection = db.collection("drivers");

      let query = { username: username };

      let res = await collection.findOne(query);

      passBool = await pw.validPassword(password, res.password);
    } catch (err) {
      passBool = false;
    } finally {
      client.close();
      return passBool;
    }
  }

  async parentLogIn(username, password) {
    const client = await MongoClient.connect(config.DB_URI, {
      useNewUrlParser: true,
    }).catch((err) => {
      console.log(err);
    });

    var passBool;

    if (!client) {
      return;
    }

    try {
      const pw = await new pwManage();

      const db = client.db("test");

      let collection = db.collection("parents");

      let query = { username: username };

      let res = await collection.findOne(query);

      passBool = await pw.validPassword(password, res.password);
    } catch (err) {
      passBool = false;
    } finally {
      client.close();
      return passBool;
    }
  }
  async pushParent(username, password, child) {
    const client = await MongoClient.connect(config.DB_URI, {
      useNewUrlParser: true,
    }).catch((err) => {
      console.log(err);
    });

    if (!client) {
      return;
    }

    try {
      const pw = await new pwManage();

      var passHex = await pw.passSet(password);

      const db = client.db("test");

      let collection = db.collection("parent");

      let query = { username: username, password: passHex, child: child };

      let res = await collection.insertOne(query);

      console.log("user added");
    } catch (err) {
      console.log(err);
    } finally {
      client.close();
    }
  }
  async findStudentFromParent(user) {
    var buildstring;
    const client = await MongoClient.connect(config.DB_URI, {
      useNewUrlParser: true,
    }).catch((err) => {
      console.log(err);
    });

    if (!client) {
      return;
    }

    try {
      const db = client.db("test");

      let collection = db.collection("parent");

      let query = { username: user };

      let res = await collection.findOne(query);
    } catch (err) {
      console.log(err);
    } finally {
      client.close();

      return res.child;
    }
  }
}
module.exports = Database;
