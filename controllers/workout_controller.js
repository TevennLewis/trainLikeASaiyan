const express = require('express');
const { db } = require('../models/Exercise');
const router = express.Router();
const Exercise = require('../models/Exercise');
const Workout = require('../models/Workout');

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

// new workout GET form route
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

// create workout POST route
router.post('/new', async (req, res, next) => {
    try {
        if( req.body.exercise.length < 6 || typeof(req.body.exercise) === "string"){
            const allExercises = await Exercise.find({});

            const context = {
                error: "Each workout needs 6 exercises",
                exercises: allExercises,
            };
            return res.render('new', context)
        }

        if(req.body.exercise.length > 6 ){
            const allExercises = await Exercise.find({});

            const context = {
                error: "Each workout has a maximum of 6 exercises",
                exercises: allExercises,
            };
            return res.render('new', context)
        }
        
        const exercises = req.body.exercise;
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
        console.log('User', postWorkout.user);
        
        // console.log(Object.keys(workout));
        // console.log(JSON.stringify(workout.exercise));
        console.log("req.session.currentUser", req.session.currentUser)
        const createdWorkout = await Workout.create(postWorkout);
        console.log("createdWorkout", createdWorkout)
        return res.redirect(`/user/${postWorkout.user}`);
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