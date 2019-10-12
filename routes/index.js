var express = require('express');
var router = express.Router();
var User = require('../models/user');
/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.user) res.render('general/index', {message : "",fullname: ""});
  else res.render('general/index', {message : "", fullname: req.session.fullname});
});

router.get('/login', function(req, res, next) {
  res.render('guest/login', {message : req.flash('message'), fullname: ""});
});

router.get('/register', function(req, res, next) {
  res.render('guest/register', {message : "", fullname: ""});
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/');
});
router.post('/register', function(req, res, next) {
  var post = req.body;
  var user = new User({
    firstname: post.firstname,
    lastname: post.lastname,
    email: post.email,
    password: post.password
  }).save((err, result) => {
    if (err) {
      res.render('guest/register', {message: "Email đã được sử dụng", fullname: ""});
      console.log(err);
    }
    else {
      req.flash('message', 'Đăng ký thành công !!!')
      res.redirect('/login');
      //res.render('/login', {message: "Đăng ký thành công ! Hãy đăng nhập."});
    }
  })
});

router.post('/login', function(req, res, next) {
  var post = req.body;
  User.findOne({'email': post.username, 'password': post.password}, (err, user) => {
    if (!user) res.render('guest/login', {message: "Tên tài khoản hoặc mật khẩu không chính xác !"});
    else {
      req.session.user = user.email;
      req.session.fullname = user.firstname + " " + user.lastname;
      console.log(req.session.fullname);
      res.redirect('/');
    }
  })
});

module.exports = router;
