#!/bin/bash
echo "Stopping any running Node.js application..."

# Gracefully stop Node.js (using pm2 if installed, otherwise kill node processes)
if command -v pm2 &> /dev/null; then
    pm2 stop all || echo "No PM2 apps running"
else
    pkill node || echo "No Node.js processes found"
fi
