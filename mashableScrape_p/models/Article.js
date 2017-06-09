// Require set up
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ArticleSchema = new Schema({
	title: {
	type: String,
	required: true,
	unique: true,
	dropDups: true
},
	link: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
},
	// saving in handlebars comments....hopefully
	comment: [{
	type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
