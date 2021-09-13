const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String, 
      required: true,
    },
    lastName: {
      type: String, 
      required: true,
    },
    username: {
      type: String, 
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    workouts: {
      type: mongoose.Types.ObjectId,
      ref: "Workout",
      
    }
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;