#!/bin/bash
# This script will install Docker on the EC2 instance
sudo yum update -y
sudo yum install -y docker
sudo service docker start
sudo usermod -a -G docker ec2-user  # Add ec2-user to docker group to run Docker without sudo
cd /home/ec2-user/app
sudo npm install express