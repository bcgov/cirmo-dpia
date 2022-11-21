#!/bin/bash

# script to process either the DPIA app or api deployment config templates and deploy it to a given namespace

objects=( $DC_TEMPLATE $SERVICE_TEMPLATE $ROUTE_TEMPLATE )

for i in "${objects[@]}"
do
    oc process -f /home/runner/work/cirmo-dpia/cirmo-dpia/openshift/templates/$DIR/"$i" --namespace=$NAMESPACE \
        -p APPLICATION_NAME=$APPLICATION_NAME \
        -p LICENSE_PLATE=$LICENSE_PLATE \
        -p IMAGESTREAM=$IMAGESTREAM
        -p ENVIRONMENT=$ENVIRONMENT | \
        oc apply -f -
done
