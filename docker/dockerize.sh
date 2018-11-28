#!/bin/sh
NAME=$(basename $(dirname `pwd`))

docker build \
    -t coderbunker/$NAME \
    -t coderbunker/$NAME:`date +%Y-%m-%d` \
    -f ./Dockerfile \
    ..
