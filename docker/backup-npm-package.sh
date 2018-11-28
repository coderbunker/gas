#!/bin/bash
NAME=$(basename $(dirname `pwd`))

CONTAINER=`docker ps -q --filter="name=$NAME"`
if test -z "$CONTAINER"; then echo "no container found"; exit 1; fi
docker cp $CONTAINER:/usr/src/app/package.json ..
docker cp $CONTAINER:/usr/src/app/package-lock.json ..
