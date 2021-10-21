const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name : { type : String, required : true, max : [127, "Max Length is 127 characters"] },
    age : { type : Number, required : true},
    location : { type : String, required : true},
    phonenumber : { type : Number, required : true},
    url : { type : String, required : true},
    dropoffAM : { type : String, required : false},
    dropoffPM : { type : String, required : false},
});

module.exports = mongoose.model("Student", studentSchema );