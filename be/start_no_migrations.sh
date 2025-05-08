#!/bin/bash

echo "Starting PocketBase server without migrations..."

# Check if PocketBase executable exists
if [ ! -f "./pocketbase" ]; then
    echo "PocketBase executable not found. Downloading..."
    
    # Detect OS
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        wget https://github.com/pocketbase/pocketbase/releases/download/v0.22.4/pocketbase_0.22.4_linux_amd64.zip
        unzip pocketbase_0.22.4_linux_amd64.zip
        rm pocketbase_0.22.4_linux_amd64.zip
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        wget https://github.com/pocketbase/pocketbase/releases/download/v0.22.4/pocketbase_0.22.4_darwin_amd64.zip
        unzip pocketbase_0.22.4_darwin_amd64.zip
        rm pocketbase_0.22.4_darwin_amd64.zip
    elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
        # Windows
        wget https://github.com/pocketbase/pocketbase/releases/download/v0.22.4/pocketbase_0.22.4_windows_amd64.zip
        unzip pocketbase_0.22.4_windows_amd64.zip
        rm pocketbase_0.22.4_windows_amd64.zip
    else
        echo "Unsupported OS. Please download PocketBase manually."
        exit 1
    fi
fi

# Start PocketBase with migrations disabled
./pocketbase serve --http="0.0.0.0:8090" --dir="./pb_data" --migrationsDir="" --publicDir="./pb_public"
