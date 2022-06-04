const express = require("express");
const app = express();
const tasks = require("./assets/TaskData.json");

app.get("/", (req, res) => {
  res.send(tasks);
  res.end();
});

app.listen(3000, () => console.log("Server is running on port 3000"));