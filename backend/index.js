const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

const notes = [
  { id: 1, description: "note 1", userId: 1, resolved: true },
  { id: 2, description: "note 2", userId: 1 },
  { id: 3, description: "note 3", userId: 2 },
  { id: 4, description: "note 4" }
];

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  const note = { id: Date.now(), resolved: false, ...req.body };
  notes.push(note);

  res.json(note);
});

app.patch("/api/notes/:id", (req, res) => {
  const index = notes.findIndex(note => note.id === parseInt(req.params.id));
  const note = notes[index];
  if ("resolved" in req.body) note.resolved = req.body.resolved;
  if ("userId" in req.body) note.userId = req.body.userId;

  res.json(note);
});

app.listen(9001, () => {
  console.log("Node server started on port 9001.");
});
