const express = require('express');
const router = express.Router();
const { User, Workout, Exercise } = require("../models");

router.get('/:id', async (req, res, next) => {
    try {
        const foundUser = await User.findById(req.params.id);
        const allWorkout = await Workout.find({ user: req.params.id })
            .populate(
                'exerciseOne exerciseTwo exerciseThree exerciseFour exerciseFive exerciseSix'
            )
            ;
        const context = {
            user: foundUser,
            workouts: allWorkout,
        };
        console.log(context)
        return res.render('profile', context);

    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    };
});

// router.get('/:id/editworkout', async (req, res, next) => {
//     try {
//         const foundUser = await User.findById(req.params.id);
//         const allWorkout = await Workout.find({ user: req.params.id })
//             .populate({
//                 path: 'exerciseOne',
//                 model: Exercise
//             })
//             .populate({
//                 path: 'exerciseTwo',
//                 model: Exercise
//             })
//             .populate({
//                 path: 'exerciseThree',
//                 model: Exercise
//             })
//             .populate({
//                 path: 'exerciseFour',
//                 model: Exercise
//             })
//             .populate({
//                 path: 'exerciseFive',
//                 model: Exercise
//             })
//             .populate({
//                 path: 'exerciseSix',
//                 model: Exercise
//             })
//             ;
//         const context = {
//             user: foundUser,
//             workouts: allWorkout,
//         };
//         console.log(context)
//         return res.render('edit', context);

//     } catch (error) {
//         console.log(error);
//         req.error = error;
//         return next();
//     };
// });

router.get('/:id/workout/:wid', async (req, res, next) => {
    try {
        const foundWorkout = await Workout.findById(req.params.wid)
        .populate('exerciseOne exerciseTwo exerciseThree exerciseFour exerciseFive exerciseSix');
        const foundUser = await User.findById(req.params.id);
        const foundExercises = await Exercise.find({});
        console.log(foundWorkout, foundUser);

        const context = {
            workout: foundWorkout,
            user: foundUser,
            exercises: foundExercises,
        }
    return res.render("edit", context);

    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

router.put('/:id/workout/:wid', async (req, res, next) => {
    
    try {
        if( req.body.exercise.length < 6 || typeof(req.body.exercise) === "string"){
            const allExercises = await Exercise.find({});
            const updatedWorkout = await Workout.findById(req.params.wid)
    
            const foundUser = await User.findById(req.params.id);
                console.log(foundUser);
            const context = {
                error: "Each workout needs 6 exercises",
                exercises: allExercises,
                workout: updatedWorkout,
                user: foundUser,
                
            };
            return res.render('edit', context)
        }

        if(req.body.exercise.length > 6 ){
            const allExercises = await Exercise.find({});
            const updatedWorkout = await Workout.findById(req.params.wid)
    
            const foundUser = await User.findById(req.params.id);
                console.log(foundUser);
            const context = {
                error: "Each workout has a maximum of 6 exercises",
                exercises: allExercises,
                workout: updatedWorkout,
                user: foundUser,
                
            };
            return res.render('edit', context)
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
        const updatedWorkout = await Workout.findByIdAndUpdate(req.params.wid,
            { $set: postWorkout },
            { new: true });

        const foundUser = await User.findById(req.params.id);
            console.log(foundUser);
        const context = {
            workout: updatedWorkout,
            user: foundUser,
        };
        return res.redirect(`/user/${foundUser._id}`);

    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    };
});

router.delete('/:id/workout/:wid', async (req, res, next) => {
    try {
        const deletedWorkout = await Workout.findByIdAndDelete(req.params.wid);
        const foundUser = await User.findById(req.params.id);

        console.log("THIS IS THE DELETED WORKOUT", deletedWorkout);

        return res.redirect(`/user/${foundUser._id}`);
        
        
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    };
});

module.exports = router;