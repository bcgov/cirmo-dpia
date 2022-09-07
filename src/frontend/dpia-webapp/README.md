# dpia-webapp

## Frontend Architecture
The DPIA front end will follow a modular architecture. Some call it micro-frontend architecture. The objective is to avoid a single point of failure architecture. A system with one framework or one entry point a.k.a single-page application (SPA) has a single point of failure. Long-term maintainability gets tricky as version updates, dependencies break and vulnerabilities creep in.

### How is the folder structured:
The folder is a structure with an HMVC architecture in mind. It has an easy way to follow the code and understand how the page and routes work.

Note: Update this table as new files are added/ edited or deleted

App - (source code)

	.
	├── common
	│   ├── sass
	│   │   ├── _bootstrap_variables.scss
	│   │   ├── _buttons.scss
	│   │   ├── common.scss
	│   │   ├── _default.scss
	│   │   ├── _font.scss
	│   │   ├── _footer.scss
	│   │   ├── _header.scss
	│   │   ├── _login.scss
	│   │   ├── _root.scss
	│   │   └── _variables.scss
	│   └── template
	│       ├── footer.nj
	│       ├── header.nj
	│       └── head.nj
	├── private
	│   ├── dashboard
	│   ├── pia
	│   └── pid
	└── public
	    ├── login
	    │   └── index.nj
	    └── pid
		├── index.nj
		├── sass
		│   ├── _default.scss
		│   └── pid.scss
		└── vue
		    ├── App.vue
		    ├── listpid.vue
		    ├── main.ts
		    └── searchpid.vue
	    

### How does it work 
The source code is placed in the app folder. 

![High Level Build Process](wiki/assets/images/high-level-build-process.jpg?raw=true "High Level Build Process")

This project uses templating engines to help write modular code.  
> **_NOTE:_**  For CSS we use SASS. 
Since CSS by default does not have any programming logic, SASS is a tool we can use to write progammable CSS

> **_NOTE:_**  For HTML we use nunjuck.
HTML does not have any programming logic. Nunjuck is an HTML template engine that helps write progammable HTML

> **_NOTE:_**   For Javascript we use VUE/typescript
Typescript is a tool to typecheck javascript code. VUE is a tool that can help write modular Javascript code and can help add reactivity to HTML pages easily. 

> It is not necessary to always use these tools. If raw css, html or javascript can do the job, by all means use the right tool for the job. 

![Folder Structure](wiki/assets/images/folder-structure.jpg?raw=true "Folder Structure")

![Code Compile Process](wiki/assets/images/code-compile-process.jpg?raw=true "Code Compile Process")

![Dist folder structure](wiki/assets/images/dist-folder-structure.jpg?raw=true "Dist folder structure")

![Frontend Build Process](wiki/assets/images/frontend-build-proces.jpg?raw=true "Frontend Build Process")


