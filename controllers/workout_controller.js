const express = require('express');
const { db } = require('../models/Exercise');
const router = express.Router();
Exercise = require('../models/Exercise');
Workout = require('../models/Workout');

// router.get('/new', (req, res) => {
//   db.Exercise.find({}, (error, allExercises) => {
//     if (error) {
//       console.log(error);
//       req.error = error;
//       return next();
//     }
//     const context = {
//       exercises: allExercises,
//     };
//     res.render('new', context);
//   })
// });

router.get('/new', async (req, res) => {
    try {
        const allExercises = await Exercise.find({});

        const context = {
            exercises: allExercises,
        };

        return res.render('new', context);

    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    };
});

router.post('/new', async (req, res, next) => {
    try {
        const workout = {
            ...req.body,
        };
        const exercises = workout.exercise;
        const postWorkout = {
            exerciseOne: exercises[0],
            exerciseTwo: exercises[1],
            exerciseThree: exercises[2],
            exerciseFour: exercises[3],
            exerciseFive: exercises[4],
            exerciseSix: exercises[5],
            user: req.session.currentUser.id
        }
        console.log(`LOOOOK AT MEEEE LOOOOK AT MEEEEE`)
        // console.log(Object.keys(workout));
        // console.log(JSON.stringify(workout.exercise));
        console.log(req.session.currentUser)
        const createdWorkout = await Workout.create(postWorkout);
        console.log(createdWorkout)
        return res.redirect('/home');
        // console.log(req.body)
        // console.log(req.user)
        // res.send('hello');
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    };
});
module.exports = router