const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    school:{type:mongoose.Schema.ObjectId, ref:"school"},
    class_text:{type:String, required:true},
    class_num:{type:Number, required:true},
    attendee:{type:mongoose.Schema.ObjectId, ref:"teacher"},
    createAt:{type:Date, default:new Date()}
})

module.exports = mongoose.model("class", classSchema);
