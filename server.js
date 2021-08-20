const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const colors = require("colors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Your app is listening on port ${listener.address().port}`.yellow
  );
});
