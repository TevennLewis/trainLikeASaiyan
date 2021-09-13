const { Exercise } = require('../models');

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
        isSaved: false
      },
      {
        name: 'Body Weight Squat',
        sets: 5,
        reps: 25,
        isSaved: false
      },
      {
        name: 'Pull Up',
        sets: 5,
        reps: 10,
        isSaved: false
      },
      {
        name: 'Plank to Pike',
        sets: 5,
        reps: 8,
        isSaved: false
      },
      {
        name: 'Supine Hip Thrust',
        sets: 5,
        reps: 20,
        isSaved: false
      },
      {
        name: 'Standing Broad Jump',
        sets: 5,
        reps: 8,
        isSaved: false
      },
      {
        name: 'Burpee',
        sets: 5,
        reps: 12,
        isSaved: false
      },
      {
        name: 'Kettle Bell Swing',
        sets: 5,
        reps: 15,
        isSaved: false
      },
      {
        name: 'Kettle Bell Clean and Jerk',
        sets: 5,
        reps: 20,
        isSaved: false
      },
      {
        name: 'TRX Row',
        sets: 5,
        reps: 15,
        isSaved: false
      },
      {
        name: 'Ab Rollout',
        sets: 5,
        reps: 10,
        isSaved: false
      },
      {
        name: 'Supermans',
        sets: 5,
        reps: 12,
        isSaved: false
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