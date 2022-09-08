# 
# Use this file to complile different frontend componets
# To run Makefile, type 
# > make 
# to sell list of commands 

list:
	@grep '^.PHONY: .* #' Makefile | sed 's/\.PHONY: \(.*\) # \(.*\)/\1 \2/' | expand -t20

init:
	mkdir -p dist/entry/builds/js/
	mkdir -p dist/entry/builds/css/
	mkdir -p dist/app/config/
	cp main.js dist/entry/
	chmod +x dist/entry/main.js
	cp route.json dist/app/config/
	cp -r assets dist/entry/
#	cp favicon.png dist/entry/

.PHONY: init

compile: init
	sass --load-path=node_modules  app/common/sass/common.scss dist/entry/builds/css/common-dpia.css
	sass --load-path=node_modules  app/public/pid/sass/pid.scss dist/entry/builds/css/public-pid.css
	npm run build_dev
	node render_nunjucks.js production

.PHONY: compile                 # Compiles all dependencies. .scss to .css, .vue to .js and route.json to file structure

compile-nj:
	node render_nunjucks.js
	cp main.js dist/entry/
.PHONY: compile-nj              # Compiles numchuck .nj to .html

compile-sass:	
	sass --load-path=node_modules app/common/sass/common.scss dist/entry/builds/css/common-dpia.css
	sass --load-path=node_modules  app/public/pid/sass/pid.scss dist/entry/builds/css/public-pid.css
.PHONY: compile-sass            # Compiles all SASS files .scss to .css

compile-nj-sass:	
	node render_nunjucks.js
	sass --load-path=node_modules  app/common/sass/common.scss bdist/entry/uilds/css/common-dpia.css
	sass --load-path=node_modules  app/public/pid/sass/pid.scss dist/entry/builds/css/public-pid.css
.PHONY: compile-nj-sass         # Compiles nunchuck and sass files only

run: compile
	cd dist/entry/;node main.js;
.PHONY: run         # Compiles and runs the application
	
