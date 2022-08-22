# 
# Use this file to complile different frontend componets
# To run Makefile, type 
# > make 
# to sell list of commands 

list:
	@grep '^.PHONY: .* #' Makefile | sed 's/\.PHONY: \(.*\) # \(.*\)/\1 \2/' | expand -t20


compile:
	sass app/common/sass/common.scss builds/css/common-dpia.css
	sass app/public/pid/sass/pid.scss builds/css/public-pid.css
	npm run build_dev
	node render_nunchuck.js

.PHONY: compile                 # Compiles all dependencies. .scss to .css, .vue to .js and route.json to file structure

compile-nj:
	node render_nunchuck.js
.PHONY: compile-nj              # Compiles numchuck .nj to .html

compile-sass:	
	sass app/common/sass/common.scss builds/css/common-dpia.css
	sass app/public/pid/sass/pid.scss builds/css/public-pid.css
.PHONY: compile-sass            # Compiles all SASS files .scss to .css

compile-nj-sass:	
	node render_nunchuck.js
	sass app/common/sass/common.scss builds/css/common-dpia.css
	sass app/public/pid/sass/pid.scss builds/css/public-pid.css
.PHONY: compile-nj-sass         # Compiles nunchuck and sass files only
	
