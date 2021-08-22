const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
require("dotenv").config();

// Load models
const User = require("./models/User");
const Exercise = require("./models/Exercise");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read JSON files

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);

// Import data into DB

const importData = async () => {
  try {
    await User.create(users);
    console.log("User data imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Exercise.deleteMany();
    console.log("All data destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
