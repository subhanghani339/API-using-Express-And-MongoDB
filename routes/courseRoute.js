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

route.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const result = await CoursesModel.findById(id);
    if (!result) {
      res.send(SendResponse(false, null, "No Data Found")).status(404);
    } else {
      res.send(SendResponse(true, result)).status(200);
    }
  } catch (e) {
    console.log(e);
    res.send(sendResponse(false, null, "Internal Server Error")).status(400);
  }
});

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
    } else {
      let Obj = { courseName, courseDuration, courseFees, courseShortName };
      let course = new CoursesModel(Obj);
      await course.save();
      if (!course) {
        res
          .send(SendResponse(false, null, "Internal Server Error"))
          .status(400);
      } else {
        res
          .send(SendResponse(true, course, "Data Saved Successfully"))
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
    let result = await CoursesModel.findById(id);

    if (!result) {
      res.send(SendResponse(false, null, "No Data Found!")).status(400);
    } else {
      let updateResult = await CoursesModel.findByIdAndUpdate(id, req.body, {
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
    const result = await CoursesModel.findById(id);
    if (!result) {
      res.send(SendResponse(false, null, "Data Not Found!")).status(400);
    } else {
      let delResult = await CoursesModel.findByIdAndDelete(id);
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
