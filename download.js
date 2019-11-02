var Image = require('./models/image');
const testFolder = './public/uploads/admin@admin/d9f93a46-61f6-49ca-b2da-9e6707c5c492';
const fs = require('fs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/snapshot',{useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true,},function(err){
  if (err) console.log('connect error');
  else console.log('connected');
})
var n = 1;
fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    var image = new Image({
      name: file,
      user: "admin@admin",
      title: "Ảnh thiên nhiên " + n,
      location: "Trái Đất",
      description: "Ảnh thiên nhiên đẹp",
      type: "thiennhien"
    })
    console.log(image);
    image.save((e, result) => {
      if (e) {
        console.log(e);
      }
    });
    n++;
  });
});
