const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema(
  {
    exerciseOne: {
      type: Number, 
      required: true,
    },
    exerciseTwo: {
      type: Number, 
      required: true,
    },
    exerciseThree: {
      type: Number, 
      required: true,
    },
    exerciseFour: {
      type: Number, 
      required: true,
    },
    exerciseFive: {
      type: Number, 
      required: true,
    },
    exerciseSix: {
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