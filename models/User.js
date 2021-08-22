const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxlength: [20, "Name can not be more than 20 characters"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Reverse populate

UserSchema.virtual("log", {
  ref: "Exercise",
  localField: "_id",
  foreignField: "username", // Field you are using from the Exercise model
  justOne: false,
});

module.exports = mongoose.model("User", UserSchema);
