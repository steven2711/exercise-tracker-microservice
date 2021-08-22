const User = require("../models/User");
const Exercise = require("../models/Exercise");

// @desc    Get all users (just users)
// @route   GET /api/users
// access   Public
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (err) {
    console.error(`${err}`.red.bold);

    res.status(400).json({
      success: false,
      error: err,
    });
  }
};

// @desc    Create single users
// @route   POST /api/users
// access   Public
exports.addUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(200).json({
      username: user.username,
      _id: user._id,
    });
  } catch (err) {
    console.error(`${err}`.red.bold);

    res.status(400).json({
      success: false,
      error: err,
    });
  }
};

// @desc    Get specific user and exercise logs
// @route   GET /api/users/:_id/logs
// access   Public
exports.getUserAndLogs = async (req, res) => {
  let { from, to, limit } = req.query;

  let exerciseQuery = {
    username: req.params._id,
  };

  if (from && to) {
    exerciseQuery.date = { $gte: from, $lte: to };
  } else if (from && !to) {
    exerciseQuery.date = { $gte: from };
  } else if (!from && to) {
    exerciseQuery.date = { $lte: to };
  }

  // Issue with trying to filter date range with the populate option. Docs unclear. Building a hacky solution until fully researched.

  try {
    // const usersAndLogs = await User.findById(req.params._id);

    const users = await User.findById(req.params._id);

    // Filter exercises from here
    const userExercises = await Exercise.find(exerciseQuery).limit(
      parseInt(limit)
    );

    // Build custom output

    const userObj = users._doc;

    const exerciseArray = [];

    // Count exercises
    let count = 0;

    userExercises.forEach((exercise) => {
      count++;
      exerciseArray.push({
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date,
      });
    });

    userObj.log = exerciseArray;
    userObj.count = count;

    res.status(200).json(users);
  } catch (err) {
    console.error(`${err}`.red.bold);

    res.status(400).json({
      success: false,
      error: err,
    });
  }
};

// http://localhost:3000/api/users/61203418a7e8ae44cfff10e4/logs?from=2021-01-01&to=2022-01-01&limit=2
