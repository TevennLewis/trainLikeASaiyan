const express = require('express');

require('./config/db.connection');

const session = require("express-session");
const MongoStore = require("connect-mongo");


const methodOverride = require('method-override');

const app = express();
const controllers = require('./controllers')

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));

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
app.use(methodOverride('_method'));

app.use((req,res, next) => {
  res.locals.user = req.session.currentUser;
  return next();
})
//Routes
app.use("/", controllers.auth);
app.use('/workouts', controllers.workout);
app.use("/user", controllers.profile);

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


app.listen(4000, function () {
  console.log('Listening on port 4000')
});