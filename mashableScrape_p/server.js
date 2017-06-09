// Require Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require('method-override');
var path = require('path');
var Promise = require("bluebird");

mongoose.Promise = Promise;

// Linking models from views foler
var application_controller = require('./controllers/application_controller');
var scrape_controller = require('./controllers/scrape_controller');
var articles_controller = require('./controllers/articles_controller');

var app = express();
	app.use(methodOverride('_method'));

var exphbs = require('express-handlebars');
	app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', application_controller);
app.use('/scrape', scrape_controller);
app.use('/articles', articles_controller);


// Connecting to mongoose
mongoose.connect("mongodb://admin:codingrocks@ds023664.mlab.com:23664/reactlocate");
var db = mongoose.connection;
	db.on("error", function(error) {
		console.log("Mongoose Error: ", error);
});


db.once("open", function() {
  console.log("Yay Pablo, Connected to Mongoose");
});


// Connecting on port 300
var port = process.env.PORT || 3000;
	app.listen(port, function(){
	console.log("Connected", port);
})


module.exports = app;




