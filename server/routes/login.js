var express = require("express");
var router = express.Router();

const path = require("path");
const users = require("../users.json");
const fs = require("fs");
const options = {
  root: path.join(),
};

/* GET home page. */
router.post("/", function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  const rightuser = users.filter(
    (user) => user.username === username && user.password === password
  );
  if (rightuser.length === 0) {
    console.log("rightuser ", rightuser);
    res.status(404).send("user is not found!");
  } else {
    res.status(200).send(JSON.stringify(rightuser.username));
    console.log("rightuser: ", rightuser);
  }
});

module.exports = router;
