const express = require('express');
Exercise = require('../models/Exercise')
const router = express.Router();

router.get('/new', (req, res) => {
  
  res.render('new');
});

module.exports = router