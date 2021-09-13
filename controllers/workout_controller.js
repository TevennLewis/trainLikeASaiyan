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
        console.log(`LOOOOK AT MEEEE ${workout} LOOOOK AT MEEEEE`)
        const createdWorkout = await Workout.create(workout);

        return res.redirect(`/${req.query.redirect}`);

    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    };
});
module.exports = router