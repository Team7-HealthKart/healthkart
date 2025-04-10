#!/bin/bash

# Logging to a file
LOG_FILE="/var/log/start_server.log"
echo "Starting server..." >> $LOG_FILE

# Ensure Docker is installed and running
if ! command -v docker &> /dev/null; then
  echo "Docker is not installed. Installing..." >> $LOG_FILE
  sudo yum install -y docker >> $LOG_FILE 2>&1
  sudo service docker start >> $LOG_FILE 2>&1
  sudo usermod -aG docker ec2-user >> $LOG_FILE 2>&1
fi

# Pull the latest Docker image from ECR
echo "Logging into ECR..." >> $LOG_FILE
aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 311141543335.dkr.ecr.eu-north-1.amazonaws.com >> $LOG_FILE 2>&1

# Pull the image
echo "Pulling the Docker image..." >> $LOG_FILE
docker pull 311141543335.dkr.ecr.eu-north-1.amazonaws.com/simple-docker-service-0a424f13d5cd:latest >> $LOG_FILE 2>&1

# Run the Docker container (if it's not already running)
echo "Running the Docker container..." >> $LOG_FILE
docker run -d -p 80:80 --name healthkart-app 311141543335.dkr.ecr.eu-north-1.amazonaws.com/simple-docker-service-0a424f13d5cd:latest >> $LOG_FILE 2>&1

echo "Docker container is running!" >> $LOG_FILE
