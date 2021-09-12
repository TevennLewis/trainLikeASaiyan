const express = require('express');
const router = express.Router();

router.post('/profile', (req, res) => {
  
  res.render('new');
});

module.exports = router