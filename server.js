const express = require('express');
const methodOverride = require('method-override');
const controllers = require('./controllers')
const session = require("express-session");
const MongoStore = require("connect-mongo");
require('dotenv').config();
const app = express();
require('./config/db.connection');

//middleware
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

//session controller
app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // two weeks
    },
  })
);
app.use(methodOverride('_method'));

//Routes
app.use("/", controllers.auth);
app.use('/workouts', controllers.workout);
app.use("/user", controllers.profile);








app.use((req,res, next) => {
  res.locals.user = req.session.currentUser;
  return next();
})

app.get('/home', function(req, res) {
  
  const stories = [{
    name: 'Jack',
    description: 'Started at beginner and now I live for expert!',
    photo: 'https://cdn.prod.openfit.com/uploads/2018/12/15172036/before-after-pictures.jpg'
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
  },
  
]

  
  res.render('index', {stories: stories});
});

app.get('/', function (req, res) {
  console.log(req.session.currentUser)
  if(!req.session.currentUser){
    res.redirect('/login')
  }
})


app.listen(process.env.PORT || 4000, function () {
  console.log('Listening on port 4000')
});