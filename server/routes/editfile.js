var express = require("express");
var router = express.Router();
const path = require("path");
const users = require("../users.json");
const pathFolder = path.join(__dirname, "..", "users");
const fs = require("fs");
const options = {
  root: path.join(),
};

//create file

router.post("/users/:name", function (req, res, next) {
  const name = req.params.name;
  console.log("req.params.name: ", req.params.name);
  const filename = req.body.filename;
  console.log("req.body.filename: ", req.body.filename);

  const filepath = fs.writeFile(
    `${pathFolder}/${name}/${filename}`,
    "",
    function (err) {
      if (err) throw res.status(404).send(JSON.stringify(err));
      console.log("added!");
    }
  );
});

//delete file

router.delete("/users/:name", function (req, res, next) {
  const name = req.params.name;
  console.log("name: ", name);
  const filename = req.body.filename;
  console.log("filename: ", filename);
  fs.unlink(`${pathFolder}/${name}/${filename}`, function (err) {
    if (err) res.status(404).send(JSON.stringify(err));
    console.log("deleted");
  });
});

//show content
router.get("/users/:name", function (req, res, next) {
  const name = req.params.name;
  const file = req.body.file;
  fs.readFile(`${pathFolder}/${name}/${file}`, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
    res.status(200).send(JSON.stringify(data));
  });
});

//rename file
router.patch("/users/:name", function (req, res, next) {
  const name = req.params.name;
  const oldname = req.body.oldname;
  const newname = req.body.newname;

  fs.rename(
    `${pathFolder}/${name}/${oldname}`,
    `${pathFolder}/${name}/${newname}`,
    function (err) {
      if (err) console.log("ERROR: " + err);
      console.log("renamed!");
    }
  );
});

module.exports = router;
