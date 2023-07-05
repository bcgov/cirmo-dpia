#!/bin/bash

# script used to trigger tekton event listener and supply task with required
# information required to deploy specific service into a specific environment

curl --location --request POST $TEKTON_ROUTE --header 'Content-Type: application/json' --data-raw '{"environment": $ENVIRONMENT, "application": $APPLICATION, "image": $IMAGE, "templateURL": $TEMPLATE_URL}'
