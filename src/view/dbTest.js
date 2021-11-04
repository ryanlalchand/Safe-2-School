const Database = require('../db')

async function createDB() {
    const db = await new Database();
    await db.pushStudent("Caroline", 22, "Youngstown", 1235432222, "wdasdwa.oiawhdiubhw.djlabdwajd",
        "12:45", "24:45");
    
}

createDB();