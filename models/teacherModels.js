const mongoose = require("mongoose")

const TeacherScheme = new mongoose.Schema({
    teacherName:{
        type: String,
        required: true,
    },
    course:{
        type: String,
        required: true,
    },
    contact:{
        type: String,
        required: true,
    }
})

const TeacherModel = mongoose.model("teacher", TeacherScheme)

module.exports = TeacherModel;