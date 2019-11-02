var express = require('express');
var router = express.Router();
var Image = require('../models/image');
var Album = require('../models/album');
router.get('/nature',async function(req, res, next) {
  const images = await Image.find({type: "thiennhien"});
  for (var i = 0 ; i < images.length; i++){
    if(images[i].album) {
      var album = await Album.findById(images[i].album);
      images[i].albumTitle = album.title
    }
  }
  if (!req.session.user) {
    res.render('general/gallery', {message: '', fullname: '', images: images, topic: 'thiên nhiên'});
  } else {
    res.render('general/gallery', {message: '', fullname: req.session.fullname, images: images, topic: 'thiên nhiên'});
  }
})

router.get('/art',async function(req, res, next) {
  const images = await Image.find({type: "hoihoa"});
  if (!req.session.user) {
    res.render('general/gallery', {message: '', fullname: '', images: images, topic: 'Hội họa'});
  } else {
    res.render('general/gallery', {message: '', fullname: req.session.fullname, images: images,topic: 'Hội họa' });
  }
})
module.exports = router;
