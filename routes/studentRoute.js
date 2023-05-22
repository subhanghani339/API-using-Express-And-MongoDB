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

route.put("/:id", (req, res) => {
  res.send("Edit student data");
});

route.delete("/:id", (req, res) => {
  res.send("Delete student data");
});

module.exports = route;
