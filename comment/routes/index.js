var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/commentDB');

var commentSchema = mongoose.Schema({
  Name: String,
  Comment: String
});

var Comment = mongoose.model('Comment', commentSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected');
});

router.post('/comment', function(req, res, next) {
  console.log("POST comment route"); //[1]
  console.log(req.body); //[2]
  
  var newcomment = new Comment(req.body); //[3]
  console.log(newcomment); //[3]
  newcomment.save(function(err, post) { //[4]
    if (err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});

/* GET comments from database */
router.get('/comment', function(req, res, next) {
  console.log("In the GET route");
  Comment.find(function(err,commentList) { //Calls the find() method on your database
    if (err) return console.error(err); //If there's an error, print it out
    else {
      console.log(commentList); //Otherwise console log the comments you found
      console.log("End of GET route.");
      res.json(commentList);
    }
  })
});

/* delete comments from database */
router.post('/remove', function(req, res, next) {
  console.log("In the Remove route");
  //console.log(req.body);
  Comment.remove(function(err,deletedDocs){
    req.body;
    if(err) return console.error(err);
    else {
      //console.log(deletedDocs);
      res.sendStatus(200);
    }
  })
});

module.exports = router;
