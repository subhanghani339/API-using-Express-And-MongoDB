const express = require("express");
const TeacherModel = require("../models/teacherModels");
const { SendResponse } = require("../helper/helper");
const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const result = await TeacherModel.find();
    if (!result) {
      res.send(SendResponse(fasle, null, "Data Not Found!")).status(404);
    } else {
      res.send(SendResponse(true, result)).status(200);
    }
  } catch (e) {
    res.send(SendResponse(false, null, "Internal Server Error")).status(400);
  }
});

route.get("/:id", (req, res) => {
  res.send("Get single teachers data");
});

route.post("/", async (req, res) => {
  const { teacherName, course, contact } = req.body;
  try {
    if (!teacherName) {
      res.send(SendResponse(false, null, "Teacher Name Required"));
    }

    if (!course) {
      res.send(SendResponse(false, null, "Course Name Required"));
    }

    if (!contact) {
      res.send(SendResponse(false, null, "Contact Number Required"));
    } else {
      let Obj = { teacherName, course, contact };
      let teacher = new TeacherModel(Obj);
      await teacher.save();
      if (!teacher) {
        res
          .send(SendResponse(false, null, "Internal Server Error"))
          .status(400);
      } else {
        res
          .send(SendResponse(true, teacher, "Data Saved Successfully"))
          .status(200);
      }
    }
  } catch (e) {
    console.log(e);
  }
});

route.put("/:id", (req, res) => {
  res.send("Edit teachers data");
});

route.delete("/:id", (req, res) => {
  res.send("Delete teachers data");
});

module.exports = route;