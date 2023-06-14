#!/bin/bash

echo "Building image"
docker build -t code4u-server:1.0 .

echo -e "\nStarting container"
docker kill code4u-server >/dev/null 2>&1
docker rm code4u-server >/dev/null 2>&1
docker run -d -p 9050:8000 --restart unless-stopped --name server code4u-server:1.0 
