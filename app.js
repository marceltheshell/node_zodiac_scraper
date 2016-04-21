var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var rp      = require('request-promise');
var signes_zodiacs = require('./lib/horroscopes'); 


//routes
app.get('/horroscopes', function(req, res){
	var horroscopes = new Object();
	signes_zodiacs.urls.forEach(function(url, idx){

		rp(url)
			.then(function(data) {

				var $ = cheerio.load(data);
				horroscopes.signe = $('.astrolist > span').text();
				horroscopes.semaine = $('.date').text();
				horroscopes.naissance_entre = $('.periode').text();
		    horroscopes.horoscope = $('.zone-resultat > p').text();
				console.log(horroscopes);

			})
			.catch(function (err) {
	      console.log(err);

	    });

	});
  res.sendStatus(200); 
}); 



app.listen('3000')
console.log('The magic is happening on port 3000');
exports = module.exports = app;


	// var horroscopes = new Object();
	// signes_zodiacs.urls.forEach(function(url, idx){
		
	// 	request(url, function(error, response, html){
	// 		if (error){

	// 			console.log(error);
			
	// 		} else {

	// 		  var $ = cheerio.load(html);
	// 			horroscopes.signe = $('.astrolist > span').text();
	// 			horroscopes.semaine = $('.date').text();
	// 			horroscopes.naissance_entre = $('.periode').text();
	// 	    horroscopes.horoscope = $('.zone-resultat > p').text();
		    
	// 	  }
	// 	    // fs.writeFile('horoscope_hebdo_test_Belier.json', JSON.stringify(horroscopes, null, 4), function(err){
	// 	    //   console.log('File successfully written! - Check your project directory for the output.json file');
	// 	    // })
	// 	  console.log("the horroscopes are:" + JSON.stringify(horroscopes));
	// 	  res.sendStatus(200);
	//   });
	// });



