# Digital Privacy Impact Assessment Modernization Application

## Project Information
![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999) [![img](https://img.shields.io/badge/Chat-on%20RocketChat-%230f95d0.svg)](https://chat.developer.gov.bc.ca/group/cirmo-dpia)

## Project Structure

    .
    ├── .github                                 # Contains GitHub Related sources
    |   ├── workflows                           # Contains Github Actions for CI/CD tasks
    ├── openshift                               # Openshift Kubernetes templates
    ├── src/                                    # Directory Containing all Project Components source code
    │   ├── backend                             # API source code
    │   └── frontend                            # WebApp source code
    ├── docker-compose.yaml                     # Project Specific Docker Compose file
    ├── COMPLIANCE.yaml                         # Tracks PIA and STRA status of project
    ├── CONTRIBUTING.md                         # Readme explaining how to contribute to this project
    ├── LICENSE                                 # Apache License
    └── README.md                               # This file.
