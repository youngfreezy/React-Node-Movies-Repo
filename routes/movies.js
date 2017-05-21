var express = require('express');
var router = express.Router();
var request = require('request');

const apiKey = '9952def8e4e171a89ef202376a61cbe6';
router.get('/', function(req, res, next) {
	console.log('the actual request', req);
    request('http://api.themoviedb.org/3/discover/movie?language=en&sort_by=popularity.asc&api_key=' + apiKey + '&page=' + req.query.page, (error, response, body) => {
        if (!error && response.statusCode == 200) {
        	res.send(body)
        }
    })

});

module.exports = router;