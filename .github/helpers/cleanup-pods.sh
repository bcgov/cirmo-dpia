#!/bin/bash

# script to cleanup deployment pod objects of a previous deployment after a new deployment has occured

oc delete pod --namespace=$NAMESPACE --field-selector status.phase=Succeeded

