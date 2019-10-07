var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('guest/index_guest');
});
router.get('/login', function(req, res, next) {
  res.render('general/login');
});
router.get('/register', function(req, res, next) {
  res.render('general/register');
});
module.exports = router;
