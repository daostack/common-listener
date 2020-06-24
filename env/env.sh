#!/bin/bash

CURRENTDIR=`pwd`
DIRNAME=`dirname "$0"`

stagingENV="$CURRENTDIR/$DIRNAME/staging/env.json"
productionENV="$CURRENTDIR/$DIRNAME/production/env.json"
currentENV="$CURRENTDIR/$DIRNAME/env.json"

if [[ $1 == "-stg" ]]; then
  echo "Switching staging environment ..."
  cp -f "$stagingENV" "$currentENV"
  echo "Configuration changed"
  exit
fi

if [[ $1 = "-prod" ]]; then
  echo "Switching production environment ..."
  cp -f "$productionENV" "$currentENV"
  echo "Configuration changed"
  exit
fi

currentMD5=`md5sum $currentENV | awk '{ print $1 }'`
stagingMD5=`md5sum $stagingENV | awk '{ print $1 }'`
productionMD5=`md5sum $productionENV | awk '{ print $1 }'`

if [ "$currentMD5" = "$stagingMD5" ]; then
  echo "Current environment is staging"
elif [ "$currentMD5" = "$productionMD5" ]; then
  echo "Current environment is production"
else
   echo "Environment not match"
fi
exit