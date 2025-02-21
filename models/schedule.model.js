const mongoose = require('mongoose')
const mongoose = require('mongoose')

const scheduleSchema = new mongoose.Schema({
    school: {type:mongoose.Schema.ObjectId, ref:"School"},
    teacher: {type:mongoose.Schema.ObjectId, ref:"Teacher"},
    subject: {type:mongoose.Schema.ObjectId, ref:"Subject"},
    class: {type:mongoose.Schema.ObjectId, ref:"Class"},
    endTime: {type: String, required: true},
    startTime: {type: String, required: true},

    createdAt: {type: Date, default: new Date()},
})

module.exports = mongoose.model('schedule', scheduleSchema)