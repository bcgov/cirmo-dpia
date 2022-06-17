# Digital Privacy Impact Assessment Modernization Application

## Project Information
![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999) [![img](https://img.shields.io/badge/Chat-on%20RocketChat-%230f95d0.svg)](https://chat.developer.gov.bc.ca/group/cirmo-dpia)

## Project Structure

    .
    ├── .github                                 # Contains GitHub Related sources
    |   ├── workflows                           # Contains Github Actions for CI/CD tasks
    ├── docs                                    # Project specific documentation ex// lo/hi fidelity wireframes etc.
    ├── openshift                               # Openshift Object Repository
    |   ├── templates                           # Openshift Object Templates sub directory
    ├── src/                                    # Directory Containing all Project Components source code
    │   ├── backend                             # API source code
    │   └── frontend                            # WebApp source code
    ├── .env-template                           # Template file to base local workstation .env file off of
    ├── .gitattributes                          # Simple text file that gives attributes to pathnames inside git repository
    ├── .gitignore                              # Specifies intentionally untracked files to ignore
    ├── CONTRIBUTING.md                         # Readme explaining how to contribute to this project
    ├── COMPLIANCE.yaml                         # Tracks PIA and STRA status of project
    ├── LICENSE                                 # Apache License
    ├── README.md                               # This file.    
    └── docker-compose.yaml                     # Project Specific Docker Compose file
