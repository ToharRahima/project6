var express = require("express");
var router = express.Router();
const path = require("path");
const users = require("../users.json");
const fs = require("fs");
const options = {
  root: path.join(),
};

/* GET users listing. */
router.post("/login", function (req, res, next) {
  console.log("users: ", users);
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

router.post("/signup", function (req, res, next) {
  const username = req.body.username;
  const filePath = path.join(__dirname, "..", "users.json");
  const invalidUser = users.filter((user) => user.username === username);
  console.log("invalidUser: ", invalidUser);
  if (invalidUser.length !== 0) {
    res.status(404).send("user alredy exist!");
  } else {
    users.push(req.body);
    mkdir(username);
    fs.writeFileSync(filePath, JSON.stringify(users));
    res.status(200).send(JSON.stringify(username));
  }
});

function mkdir(name) {
  console.log("im here ", name);
  const pathFolder = path.join(__dirname, "..", "users");

  fs.mkdirSync(path.join(pathFolder, name), (err) => {
    if (err) {
      return console.error(err);
    }
    console.log("Directory created successfully!");
  });
}

module.exports = router;
