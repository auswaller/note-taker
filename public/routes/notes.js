const notes = require("express").Router();
const {readFromFile, readAndAppend, writeToFile} = require("../../helper/fsUtils");
const uuid = require("../../helper/uuid");

notes.post("/", (req, res) => {
    const {title, text} = req.body;
 
    if (req.body) {
      const newNote = {
        id: uuid(),
        title,
        text,
      };
      readAndAppend(newNote, "./db/db.json");
    } else {
      res.error("Error adding note");
    }
  });

notes.get("/", (req, res) => {
    readFromFile("./db/db.json").then((dat) => res.json(JSON.parse(dat)));
  });

notes.delete("/:id", (req, res) => {
    const noteUuid = req.params.id;
    readFromFile("./db/db.json")
    .then((data) => {
        const notesToSav = JSON.parse(data).filter((note) => note.id !== noteUuid);

        writeToFile("./db/db.json", notesToSav);
    });
});

module.exports = notes;