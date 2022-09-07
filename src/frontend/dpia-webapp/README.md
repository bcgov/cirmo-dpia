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

![Folder Structure](wiki/assets/images/folder-structure.jpg?raw=true "Folder Structure")

![Code Compile Process](wiki/assets/images/code-compile-process.jpg?raw=true "Code Compile Process")

![Dist folder structure](wiki/assets/images/dist-folder-structure.jpg?raw=true "Dist folder structure")
