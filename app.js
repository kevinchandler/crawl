
var url = require('url'),
	request = require('request'),
	Crawler = require('crawler'),
	Website = require('./db/schema/website.js');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/websites');

var c = new Crawler({
    maxConnections : 100,
    callback : function (error, result, $) {
      
        try {
        	$('a').each(function(index, a) {

	            var toQueueUrl = $(a).attr('href');
	            
	            if (typeof(toQueueUrl) === 'string') {
		         	
		         	// attempt to turn relative urls into full urls
		            if (toQueueUrl && (toQueueUrl.indexOf('http') === -1) && ( toQueueUrl[0] === '/' || toQueueUrl[0] === '#' )) {
		            	toQueueUrl = result.request.uri.protocol + '//' + result.request.uri.hostname + toQueueUrl
		            }

		          	var parsedUrl = url.parse(toQueueUrl),
	            		website;

		         	// save website if we haven't saved it and it's search query already
					Website.findOne( { hostname: parsedUrl.hostname }, function( err, entry ) {
						if ( !entry ) {
							website = new Website(parsedUrl);
							website.save(function (err) {
								if (!err) {
									console.log('Saved: ' + parsedUrl.hostname + '\n');
								}
							});
						}
						else {
							console.log('Skipping: ' + parsedUrl.hostname + '\n');
						}
					})

		            c.queue(toQueueUrl);

	            }
	        });
	    } catch(e) {
	    	return console.error(e);
	    }

    }
});

c.queue('http://www.alexa.com/topsites');

