const express = require('express');

const methodOverride = require('method-override');

const app = express();

app.listen(4000, function () {
  console.log('Listening on port 4000')
});


//Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


//Routes
app.get('/', function(req, res) {
  res.send('Hello');
});