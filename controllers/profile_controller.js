const express = require('express');
const router = express.Router();
const { User, Workout, Exercise } = require("../models");

router.get('/', function (req, res) {
    res.send('hello');
})
router.get('/:id', async (req, res, next) => {
    try {
        const foundUser = await User.findById(req.params.id);
        const allWorkout = await Workout.find({ user: req.params.id })
            .populate({
                path: 'exerciseOne',
                model: Exercise
            })
            .populate({
                path: 'exerciseTwo',
                model: Exercise
            })
            .populate({
                path: 'exerciseThree',
                model: Exercise
            })
            .populate({
                path: 'exerciseFour',
                model: Exercise
            })
            .populate({
                path: 'exerciseFive',
                model: Exercise
            })
            .populate({
                path: 'exerciseSix',
                model: Exercise
            })
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

router.get('/:id/editworkout', async (req, res, next) => {
    try {
        const foundUser = await User.findById(req.params.id);
        const allWorkout = await Workout.find({ user: req.params.id })
            .populate({
                path: 'exerciseOne',
                model: Exercise
            })
            .populate({
                path: 'exerciseTwo',
                model: Exercise
            })
            .populate({
                path: 'exerciseThree',
                model: Exercise
            })
            .populate({
                path: 'exerciseFour',
                model: Exercise
            })
            .populate({
                path: 'exerciseFive',
                model: Exercise
            })
            .populate({
                path: 'exerciseSix',
                model: Exercise
            })
            ;
        const context = {
            user: foundUser,
            workouts: allWorkout,
        };
        console.log(context)
        return res.render('edit', context);

    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    };
});

router.put('/:id', async (req, res, next) => {
    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true });

        const foundUser = await User.findById(req.params.id);

        const context = {
            workout: updatedWorkout,
            user: foundUser,
        };

        return res.redirect(`/user/${user.id}`);

    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    };
});

module.exports = router;