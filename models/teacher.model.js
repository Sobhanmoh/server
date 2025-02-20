const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    school:{type:mongoose.Schema.ObjectId, ref:"school"},
    name:{type:String, required:true},
    email:{type:String, required:true},
    qualifiction:{type:String, required:true},
    age:{type:String, required:true},
    gander:{type:String, required:true},
    teacher_image:{type:String, required:true},
    Password:{type:String, required:true},

    createAt:{type:Date, default:new Date()}
})

module.exports = mongoose.model("teacher", teacherSchema);