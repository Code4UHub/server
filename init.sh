#!/bin/bash

docker run -d -p 8000:65535 --restart unless-stopped --name server code4u-server:1.0 
