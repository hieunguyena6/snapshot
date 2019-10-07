var express = require('express');
var router = express.Router();

router.get('/nature', function(req, res, next) {
  res.render('general/gallery');
});
module.exports = router;
