#!/usr/bin/env node
/*
 *   Documentation link:https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
*/
import http from 'http';
//import http  from 'unit-http'
//var http = require('unit-http');
import fs from 'fs'

import routes_info  from '../app/config/route.json' assert {type:'json'}


var public_session = routes_info.no_session;
var private_session = routes_info.session;
var data;

http.createServer((request, response) => {
  const { headers, method, url } = request;
  console.log(url);  
  var url_stripped = url.replace(/\/+$/, '');
  if (public_session[url_stripped]) {
        console.log(public_session[url_stripped].path)
        try {
          data = fs.readFileSync(public_session[url_stripped].path, 'utf8');
        } catch (err) {
          console.error(err);
        }
    } 
    else  {
        try {
          data = fs.readFileSync(process.cwd() + '/' +  url_stripped, 'utf8');
          console.log(process.cwd() + '/' +  url_stripped);
        } catch (err) {
            console.log('Error - Page not found');
        } 
    }
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    // BEGINNING OF NEW STUFF

    response.on('error', (err) => {
      console.error(err);
    });

    response.statusCode = 200;
    //response.setHeader('Content-Type', 'application/json');
    // Note: the 2 lines above could be replaced with this next one:
    // response.writeHead(200, {'Content-Type': 'application/json'})

    const responseBody = { headers, method, url, body };

    //response.write(JSON.stringify(responseBody));
//    response.setHeader('Content-Type', 'text/html');
//   response.writeHead(200, {"Content-Type": "text/html"});
    response.write(data);
    response.end();
    // Note: the 2 lines above could be replaced with this next one:
    // response.end(JSON.stringify(responseBody))

    // END OF NEW STUFF
  });
//}).listen();
}).listen(8080);
