# Digital Privacy Impact Assessment Modernization Application

## Project Information
![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999) [![img](https://img.shields.io/badge/Chat-on%20RocketChat-%230f95d0.svg)](https://chat.developer.gov.bc.ca/group/cirmo-dpia) [![Maintainability](https://api.codeclimate.com/v1/badges/93a4d760a14d759fff9c/maintainability)](https://codeclimate.com/github/bcgov/cirmo-dpia/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/93a4d760a14d759fff9c/test_coverage)](https://codeclimate.com/github/bcgov/cirmo-dpia/test_coverage)

## Project Structure

This structure diagram show all directories and specific files of interest. It does not capture ALL files present in the architecture of this project.

    .
    ├── .github                                 # Contains GitHub Actions Related sources
    |   ├── ISSUE_TEMPLATE                      # Github Templates for bug reports and feature requests
    |   ├── helpers                             # Re-usable shell scripts used in deployment pipelines
    |   ├── workflows                           # Contains Github Actions for CI/CD tasks
    |   |   ├── build-deploy-api-v2.yaml        # Github Action run on merge to main that builds, tags, pushes and deploys the API image to the DEV openshift namespace
    |   |   ├── build-deploy-app-v2.yaml        # Github Action run on merge to main that builds, tags, pushes and deploys the React App image to the DEV openshift namespace
    |   |   ├── tag-deploy-*-test.yaml          # Github Action to tag and deploy the latest API/React App images to the TEST openshift namespace
    |   |   ├── tag-deploy-*-prod.yaml          # Github Action to tag and deploy the latest API/React App images to the PROD openshift namespace
    |   |   ├── pilot-build-tag-deploy-*.yaml   # Github Action to build, tag, push and deploy API/React App images to separate deployment configs in DEV (pipeline changes action)
    |   |   ├── *-lint.yaml                     # Github Actions run on pull request open to run linting against either the API or React App source code
    |   |   ├── code-climate.yaml               # Github Action that creates, formats and uploads API test coverage score to code climate for reporting
    |   |   └── zap-*-scan.yaml                 # Github Actions for the API and React App to run zap scans against 
    |   ├── PULL_REQUEST_TEMPLATE.md            # Template to be filled out each time a branch is compared to main in a pull request
    |   ├── auto-action-config.yaml             # yaml file that will tag reviewers and assignees of pull requests opened against main branch
    |   ├── dependabot.yaml                     # file that controls dependabot coverage scans
    |   ├── labeler.yaml                        # yaml file that controls tags applied to pull requests based on where code diff lives  
    |   └── README.md                           # Github Actions and Environments specific Documentation 
    ├── .husky                                  #
    |    └── pre-commit                         # shell script run before a branch can be pushed up to remote repository for pre-linting  
    ├── openshift                               # Openshift Object Repository
    |   ├── backup                              # Directory containing k8s artifacts and documentation related to deploying postgres backup containers to DEV/TEST/PROD
    |   |   ├── README.md                       #
    |   |   ├── backup-build.yaml               #
    |   |   ├── backup-deploy.yaml              #
    |   |   └── backup.conf                     #
    |   └── templates                           # Directory container k8s artifacts related to CD process into openshift namespaces
    |       ├── api                             # 
    |       ├── app                             # 
    |       ├── network-policies                # 
    |       └── rolebindings                    # 
    ├── src                                     # Project Source Code Components
    │   ├── backend                             # All API related source code
    |   |   ├── .config                         #
    |   |   ├── .docker                         #
    |   |   ├── src                             #
    |   |   |   ├── assets                      #
    |   |   |   ├── common                      #
    |   |   |   ├── config                      #
    |   |   |   ├── health                      #
    |   |   |   ├── migrations                  #
    |   |   |   └── modules                     #
    │   └── frontend                            # All React App related source code
    |       ├── .config                         #
    |       ├── .docker                         #
    |       ├── cypress                         #
    |       ├── public                          #
    |       └── src                             #
    |           ├── assets                      #
    |           ├── components                  #
    |           ├── constant                    #
    |           ├── hooks                       #
    |           ├── pages                       #
    |           ├── routes                      #
    |           ├── sass                        #
    |           ├── types                       #
    |           └── utils                       #
    ├── .codeclimate.yaml                       # yaml file that controls thresholds for project specific reporting criteria
    ├── .gitattributes                          # file that controls attributes given to specific pathnames
    ├── .gitignore                              # list of files that are omitted from commits to this repository
    ├── MAKEFILE                                # Project specific tasks run to simplify running/accessing project resources
    ├── README.md                               # You're reading me right now!
    ├── docker-compose.local.yaml               # docker-compose file used specifically for local workstation development
    ├── docker-compose.yaml                     # docker-compose file used specifically for CI/CD purposes
    └── docker-entrypoint.sh                    # shell script run to make changes to docker containers on startup

## Locally running the development app
```bash
$ make api-setup-env
$ make app-run
```

### Docker and Docker Compose

To setup project specific docker containers, first make sure you have Docker Desktop installed on your machine. Next, run the following command.

```bash
docker compose up -d [SPACE SEPARATED LIST OF CONTAINERS]
```
This command will build the project API and Web App containers in headless mode. If you need to only run one container remove "dpia-api dpia-webapp" and replace with
the name of the container you'd like to build and run. The name of all containers used within the DPIA project can be found in the docker-compose file found at the
root level of this repository.

### Environments
- local (developers local workstation of choice)
- Development (DEV)
    [API](https://dev.pia.gov.bc.ca/api/api-docs)
    [Frontend](https://dev.pia.gov.bc.ca/)
- Test (TEST)
    [API](https://test.pia.gov.bc.ca/api/api-docs)
    [Frontend](https://test.pia.gov.bc.ca/)
- Production (PROD)
    [API](https://pia.gov.bc.ca/api/api-docs)
    [Frontend](https://pia.gov.bc.ca/)

### Provisioning Requests

If you'd like to be provisioned access to one of the following resources:

- DPIA Openshift Namespaces
- Github Collaborators Write or Admin Groups
- DPIA SSO Portal

Please email your request to adam.kroon@gov.bc.ca
