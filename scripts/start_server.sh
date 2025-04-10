#!/bin/bash
echo "Starting Node.js app..."

cd /var/www/healthkart || exit 1

# Use pm2 if available, fallback to nohup + node
if command -v pm2 &> /dev/null; then
    pm2 start app.js --name "healthkart"
else
    nohup node app.js > /dev/null 2>&1 &
fi
