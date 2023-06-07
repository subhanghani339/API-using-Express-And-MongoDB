const express = require("express");
const { SendResponse } = require("../helper/helper");
const InstituteModel = require("../models/instituteModels");
const route = express.Router();

route.get('/', async (req,res) => {
  try {
    const result = await InstituteModel.find();
    if (!result) {
      res.send(SendResponse(false, null, "Data Not Found")).status(404);
    } else {
      res.send(SendResponse(true, result)).status(200);
    }
  } catch (e) {
    res.send(SendResponse(false, null, "Internal Server Error")).status(400);
  }
})

route.get('/:id',async (req,res)=>{
    try {
        const result = await InstituteModel.find();
        if (!result) {
          res.send(SendResponse(false, null, "Data Not Found")).status(404);
        } else {
          res.send(SendResponse(true, result)).status(200);
        }
      } catch (e) {
        res.send(SendResponse(false, null, "Internal Server Error")).status(400);
      }
})

route.post('/', async (req,res) =>{
    const { instituteName, instituteAddress, instituteShortName, institutePhoneNumber } = req.body;
  try {
    if (!instituteName) {
      res.send(SendResponse(false, null, "Institute Name Required"));
    }

    if (!instituteAddress) {
      res.send(SendResponse(false, null, "Institute Address Required"));
    }

    if (!instituteShortName) {
      res.send(SendResponse(false, null, "Institute Short Name Required"));
    } else {
      let Obj = { instituteName, instituteAddress, instituteShortName, institutePhoneNumber};
      let teacher = new InstituteModel(Obj);
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
})

route.put('/:id', async (req,res)=>{
  try {
    let id = req.params.id;
    let result = await InstituteModel.findById(id);

    if (!result) {
      res.send(SendResponse(false, null, "No Data Found!")).status(400);
    } else {
      let updateResult = await InstituteModel.findByIdAndUpdate(id, req.body, {
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
})

route.delete('/:id', async (req,res)=>{
  try {
    const id = req.params.id;
    const result = await InstituteModel.findById(id);
    if (!result) {
      res.send(SendResponse(false, null, "Data Not Found!")).status(400);
    } else {
      let delResult = await InstituteModel.findByIdAndDelete(id);
      if(!delResult){
        res.send(SendResponse(false, null, "Error")).status(404)
      } else {
        res.send(SendResponse(true, null, "Deleted Successfully")).status(200);
      }
    }
  } catch (e) {
    res.send(SendResponse(false, null, "No Data On This ID")).status(404)
  }
})

module.exports = route