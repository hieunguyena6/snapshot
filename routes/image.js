var express = require('express');
var router = express.Router();
var Image = require('../models/image');
var Album = require('../models/album');

router.get('/like/:id', async function(req, res, next) {
  if (req.session.user_id) {
    let id = req.params.id;
    let image = await Image.findOne({
      _id: id
    });
    console.log(image);
    image.users_like = image.users_like || [];
    let users_like = image.users_like;
    if (users_like.includes(req.session.user_id)) {
      image.users_like = image.users_like.remove(req.session.user_id);
    } else image.users_like.push(req.session.user_id);
    image.save();
    res.sendStatus(200);
  }
})

router.delete('/:id', async function(req, res, next) {
  var img_id = req.params.id;
  var image = await Image.findOne({_id: id});
  if (image.user == req.session.user) {
    await Image.deleteOne({_id: id});
    res.sendStatus(200);
  }
})

Array.prototype.remove = function() {
  var what, a = arguments,
    L = a.length,
    ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};
module.exports = router;
