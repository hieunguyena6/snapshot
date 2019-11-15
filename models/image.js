var mongoose = require('mongoose');
var ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
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
  },
  album: {
    type: String
  },
  users_like: {
    type: [String]
  },
});
var Image = mongoose.model('Image', ImageSchema);
module.exports = Image;
