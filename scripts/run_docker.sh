#!/bin/bash

# Ensure Docker is installed
if ! command -v docker &> /dev/null; then
  echo "Docker is not installed. Installing..."
  sudo yum install -y docker
  sudo service docker start
  sudo usermod -aG docker ec2-user
fi

# Pull the latest Docker image from ECR
echo "Logging into ECR..."
aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 311141543335.dkr.ecr.eu-north-1.amazonaws.com

# Pull the image
echo "Pulling the Docker image..."
docker pull 311141543335.dkr.ecr.eu-north-1.amazonaws.com/simple-docker-service-0a424f13d5cd:latest

# Run the Docker container (if it's not already running)
echo "Running the Docker container..."
docker run -d -p 80:8080 --name healthkart-app 311141543335.dkr.ecr.eu-north-1.amazonaws.com/simple-docker-service-0a424f13d5cd:latest

echo "Docker container is running!"
