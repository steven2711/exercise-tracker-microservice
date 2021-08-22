const express = require("express");
const router = express.Router();
const { addUser, getUsers, getUserAndLogs } = require("../controllers/users");
const { addExercise, getExercises } = require("../controllers/exercises");

// Middleware

router.route("/").get(getUsers).post(addUser);

router.route("/:_id/exercises").post(addExercise);

router.route("/exercises").get(getExercises);

router.route("/:_id/logs").get(getUserAndLogs);

module.exports = router;
