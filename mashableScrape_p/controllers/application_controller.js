var express = require('express');
var router  = express.Router();
	router.get('/', function(req, res) {
 	res.redirect("/scrape");
});

module.exports = router;