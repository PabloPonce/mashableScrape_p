// Lets require and Scrape this 
var express = require('express');
var router  = express.Router();
var request = require("request");
var cheerio = require("cheerio");
var Article = require("../models/Article.js");

router.get("/", function(req, res) {
	request("http://mashable.com/entertainment/?utm_cid=mash-prod-nav-ch", function(error, response, html) {
	var $ = cheerio.load(html);
		$("div h2").each(function(i, element) {
	
	var result = {};
		result.title = $(this).children("a").text();
		result.link = $(this).children("a").attr("href");
	
	var entry = new Article(result);
		entry.save(function(err, doc) {
			if (err) {
				console.log(err);
			} else {
				console.log(doc);
			}
		});
	});
		console.log("Sprape Successfull");
		res.redirect('/articles');
	})
});

module.exports = router;