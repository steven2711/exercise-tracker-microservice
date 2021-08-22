const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const colors = require("colors");

// Connect database
connectDB();

// Helpers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Public view
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Route files
const users = require("./routes/users");

// Mount routers
app.use("/api/users", users);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Your app is listening on port ${listener.address().port}`.yellow.bold
  );

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red);

    // Close server and exit process.
    server.close(() => process.exit(1));
  });
});

// mongodb+srv://bigSauce:bigSauce123@cluster0.anlpp.mongodb.net/test
