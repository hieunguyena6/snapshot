var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Image = require('../models/image');
var Album = require('../models/album');
var multer = require("multer");
var path = require("path");
var crypto = require('crypto');


/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.user) res.render('general/index', {
    message: "",
    fullname: ""
  });
  else res.render('general/index', {
    message: "",
    fullname: req.session.fullname
  });
});

router.get('/login', function(req, res, next) {
  res.render('guest/login', {
    message: req.flash('message'),
    fullname: ""
  });
});

router.get('/register', function(req, res, next) {
  res.render('guest/register', {
    message: "",
    fullname: ""
  });
});

router.get('/myprofile',async function(req, res, next) {
  var fullname = req.session.fullname;
  console.log(fullname);
  if (typeof fullname == 'undefined') res.redirect('/');
  else {
    var images = await Image.find({user: req.session.user});
    var user = await User.findOne({_id : req.session.user_id});
    console.log(images);
    res.render('user/profile', {
      message: "",
      fullname: fullname,
      user: user,
      images: images
    });
  }
});

router.get('/upload', function(req, res, next) {
  if (!req.session.user) res.render('general/index', {
    message: "Hãy đăng nhập để upload ảnh !",
    fullname: ""
  });
  else res.render('user/upload', {
    message: "",
    fullname: req.session.fullname
  });
});

router.post("/upload", (req, res) => {
  let diskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
      var fs = require('fs');
      var dir = `public/uploads/${req.session.user}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      callback(null, dir);
    },
    filename: function(req, file, cb) {
      crypto.pseudoRandomBytes(16, function(err, raw) {
        if (err) return cb(err)
        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
  });

  let uploadFile = multer({
    storage: diskStorage
  }).single("file");
  uploadFile(req, res, (error) => {
    var post = req.body;
    if (error) {
      res.render('user/upload', {
        message: "Đăng tải ảnh lỗi " + error,
        fullname: req.session.fullname
      });
    } else {
      var image = new Image({
        name: req.file.filename,
        type: post.type,
        user: req.session.user,
        title: post.title,
        location: post.location,
        description: post.des
      })
      image.save((e, result) => {
        if (e) {
          res.render('user/upload', {
            message: "Lưu ảnh bị lỗi: " + e,
            fullname: req.session.fullname
          });
        } else {
          res.render('user/upload', {
            message: "Đăng tải ảnh thành công !",
            fullname: req.session.fullname
          });
        }
      })
    }
  });
});

router.get('/upload_album', function(req, res, next) {
  if (!req.session.user) res.render('general/index', {
    message: "Hãy đăng nhập để upload ảnh !",
    fullname: ""
  });
  else res.render('user/upload_album', {
    message: "",
    fullname: req.session.fullname
  });
});

router.post("/upload_album", (req, res) => {
  let diskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
      var fs = require('fs');
      var dir = `public/uploads/${req.session.user}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      callback(null, dir);
    },
    filename: function(req, file, cb) {
      crypto.pseudoRandomBytes(16, function(err, raw) {
        if (err) return cb(err)
        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
  });
  let uploadFile = multer({
    storage: diskStorage
  }).array("file", 20);
  uploadFile(req, res, (error) => {
    var post = req.body;
    if (error) {
      res.render('user/upload', {
        message: "Đăng tải ảnh lỗi " + error,
        fullname: req.session.fullname
      });
    } else {
      var album = new Album({
        user: req.session.user,
        title: post.title,
        location: post.location,
        type: post.type,
        description: post.des
      }).save(function(e, result) {
        if (e) res.render('user/upload_album', {
          message: "Đăng tải album bị lỗi " + e,
          fullname: req.session.fullname
        });
        else {
          for (var i = 0; i < req.files.length; i++) {
            var image = new Image({
              name: req.files[i].filename,
              type: post.type,
              user: req.session.user,
              title: post.title,
              location: post.location,
              description: post.des,
              album: result._id
            }).save(function(er) {
              if (er) res.render('user/upload_album', {
                message: "Đăng tải ảnh bị lỗi " + er,
                fullname: req.session.fullname
              });
              else {
                res.render('user/upload_album', {
                  message: "Đăng tải album thành công ",
                  fullname: req.session.fullname
                });
              }
            });
          }
        }
      })
    }
  });
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
      res.render('guest/register', {
        message: "Email đã được sử dụng",
        fullname: ""
      });
      console.log(err);
    } else {
      req.flash('message', 'Đăng ký thành công !!!')
      res.redirect('/login');
      //res.render('/login', {message: "Đăng ký thành công ! Hãy đăng nhập."});
    }
  })
});

router.post('/login', function(req, res, next) {
  var post = req.body;
  User.findOne({
    'email': post.username,
    'password': post.password
  }, (err, user) => {
    if (!user) res.render('guest/login', {
      message: "Tên tài khoản hoặc mật khẩu không chính xác !",
      fullname: ""
    });
    else {
      req.session.user = user.email;
      req.session.user_id = user._id;
      req.session.fullname = user.firstname + " " + user.lastname;
      console.log(req.session.fullname);
      res.redirect('/');
    }
  })
});

module.exports = router;
