const express = require("express");
const CoursesModel = require("../models/courseModels");
const { SendResponse } = require("../helper/helper");
const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const result = await CoursesModel.find();
    if (!result) {
      res.send(SendResponse(false, null, "Data Not Found")).status(404);
    } else {
      res.send(SendResponse(true, result)).status(200);
    }
  } catch (e) {
    res.send(SendResponse(false, null, "Internal Server Error")).status(400);
  }
});

route.get("/:id", (req, res) => {});

route.post("/", async (req, res) => {
  const { courseName, courseDuration, courseFees, courseShortName } = req.body;
  try {
    if (!courseName) {
      res.send(SendResponse(false, null, "Course Name Required"));
    }

    if (!courseDuration) {
      res.send(SendResponse(false, null, "Course Duration Required"));
    }

    if (!courseFees) {
      res.send(SendResponse(false, null, "Course Fees Required"));
    }

    if (!courseShortName) {
      res.send(SendResponse(false, null, "Course Short Name Required"));
    } 
    
    else {
      let Obj = { courseName, courseDuration, courseFees, courseShortName };
      let course = new CoursesModel(Obj);
      await course.save();
      if (!course) {
        res
          .send(SendResponse(false, null, "Internal Server Error"))
          .status(400);
      } else {
        res
          .send(SendResponse(true, student, "Data Saved Successfully"))
          .status(200);
      }
    }
  } catch (e) {
    console.log(e);
  }
});

route.put("/:id", (req, res) => {});
route.delete("/:id", (req, res) => {});
