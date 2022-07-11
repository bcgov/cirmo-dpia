# Digital Privacy Impact Assessment Modernization Application

## Project Information
![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999) [![img](https://img.shields.io/badge/Chat-on%20RocketChat-%230f95d0.svg)](https://chat.developer.gov.bc.ca/group/cirmo-dpia) [![Test Coverage](https://api.codeclimate.com/v1/badges/93a4d760a14d759fff9c/test_coverage)](https://codeclimate.com/github/bcgov/cirmo-dpia/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/93a4d760a14d759fff9c/maintainability)](https://codeclimate.com/github/bcgov/cirmo-dpia/maintainability)

## Project Structure

    .
    ├── .github                                 # Contains GitHub Related sources
    |   ├── ISSUE_TEMPLATE                      # Github Templates for bug reports and feature requests
    |   ├── helpers                             # Re-usable shell scripts used in deployment pipelines
    |   └── workflows                           # Contains Github Actions for CI/CD tasks
    ├── docs                                    # Project specific documentation ex// lo/hi fidelity wireframes etc.
    ├── openshift                               # Openshift Object Repository
    |   └── templates                           # Openshift Object Templates sub directory
    |       ├── api                             # API specific templates
    |       ├── app                             # Web App specific templates
    |       ├── network-policies                # network policies applied to all Openshift namespaces
    |       └── rolebindings                    # Rolebindings applied to all Openshift namespaces
    ├── src/                                    # Directory Containing all Project Components source code
    │   ├── backend                             # API source code, Dockerfiles
    |   |   ├── swagger                         # API Swagger Config
    |   |   ├── versions                        # version specific Express components
    |   |   |   └── v1                          # v1 specific components
    |   |   |       └── routes                  # v1 routes
    │   │   └── test                            # API unit test directory  
    │   └── frontend                            # WebApp source code
    |       ├── .vscode                         # vscode config
    |       ├── cypress                         # cyrpress testing code, config
    |       ├── public                          # Assests copied into dist upon build
    |       └── src                             # Vue project source code
    |           ├── assets                      # Store for project images, videos, fonts
    |           └── components                  # Store for project specific Vue components
    ├── .env-template                           # Template file to base local workstation .env file off of
    ├── .gitattributes                          # Simple text file that gives attributes to pathnames inside git repository
    ├── .gitignore                              # Specifies intentionally untracked files to ignore
    ├── COMPLIANCE.yaml                         # Tracks PIA and STRA status of project
    ├── CONTRIBUTING.md                         # Readme explaining how to contribute to this project
    ├── LICENSE                                 # Apache License
    ├── README.md                               # This file.    
    └── docker-compose.yaml                     # Project Specific Docker Compose file

## Project Setup

### Docker

To setup project specific docker containers, first make sure you have Docker Desktop installed on your machine. Next, run the following command.

```bash
docker compose up -d dpia-api dpia-webapp
```
This command will build the project API and Web App containers in headless mode. If you need to only run one container remove "dpia-api dpia-webapp" and replace with the name of the container you'd like to build and run. The name of all containers used within the DPIA project can be found in the docker-compose file found at the root level of this repository.

### Environment Variables

### .env File

### Project Dependencies

### Quick Start

## NPM Scripts

## Deployment

### Environments

### Github Envirnoments
