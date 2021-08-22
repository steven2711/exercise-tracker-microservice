const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "Name can not be more than 500 characters"],
  },
  duration: {
    type: Number,
    required: [true, "Please add an exercise duration"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
