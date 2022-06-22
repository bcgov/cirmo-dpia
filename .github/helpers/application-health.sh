#!/bin/bash

# script to watch deployment of deployment config in a given namespace to ensure it is healthy and works

oc rollout status -n $NAMESPACE dc/$APPLICATION_NAME --watch
