#!/bin/bash

# script to cleanup replication controller objects of a previous deployment after a new deployment has occured

oc delete rc --namespace=$NAMESPACE --field-selector status.replicas=0

