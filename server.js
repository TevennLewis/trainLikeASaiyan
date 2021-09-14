const express = require('express');

require('./config/db.connection');

const session = require("express-session");
const MongoStore = require("connect-mongo");

const workoutRouter = require('./controllers/workout_controller');

const methodOverride = require('method-override');

const app = express();
const controllers = require('./controllers')

app.set('view engine', 'ejs');

app.use(
  session({
    store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/train" }),
    secret: "super secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // two weeks
    },
  })
);


//Middleware 
app.use(express.urlencoded({ extended: true }));
app.use('/workouts', workoutRouter)
app.use(methodOverride('_method'));


app.use("/", controllers.auth);
app.use("/user", controllers.profile);
//Routes
app.get('/home', function(req, res) {
  const stories = [{
    name: 'Jack',
    description: 'Started at beginner and now I live for expert!',
    photo: 'https://i2.wp.com/christianforemost.com/wp-content/uploads/2021/04/MAR-20-min.png?resize=1024%2C576&ssl=1'
  },
  {
    name: 'Jill',
    description: 'Loving Train Like a Saiyan! I am stronger than ever!',
    photo: 'https://mk0thebettyrockber7x.kinstacdn.com/wp-content/uploads/2021/03/Jolene-Yarger-2-300x300.png'
  },
  {
    name: 'Sam',
    description: 'Training is kicking my tail but I feel 10 years younger!', 
    photo: 'https://qph.fs.quoracdn.net/main-qimg-4e2e70eadf4bd675d939864c4640bb79'
  }
]
  res.render('index', {stories: stories});
});


app.listen(4000, function () {
  console.log('Listening on port 4000')
});