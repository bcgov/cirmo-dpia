#!/bin/bash

# script used to auto increment major, minor or patch version of a github repository tag
#
# ARGUMENTS:    -M -> increments the major version +1
#               -m -> increments the minor version +1
#               -p -> increments the patch version +1
#
# USE: ./increment-tag.sh -[ARGUMENT]

# Setup Git Config
git config --global user.email $EMAIL
git config --global user.name $NAME

# Retrieve latest tag from github remote repo
LATEST_TAG=$TAG
#echo "CIRMO DPIA Latest Tag: ${LATEST_TAG}"
# Trim v char from tag
LATEST_TAG="${LATEST_TAG:1}"
#echo "Trimmed: ${LATEST_TAG}"

# Split tag at '.' char and assign major, minor, patch values
IFS='.' read -a vers <<< "${LATEST_TAG}"
MAJOR=${vers[0]}
MINOR=${vers[1]}
PATCH=${vers[2]}

# diff
while getopts "Mmp" flag; do
    case ${flag} in
        M)
            # Increment Major version, reset minor and patch to zero
            echo "Incrementing major version +1" 
            ((MAJOR+=1))
            MINOR=0
            PATCH=0
            ;;
        m) 
            # Increment minor version, reset patch to zero
            echo "Incrementing minor version +1"
            ((MINOR+=1))
            PATCH=0
            ;;
        p) 
            # Increment patch version
            echo "Incrementing patch version +1"
            ((PATCH+=1))
            ;;
    esac
done

# Set Newest Tag
NEWEST_TAG="v${MAJOR}.${MINOR}.${PATCH}"

# Tag Repository with new version
# TODO add message to tag
git tag -a ${NEWEST_TAG} -m ''

# TODO push git tag to repo
git push origin ${NEWEST_TAG}
