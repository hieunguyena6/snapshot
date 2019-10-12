var express = require('express');
var router = express.Router();

router.get('/nature', function(req, res, next) {
  if (!req.session.user) res.render('general/gallery', {message : "",fullname: ""});
  else res.render('general/gallery', {message : "", fullname: req.session.fullname});
});
module.exports = router;
