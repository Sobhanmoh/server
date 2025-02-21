const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    school: {type: mongoose.Schema.ObjectId, ref: "School"},
    student: {type: mongoose.Schema.ObjectId, ref: "Student"},
    class: {type: mongoose.Schema.ObjectId, ref: "class"},
    date: {type: Date, required: true},
    status: {type: String, enum: ["Present", "Absent"], default: "Present"},

    createAt: {type: Date, default: new Date()},
});

module.exports = mongoose.model('Attendance', attendanceSchema);