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

route.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let result = await TeacherModel.findById(id);

    if (!result) {
      res.send(SendResponse(false, null, "No Data Found!")).status(400);
    } else {
      let updateResult = await TeacherModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updateResult) {
        res.send(SendResponse(false, null, "Error")).status(404);
      } else {
        res
          .send(SendResponse(true, updateResult, "Updated Successfully"))
          .status(200);
      }
    }
  } catch (e) {
    res.send(SendResponse(false, null, "Error")).status(400);
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await TeacherModel.findById(id);
    if (!result) {
      res.send(SendResponse(false, null, "Data Not Found!")).status(400);
    } else {
      let delResult = await TeacherModel.findByIdAndDelete(id);
      if(!delResult){
        res.send(SendResponse(false, null, "Error")).status(404)
      } else {
        res.send(SendResponse(true, null, "Deleted Successfully")).status(200);
      }
    }
  } catch (e) {
    res.send(SendResponse(false, null, "No Data On This ID")).status(404)
  }
});

module.exports = route;