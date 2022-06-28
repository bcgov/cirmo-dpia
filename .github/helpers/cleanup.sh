#!/bin/bash

# script to cleanup kubernetes objects of a previous deployment after a new deployment has occured

oc delete --namespace=$NAMESPACE $OBJECT_TYPE/$OBJECT_NAME
