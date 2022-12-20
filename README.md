# Digital Privacy Impact Assessment Modernization Application

## Project Information
![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999) [![img](https://img.shields.io/badge/Chat-on%20RocketChat-%230f95d0.svg)](https://chat.developer.gov.bc.ca/group/cirmo-dpia) [![Maintainability](https://api.codeclimate.com/v1/badges/93a4d760a14d759fff9c/maintainability)](https://codeclimate.com/github/bcgov/cirmo-dpia/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/93a4d760a14d759fff9c/test_coverage)](https://codeclimate.com/github/bcgov/cirmo-dpia/test_coverage)

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

## Project Setup -> Quick Start

### Environment Variables -> The .env File

Before getting building or starting any project components on your local development machine, create a ```.env``` file at the root level of this project.
This file should contain the contents of the .env-template also found at the root level of this project. Please take the time to read the following table
and assign values to the environment variables listed in order to configure and run the project components on your local development machine.

| Environment Variable      | Description                                   | Value                                                 |
|---------------------------|-----------------------------------------------|-------------------------------------------------------|
| API_PORT                  | Local port that serves API requests           | 3000 or 300X                                          |
| API_VERSION               | Version of the API being served               | v1                                                    |
| API_IP_ADDRESS            | Configurable value to host API                | localhost or 127.0.0.X                                |

### Environment Variables -> Additions or Changes

If you're contributing to this project via Pull Request (PR), and your code contains additions or changes to environment variables that are required to
run this project on other local machines or in the project Openshift Environment, please make sure that your changes are captured in the ```.env-template```
file as well as the table found above in the project README.md.

### Docker and Docker Compose

To setup project specific docker containers, first make sure you have Docker Desktop installed on your machine. Next, run the following command.

```bash
docker compose up -d dpia-api dpia-app
```
This command will build the project API and Web App containers in headless mode. If you need to only run one container remove "dpia-api dpia-webapp" and replace with
the name of the container you'd like to build and run. The name of all containers used within the DPIA project can be found in the docker-compose file found at the
root level of this repository.

### Project Dependencies

To be filled out at a later date once the Project Stack starts to take shape. 

## NPM Scripts

| Component                 | Script                                        | Use case description                                  |
|---------------------------|-----------------------------------------------|-------------------------------------------------------|
| API                       | start                                         |                                                       |
| API                       | dev                                           |                                                       |
| API                       | test                                          |                                                       |
| API                       | test-with-coverage                            |                                                       |
| Web App                   | dev                                           |                                                       |
| Web App                   | build                                         |                                                       |
| Web App                   | preview                                       |                                                       |
| Web App                   | test:e2e                                      |                                                       |
| Web App                   | test:e2e:ci                                   |                                                       |
| Web App                   | test:unit                                     |                                                       |
| Web App                   | test:unit:ci                                  |                                                       |
| Web App                   | lint                                          |                                                       |

## Prerequisites

- Docker
- Docker compose

## Locally running the development app
```bash
$ make api-setup-env
$ make app-run
```

## Deployment

### Environments
- local
- development
- staging
- production

### Github Environments
