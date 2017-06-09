var express = require('express');
var router  = express.Router();
var mongoose = require("mongoose");
var Comment = require("../models/Comment.js");
var Article = require("../models/Article.js");


// Scareping from mongoDB
router.get("/", function(req, res) {
	Article.find({})
    .populate("comment")
    .exec(function(error, result) {
      if (error) {
      	console.log(error);
      } else {
      	res.render('articles/index', {
      	result: result
      });
      }
  });
});

router.post("/update/:id", function(req, res) {
var newComment = new Comment(req.body);
	newComment.save(function(error, result) {
    if (error) {
      console.log(error);
    } else {
     
Article.findOneAndUpdate({ "_id": req.params.id }, {$push: { "comment": result._id } }, {new: true})
	.exec(function(err, doc) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/articles');
		}
	});
}
});
});

router.delete("/delete/:id", function(req, res) {

Comment.findOneAndRemove({ "_id": mongoose.Types.ObjectId(req.params.id) })
	.exec(function(err, doc) {
    if (err) {
    	console.log(err);
    } else {
    		Article.update({ $pull: { comment: { $in: [req.params.id] } } })
      .exec(function(err, doc) {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/articles');
      }
  });
  }
});
});


module.exports = router;




