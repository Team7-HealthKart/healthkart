#!/bin/bash
echo "Restarting app..."

# Try stopping and starting again
/scripts/stop_server.sh
/scripts/start_server.sh
if [ $? -eq 0 ]; then
    echo "App restarted successfully."
else
    echo "Failed to restart app."
fi