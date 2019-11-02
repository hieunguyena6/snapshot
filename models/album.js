var mongoose = require('mongoose');
var AlbumSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  }
});
var Album = mongoose.model('Album', AlbumSchema);
module.exports = Album;
