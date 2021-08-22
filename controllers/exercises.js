const Exercise = require("../models/Exercise");
const User = require("../models/User");

// @desc    Add single exercise to user
// @route   POST /api/users/:_id/exercises
// access   Public
exports.addExercise = async (req, res) => {
  try {
    if (req.body.date === "") {
      req.body.date = undefined;
    }

    // Make sure duration is an int
    req.body.duration = parseInt(req.body.duration);

    // Add id to req body
    req.body.userId = req.params._id;

    const exercise = await Exercise.create(req.body);
    const user = await User.find({ _id: req.params._id });

    // Custom object output
    const output = {
      _id: user[0].id,
      username: user[0].username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString(),
    };

    res.status(200).json(output);
  } catch (err) {
    console.error(`${err}`.red.bold);

    res.status(400).json({
      success: false,
      error: err,
    });
  }
};

// @desc    Add single exercise to user
// @route   POST /api/users/:_id/exercises
// access   Public
exports.getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();

    res.status(200).json(exercises);
  } catch (err) {
    console.error(`${err}`.red.bold);

    res.status(400).json({
      success: false,
      error: err,
    });
  }
};
