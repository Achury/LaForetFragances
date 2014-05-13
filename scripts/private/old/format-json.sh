#!/bin/bash

#####
# Helper script for pretty formatting of json files
#####

for file in `ls -a app/lotions | grep -v \\\.\$`; do
  cat app/lotions/$file | python -mjson.tool > tmp.json
  rm app/lotions/$file
  mv tmp.json app/lotions/$file
done
