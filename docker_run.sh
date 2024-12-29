#!/bin/bash

docker build -t dayfinder .
docker run -p 3000:3000 -d dayfinder
