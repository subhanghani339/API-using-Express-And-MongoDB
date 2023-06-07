const express = require("express");
const route = express.Router();
const { SendResponse } = require("../helper/helper");
const UserModel = require("../models/userModels");
const bcrypt = require('bcryptjs');

route.post("/signup", async (req, res) => {
  const { userName, email, password } = req.body;
  const obj = { userName, email, password };
  let requiredArr = ["userName", "email", "password"];
  let errArr = [];

  requiredArr.forEach((x) => {
    if (!obj[x]) {
      errArr.push(x);
    }
  });

  if (errArr.length > 0) {
    res
      .send(
        SendResponse(false, null, "The Following Fields Are Missing: ", errArr)
      )
      .status(400);
    return;
  } else {
    let hashPassword = await bcrypt.hash(obj.password, 10);
    obj.password = hashPassword;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res
        .send(SendResponse(false, null, "This Email is Already Exist"))
        .status(403);
    } else {
      UserModel.create(obj)
        .then((result) => {
          res.send(SendResponse(true, result, "User Saved Successfully"));
        })
        .catch((err) => {
          res
            .send(SendResponse(false, err, "Internal Server Error"))
            .status(400);
        });
    }
  }
});

module.exports = route;
