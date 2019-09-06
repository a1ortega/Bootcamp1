//# -*- coding: utf-8 -*-
//"""
//Created on Thur Sep 05 2019

//@author: andrew.ortega@ufl.edu
//GITHUB NAME:*** a1ortega   *** 
//PROJECT LINK
//"""
//#Creates server on local host and responds with JSON data when request.url=listing

var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
	//console.log('request handler'); //DEBUG**
  var parsedUrl = url.parse(request.url);
		if(request.method === 'GET' && request.url === '/listings'){
			//console.log('listings!'); //**DEBUG	
			//console.log(listingData); //**DEBUG**
			response.statusCode='200'; //set status 200
			response.write(listingData); //send  listingData
			response.end();
			}
		else if(request.method === 'GET'){
			//console.log('get only'); //**DEBUG
			response.statusCode='404';
			response.write('Bad gateway error');
			response.end();
			}
		else{
			//console.log('/404'); //**DEBUG
			response.statusCode='404';
			response.write('Bad gateway error');
			response.end();
			}
			
  response.end(); //end the response
};
  


fs.readFile('listings.json', 'utf8', function(err, data) {
  if (err)   //Check for errors
  	throw err;
    //console.log(data); //DEBUG**
   // console.log('parsed!'); //DEBUG**
  listingData = data; //Save the sate in the listingData variable already defined
var server = http.createServer(requestHandler); //create server

server.listen(port, function() { //start server  
  console.log('Server listening on: http://localhost:' + port); //output server port
})
});


