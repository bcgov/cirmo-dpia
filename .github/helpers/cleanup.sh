#!/bin/bash

# script to cleanup kubernetes objects of a previous deployment after a new deployment has occured

objects=( dc service route )

for i in "${objects[@]}"
do
    oc delete --namespace=$NAMESPACE "$i"/$OBJECT_NAME
done
