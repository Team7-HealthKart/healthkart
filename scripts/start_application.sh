#!/bin/bash
# This script builds and starts the Docker container with your app
cd /home/ec2-user/app
docker build -t node-app .
docker run -d -p 3001:3001 --name node-app node-app