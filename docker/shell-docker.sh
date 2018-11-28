#!/bin/bash
NAME=$(basename $(dirname `pwd`))

CONTAINER=`docker ps -q --filter="name=$NAME"`
if test -z "$CONTAINER"; then echo "no container found"; exit 1; fi
docker exec -it $CONTAINER /bin/sh
