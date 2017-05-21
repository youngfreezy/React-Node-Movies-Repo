var express = require('express');
var router = express.Router();
var request = require('request');
//wouldn't keep this here in the real world
const apiKey = '9952def8e4e171a89ef202376a61cbe6';
router.get('/', function(req, res, next) {
    request('http://api.themoviedb.org/3/discover/movie?language=en&sort_by=popularity.asc&primary_release_year=2017&api_key=' + apiKey + '&page=' + req.query.page, (error, response, body) => {
        if (!error && response.statusCode == 200) {
        	res.send(body)
        }
    })
});
router.get('/:id', function (req, res, next) {
	let id = req.params.id;
	request('http://api.themoviedb.org/3/movie/' + id + '?api_key=' + apiKey, (error, response, body) => {
        if (!error && response.statusCode == 200) {
        	res.send(body)
        }

        if (response.statusCode === 404) {
        	res.json({
        		title: "Summary not found",
        		overview: "The Movies DB does not have an individual view for this movie",
        		tagline: "Sorry!",
        		status: "N/A",
        		notFound: true
        	})
        }

    })

})
module.exports = router;