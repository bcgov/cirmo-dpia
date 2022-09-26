/*
 * Author: Anthony Shivakumar 
 * Email: anthony.shivakumar@gov.bc.ca
 *
 * This file converts a high level view of our files 
 * in config.json and transforms it into a folder 
 * structure.
 *
 * To add files or folder, edit the .json file
 * Do not create folders directly.
 *
 * To run this file on the command line run
 * > node render_numchuck.js
 *  
 */

import nunjucks from 'nunjucks'
import fs from 'fs'
import routes_info  from './config.json' assert {type:'json'}

/* 
 * Loop throught public and private and generate htmk code 
 */
 var public_page  = routes_info.public; 
 var private_page  = routes_info.private; 
 var generate_folder = 'dist/' 

process.argv.forEach(function (val, index, array) {
 if (val == 'production') {
    console.log("Building for production")
 }   
});

public_page.hierarchy.forEach(function(value, index) {
	var read_path =  value.path;
	var write_path = 'dist/' + value.path;
	console.log(value);
	if (!value.hasOwnProperty('controller')) {
		return;
	}
	var controllers = Object.keys(value.controller);
	controllers.forEach(function(controller) {
		if (!value.controller[controller].hasOwnProperty('action')) {
			return;
		}
		var actions = Object.keys(value.controller[controller].action);
		actions.forEach(function(action) {
			if (!value.controller[controller].action[action].hasOwnProperty('view')) {
				return;
			}
			var views = Object.keys(value.controller[controller].action[action].view);
			views.forEach(function(view) {
				var title = value.controller[controller].action[action].view[view].title;
				var res = nunjucks.render(read_path + view + '.nj', {title: title } );
                
                fs.mkdirSync(write_path + view, { recursive: true }, (err) => {
                  if (err) throw err;
                });
				
                fs.writeFile(write_path + view +'.html', res, (err) => {
				  if (err)
				    console.log(err);
				  else {
				    console.log("File written successfully\n");
				  }
				});

			});
		})
		console.log(actions);
	});
})

