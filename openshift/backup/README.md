# Digital Privacy Impact Assessment Postgres Container Backup

## Warning 
Steps have been modified from [The BC DevOps Backup Container Repository](https://github.com/BCDevOps/backup-container#example-deployments).
This documentation is out of date, and the following steps have been modified to reflect the changes that were made to get this service
running in Openshift environments.


## Creating Backup Build and Imagestream

Run the following command from the root level of this repository:

```bash
oc -n [PROJECT_LICENSE_PLATE]-tools process -f ./openshift/templates/backup/backup-build.yaml -p NAME=[NAME_OF_BACKUP_CONTAINER] OUTPUT_IMAGE_TAG=v1 | oc -n [PROJECT_LICENSE_PLATE]-tools create -f -
```
| Replace Value             | Description                                                     | Current Value        |
|---------------------------|-----------------------------------------------------------------|----------------------|
| [PROJECT_LICENSE_PLATE]   | Replace with the 6 character hash for you Openshift Namespaces  | b996e6               |
| [NAME_OF_BACKUP_CONTAINER]| The name of your backup container going forward                 | dpia-postgres-backup |


## Creating Configuration for Backup Cron Schedule

Based up the following [example](https://github.com/BCDevOps/backup-container/blob/master/config/backup.conf), and what is currently found in the backup.conf file found in this directory, run the following commands from root level of this repository to create and label a configmap object:

```bash
oc -n b996e6-dev create configmap [CONFIG_MAP_NAME] --from-file=./config/backup.conf
```

```bash
oc -n b996e6-dev label configmap [CONFIG_MAP_NAME] app=dpia-postgres-backup
```

| Replace Value             | Description                                                     | Current Value        |
|---------------------------|-----------------------------------------------------------------|----------------------|
| [CONFIG_MAP_NAME]         | Replace with the name of the configmap object                   | backup-config   |

## Creating Backup Container with PVCs

### Warning

the ENVIRONMENT_NAME environment variable had to be added to the command below based upon an error message via CLI after running the suggested command from the source repository.


Run the following command from the root level of this repository to create the postgres database backup container in your given environment/namespace.

```bash
oc -n [PROJECT_LICENSE_PLATE]-dev process -f ./openshift/templates/backup/backup-deploy.yaml \
    -p NAME=[NAME_OF_BACKUP_CONTAINER] \
    -p IMAGE_NAMESPACE=[PROJECT_LICENSE_PLATE]-tools \
    -p SOURCE_IMAGE_NAME=[NAME_OF_BACKUP_CONTAINER] \
    -p TAG_NAME=v1 \
    -p BACKUP_VOLUME_NAME=dpia-postgres-backup-pvc \
    -p BACKUP_VOLUME_SIZE=256Mi 
    -p VERIFICATION_VOLUME_SIZE=256Mi \
    -p ENVIRONMENT_FRIENDLY_NAME='DPIA Database Backup' \
    -p ENVIRONMENT_NAME=[PROJECT_LICENSE_PLATE] | \
     oc -n b996e6-dev create -f -
```

| Replace Value             | Description                                                     | Current Value        |
|---------------------------|-----------------------------------------------------------------|----------------------|
| [PROJECT_LICENSE_PLATE]   | Replace with the 6 character hash for you Openshift Namespaces  | b996e6               |
| [NAME_OF_BACKUP_CONTAINER]| The name of your backup container going forward                 | dpia-postgres-backup |


## Project Cleanup

Run the following command from CLI to remove containers/pvcs/configmaps/secrets generated through this process:

```bash
oc -n [PROJECT_LICENSE_PLATE]-dev delete pvc/[NAME_OF_BACKUP_CONTAINER]-pvc pvc/backup-verification secret/[NAME_OF_BACKUP_CONTAINER] secret/ftp-secret dc/[NAME_OF_BACKUP_CONTAINER]
```
| Replace Value             | Description                                                     | Current Value        |
|---------------------------|-----------------------------------------------------------------|----------------------|
| [PROJECT_LICENSE_PLATE]   | Replace with the 6 character hash for you Openshift Namespaces  | b996e6               |
| [NAME_OF_BACKUP_CONTAINER]| The name of your backup container going forward                 | dpia-postgres-backup |
