const express = require("express");
const CoursesModel = require("../models/courseModels");
const { SendResponse } = require("../helper/helper");
const route = express.Router()

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

route.get('/:id',(req,res)=>{});
route.post('/',(req,res)=>{});
route.put('/:id',(req,res)=>{});
route.delete('/:id',(req,res)=>{});