var express = require("express");
var router = express.Router();
const path = require("path");
const pathFolder = path.join(__dirname, "..", "users");
const fs = require("fs");

// display files
router.get("/users/:name/display", function (req, res, next) {
  const name = req.params.name;
  console.log("name: ", name);
  fs.readdir(`${pathFolder}/${name}`, (err, files) => {
    console.log("`${pathFolder}/${name}`: ", `${pathFolder}/${name}`);
    if (err) {
      res.status(500).send(JSON.stringify(err));
    }
    console.log("files: ", files);
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
  console.log("the data wiil be sent next:");

  fs.readFile(`${pathFolder}/${name}/${file}`, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
    res.status(200).send(JSON.stringify(data)).end();
  });
});

//rename file
router.patch("/users/:name/:filename", function (req, res, next) {
  const name = req.params.name;
  const oldname = req.params.filename;
  const newname = req.body.newname;
  const files = fs.readdirSync(`${pathFolder}/${name}`);
  if (files.includes(newname)) {
    return res
      .status(400)
      .send(JSON.stringify("there is another file with this name..."));
  } else {
    fs.renameSync(
      `${pathFolder}/${name}/${oldname}`,
      `${pathFolder}/${name}/${newname}`
    );
    res.status(200).send("file updated");
  }
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
    res.status(200).send(
      JSON.stringify({
        details: stats,
        type: stats.isFile() ? "file" : "folder",
      })
    );
  });
});

//add folder
router.post("/addfolder/:name", function (req, res) {
  try {
    const name = req.params.name;
    const newfolder = req.body.newfolder;
    const files = fs.readdirSync(`${pathFolder}/${name}`);

    if (files.includes(newfolder)) {
      return res.status(404).send("there is another file with this name...");
    }
    fs.mkdir(path.join(`${pathFolder}/${name}`, newfolder), (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send("An error occurred while creating the folder.");
      }
      res.status(200).send("Folder added successfully!");
      console.log("Directory created successfully!");
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});

module.exports = router;
