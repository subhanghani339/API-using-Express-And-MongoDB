const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
require("dotenv").config();
app.use(cors())

const StudentRoute = require("./routes/studentRoute")
app.use("/api/student", StudentRoute)

const TeacherRoute = require("./routes/teacherRoute")
app.use("/api/teacher", TeacherRoute)

const InstituteRoute = require("./routes/instituteRoute");
app.use("/api/institute", InstituteRoute)

const CRoute = require("./routes/courseRoute");
app.use("/api/course", CRoute)

const UserRoute = require("./routes/userRoute");
app.use("/api/user", UserRoute);

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI3)
.then(() => {
    app.listen(process.env.PORT,() => {
        console.log("Database connected successfully and Server is listening on port 5000")
    })
}).catch((error)=>{
    console.log(error)
})

// npm i mongoose
// npm i -g nodemon (1 time for 1 PC)
// npm i dotenv
// npm i 