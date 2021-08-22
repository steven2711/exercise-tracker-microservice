const Exercise = require("../models/Exercise");

// @desc    Add single exercise to user
// @route   POST /api/users/:_id/exercises
// access   Public
exports.addExercise = async (req, res) => {
  try {
    if (req.body.date === "") {
      req.body.date = undefined;
    }

    req.body.username = req.params._id;
    console.log(req.body);
    const exercise = await Exercise.create(req.body);

    res.status(200).json(exercise);
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
