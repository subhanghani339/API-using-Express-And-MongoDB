const mongoose = require("mongoose")

const CoursesSchema = new mongoose.Schema({
    courseName:{
        type: String,
        required:true,
    },
    courseDuration:{
        type: String,
        required: true,
    },
    courseFees:{
        type: Number,
        required: true,
    },
    courseShortName:{
        type: String,
        required: true,
    }
})

const CoursesModel = mongoose.model('course',CoursesSchema)

module.exports = CoursesModel