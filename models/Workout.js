const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema(
  {
    exerciseOne: {
      type: mongoose.Types.ObjectId,
      ref: "Exercise",
      required: true,
    },
    exerciseTwo: {
      type: mongoose.Types.ObjectId,
      ref: "Exercise",
      required: true,
    },
    exerciseThree: {
      type: mongoose.Types.ObjectId,
      ref: "Exercise",
      required: true,
    },
    exerciseFour: {
      type: mongoose.Types.ObjectId,
      ref: "Exercise",
      required: true,
    },
    exerciseFive: {
      type: mongoose.Types.ObjectId,
      ref: "Exercise",
      required: true,
    },
    exerciseSix: {
      type: mongoose.Types.ObjectId,
      ref: "Exercise",
      required: true,
    },
    user: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;