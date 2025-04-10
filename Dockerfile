# Use official Node.js image as base
FROM node:latest

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port (default Node.js port is 3000)
EXPOSE 3001

# Run the application
CMD ["npm", "start"]