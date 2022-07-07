#!/bin/bash

# script to watch deployment of deployment config in a given namespace to ensure it is healthy and works

if [ -z "$IMAGE_TAG" ]
then
    oc rollout status -n $NAMESPACE dc/$APPLICATION_NAME --watch
else
    oc rollout status -n $NAMESPACE dc/$APPLICATION_NAME-$IMAGE_TAG --watch
fi
