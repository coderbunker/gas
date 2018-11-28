#!/bin/sh
NAME=$(basename $(dirname `pwd`))
docker push coderbunker/$NAME
