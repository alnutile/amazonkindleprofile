// Scraping Made Easy with jQuery and SelectorGadget 
// (http://blog.dtrejo.com/scraping-made-easy-with-jquery-and-selectorga)
// by David Trejo
// 
// Install node.js and npm:
//    http://joyeur.com/2010/12/10/installing-node-and-npm/
// Then run
//    npm install jsdom jquery http-agent
//    node numresults.js
// 
//  Modified to scrape your Amazon library for
//  	Title
//		Author
//		Soon image and highlights
//
var util = require('util')
  , url = require('url')
  , httpAgent = require('http-agent')
  , jsdom = require('jsdom').jsdom;
 
var rootUrl = 'profile/Alfred-E--Nutile/2827195/public_notes';
var urls = [rootUrl];
var agent = httpAgent.create('kindle.amazon.com', urls);

function getPager(agent) { 
	var window = jsdom(agent.body).createWindow()
   , $ = require('jquery').create(window);
  
	var numPage = $('.profilePagination a').length;
	//now loop though and do the others
		var urls = new Array();
		for(i = 0; i < numPage; i++){
			var page = i + 1;
			urls[i] = rootUrl+'/'+page;
		}
		var agent = httpAgent.create('kindle.amazon.com', urls);

		agent.addListener('next', function (err, agent) {
			printBooks(agent);
			agent.next();
		});
		agent.addListener('stop', function (err, agent) {
			if (err) console.log(err);
		});
		agent.start();
}

function printBooks(agent) { 
  var window = jsdom(agent.body).createWindow()
	, $ = require('jquery').create(window);
  
  var titles = $('.bookInfo .title a')
	, author = $('.bookInfo .author');
	   
  var printme = $.map(author, function(el, i) {
		return $(titles[i]).text() + '\t' + $(el).text();
	}); 
  console.log(printme.join('\n'));
}


//Get number of pages in the pager

agent.addListener('next', function (err, agent) {
  getPager(agent);
  console.log();
  agent.next();
});

agent.addListener('stop', function (err, agent) {
  if (err) console.log(err);
});
 
// Start scraping
agent.start();

