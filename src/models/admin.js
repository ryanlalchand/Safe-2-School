const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name : { type : String, required : true, max : [127, "Max Length is 127 characters"] },
    age : { type : Number, required : true},
    location : { type : String, required : true}
});

module.exports = mongoose.model("Admin", adminSchema );