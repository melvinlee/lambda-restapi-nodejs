#!/bin/bash

set -e
set -o pipefail

instruction()
{
    echo "usage: ./build.sh deploy <env>"
    echo 
    echo "env: eg. dev, staging, prod, ..."
    echo 
    echo "for example: ./bulid.sh dev"
}

if [ $# -eq 0 ]; then
    instruction
    exit 1
elif [ "$1" = "deploy" ] && [ $# -eq 2 ]; then
    STAGE=$2

    echo "Installing dependencies ..."
    npm install
    echo
    echo "Deploying to env: $STAGE..."
    sls deploy --stage $STAGE 
    echo
else
    instruction
    exit 1
fi
