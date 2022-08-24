#!/bin/bash

# script to tag a target imagestream and promote target to either a test or prod tag

oc tag -n $TOOLS_NAMESPACE $DPIA_COMPONENT:$HASH_SRC $DPIA_COMPONENT:$HASH_DEST
