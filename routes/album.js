var express = require('express');
var router = express.Router();
var Album = require('../models/album');
var Image = require('../models/image');

router.get('/:id',async function(req, res, next) {
  var id = req.params.id;
  var album = await Album.findOne({_id: id});
  var images = await Image.find({album: id});
  for (var i = 0 ; i < images.length; i++){
      var album = await Album.findById(images[i].album);
      images[i].albumTitle = album.title;
  }
  res.render('general/album', {message: '', fullname: '', album: album, images: images});
})

module.exports = router;
