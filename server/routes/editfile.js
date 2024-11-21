var express = require("express");
var router = express.Router();
const path = require("path");
const users = require("../users.json");
const pathFolder = path.join(__dirname, "..", "users");
const fs = require("fs");
const options = {
  root: path.join(),
};

//display files
router.get("/users/:name/display", function (req, res, next) {
  const name = req.params.name;
  fs.readdir(`${pathFolder}/${name}`, (err, files) => {
    if (err) {
      res.status(500).send(JSON.stringify(err));
    }
    files.forEach((file) => {
      console.log(file);
    });
    res.status(200).send(JSON.stringify(files));
  });
});

//create file

router.post("/users/:name", function (req, res) {
  try {
    const name = req.params.name;
    const filename = req.body.filename;
    const folderPath = `${pathFolder}/${name}`;

    const files = fs.readdirSync(folderPath);

    if (files.includes(filename)) {
      return res.status(404).send("there is another file with this name...");
    }

    const filePath = `${folderPath}/${filename}`;
    fs.writeFileSync(filePath, "");

    res.status(200).send("File added successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});

//delete file

router.delete("/users/:name", function (req, res, next) {
  const name = req.params.name;
  console.log("name: ", name);
  const filename = req.body.filename;
  console.log("filename: ", filename);
  fs.unlink(`${pathFolder}/${name}/${filename}`, function (err) {
    if (err) res.status(404).send(JSON.stringify(err)).end();
    res.status(200).send(JSON.stringify(filename)).end();
  });
});

//show content
router.get("/users/:name/:file", function (req, res, next) {
  const name = req.params.name;
  const file = req.params.file;
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
  fs.readdir(`${pathFolder}/${name}`, (err, files) => {
    const samefile = files.filter((file) => (file = newname));
    if (samefile.length !== 0) {
      res
        .status(404)
        .send(JSON.stringify("there is another file with this name..."));
    } else {
      fs.rename(
        `${pathFolder}/${name}/${oldname}`,
        `${pathFolder}/${name}/${newname}`,
        function (err) {
          if (err) console.log("ERROR: " + err);
          console.log("renamed!");
        }
      );
    }
  });
});

//more info about file
router.get("/users/:name/:file/info", function (req, res, next) {
  const file = req.params.file;
  console.log("file: ", file);
  const name = req.params.name;
  console.log(
    "`${pathFolder}/${name}/${file}`: ",
    `${pathFolder}/${name}/${file}`
  );
  fs.stat(`${pathFolder}/${name}/${file}`, (err, stats) => {
    if (err) {
      console.error("Err in get info ", err);
    }
    console.log("stats: ", stats);
    res.status(200).send(JSON.stringify(stats));
  });
});

module.exports = router;
