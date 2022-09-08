#!/usr/bin/env node
/*
 *   Documentation link:https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
 *   This is the main.js file. The main entry to the whole application. It does two things:
 *
 *   1. It listens to a port either as a node server or an NGINX UNITD server. 
 *   2. It servers files. For serving files there is a two step process. It first checks
		if it needs to load the file dynamically based on the rotues provided in routes.json
        or serve static files like image.
		Based on the file type the associated MIME type is selected and is added to the response
		header. Not all browsers auto recognize MIME type, so it is necessary to add it to the header.
     
 	    MIME tells the browser what type of data it isi (SVG, png, html, json, etc) and accordingly display content.  
 * 
*/
import http from 'http';
import path from 'path'; 
//import http  from 'unit-http' /* When using NGINX UNITD we need to uncomment this line */
import fs from 'fs'

import routes_info  from '../app/config/route.json' assert {type:'json'}

var public_session = routes_info.no_session;
var private_session = routes_info.session;
var data;

var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};
let type = 'text/plain';

http.createServer((request, response) => {
  const { headers, method, url } = request;
  var url_stripped = url.replace(/\/+$/, '');
  /* check if the public routes exist. public_session gets routing info from 
   * from route.json  
   */
  if (public_session[url_stripped]) {
        try {
          data = fs.readFileSync(public_session[url_stripped].path, 'utf8');
		  type =  'text/html';
        } catch (err) {
          console.error(err);
        }
    } 
  /* If the routes do not exist, then check if the static files like images exist. 
   * If it finds the right file, add the correct MIME type to the header. 
   */
    else  {
        try {
	      type = mime[path.extname(url_stripped).slice(1)] || 'text/plain';
		  data = fs.readFileSync(process.cwd() + '/' +  url_stripped, 'utf8');
        } catch (err) {
            //console.log('Error - Page not found');
            data = 'Page not Found';
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

    response.setHeader('Content-Type',type);
    response.writeHead(200, {"Content-Type": type});
    response.write(data);
    response.end();
  });
//}).listen(); /* When NGINX UNITD is activated, uncomment this */
}).listen(8080); /* When Node Server is activated, use this port */
