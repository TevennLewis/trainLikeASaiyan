const express = require('express');

const workoutRouter = require('./controllers/workout_controller');

const methodOverride = require('method-override');

const app = express();

app.set('view engine', 'ejs');


//Middleware 
app.use('/workouts', workoutRouter)
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


//Routes
app.get('/', function(req, res) {
  const stories = [{
    name: 'Jack',
    description: 'Started at beginner and now I live for expert!',
    photo: 'https://i2.wp.com/christianforemost.com/wp-content/uploads/2021/04/MAR-20-min.png?resize=1024%2C576&ssl=1'
  },
  {
    name: 'Jill',
    description: 'Loving Train Like a Saiyan! I am stronger than ever!',
    photo: 'https://mk0thebettyrockber7x.kinstacdn.com/wp-content/uploads/2021/03/Jolene-Yarger-2-300x300.png'
  }
]
  res.render('index', {stories: stories});
});

app.listen(4000, function () {
  console.log('Listening on port 4000')
});