const express = require("express");
const route = express.Router();
const studentModel = require("../models/studentModels");
const { SendResponse } = require("../helper/helper");

route.get("/", async (req, res) => {
  try {
    const result = await studentModel.find();
    if (!result) {
      res.send(SendResponse(false, null, "Data Not Found")).status(404);
    } else {
      res.send(SendResponse(true, result)).status(200);
    }
  } catch (e) {
    res.send(SendResponse(false, null, "Internal Server Error")).status(400);
  }
});

route.get("/:id", (req, res) => {
  res.send("Get single student data");
});

route.post("/", async (req, res) => {
  const { firstName, lastName, email, password, contact } = req.body;
  try {
    if (!firstName) {
      res.send(SendResponse(false, null, "First Name Required"));
    }

    if (!email) {
      res.send(SendResponse(false, null, "Email Required"));
    }

    if (!password) {
      res.send(SendResponse(false, null, "Password Required"));
    }

    if (!contact) {
      res.send(SendResponse(false, null, "Contact Required"));
    } else {
      let Obj = { firstName, lastName, email, password, contact };
      let student = new studentModel(Obj);
      await student.save();
      if (!student) {
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

route.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let result = await studentModel.findById(id);

    if (!result) {
      res.send(SendResponse(false, null, "No Data Found!")).status(400);
    } else {
      let updateResult = await studentModel.findByIdAndUpdate(id, req.body, {
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
    const result = await studentModel.findById(id);
    if (!result) {
      res.send(SendResponse(false, null, "Data Not Found!")).status(400);
    } else {
      let delResult = await studentModel.findByIdAndDelete(id);
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
