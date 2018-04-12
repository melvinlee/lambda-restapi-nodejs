#!/bin/bash

# nodejs test: test all file in src folder

src=$(find src -type f)

for file in $src
do
  if [[ -f $file ]]; then 
  	echo "Running js test: ${file}"
  	node $file
  fi
done

exit 0
