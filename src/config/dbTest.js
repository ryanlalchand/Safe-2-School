const Database = require("./db");

async function populateDB() {
  const db = await new Database();
  //comment these out once youve added them once so you dont have a bunch of dupes
  //populate  student
  await db.pushStudent("Caroline", 22, "Youngstown", 1235432222, "wdasdwa.oiawhdiubhw.djlabdwajd","12:45", "24:45");
  //populate driver
  await db.pushDriver("Robert Jones", 32, "Bob22", "ILikeCats43");
  //populate admin
  await db.pushAdmin("Robert Stone", 54, "RStone1965", "IHATEmyJob23");

  //should return true
  console.log(
    "Driver Password's match?: " +
      (await db.driverLogIn("Bob22", "ILikeCats43"))
  );
  //should return true
  console.log(
    "Admin Password's match?: " +
      (await db.adminLogIn("RStone1965", "IHATEmyJob23"))
  );
  //should return false
  console.log(
    "Admin Password's match?: " +
      (await db.adminLogIn("RSone1965", "iaehgjiopaefghuioahsde"))
  );
}
populateDB();
