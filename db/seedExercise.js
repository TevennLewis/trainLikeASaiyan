const { Exercise } = require('../models/Exercise');

Exercise.deleteMany({}, (error, deletedExercises) => {
  if (error) {
    return console.error(error);
  }
  Exercise.insertMany(
    [
      {
        name: 'Push Up',
        sets: 5,
        reps: 20,
      },
      {
        name: 'Body Weight Squat',
        sets: 5,
        reps: 25
      },
      {
        name: 'Pull Up',
        sets: 5,
        reps: 10
      },
      {
        name: 'Plank to Pike',
        sets: 5,
        reps: 8,
      },
      {
        name: 'Supine Hip Thrust',
        sets: 5,
        reps: 20
      },
      {
        name: 'Standing Broad Jump',
        sets: 5,
        reps: 8
      },
      {
        name: 'Burpee',
        sets: 5,
        reps: 12
      },
      {
        name: 'Kettle Bell Swing',
        sets: 5,
        reps: 15
      },
      {
        name: 'Kettle Bell Clean and Jerk',
        sets: 5,
        reps: 20
      },
      {
        name: 'TRX Row',
        sets: 5,
        reps: 15
      },
      {
        name: 'Ab Rollout',
        sets: 5,
        reps: 10
      },
      {
        name: 'Supermans',
        sets: 5,
        reps: 12
      }


    ],
    (error, createdExercise) => {
      if (error) {
        return console.log(error);
      }
      console.log('=====SEED COMPLETE ======');
      console.log(createdExercise);
    }
  );
});