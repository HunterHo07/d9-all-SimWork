#!/bin/bash

# Check if PocketBase executable exists
if [ ! -f "pocketbase" ]; then
    echo "PocketBase executable not found. Downloading..."
    
    # Detect OS and architecture
    OS=$(uname -s | tr '[:upper:]' '[:lower:]')
    ARCH=$(uname -m)
    
    # Map architecture to PocketBase naming
    if [ "$ARCH" == "x86_64" ]; then
        ARCH="amd64"
    elif [ "$ARCH" == "aarch64" ] || [ "$ARCH" == "arm64" ]; then
        ARCH="arm64"
    fi
    
    # Set download URL based on OS and architecture
    if [ "$OS" == "darwin" ]; then
        # macOS
        URL="https://github.com/pocketbase/pocketbase/releases/download/v0.19.4/pocketbase_0.19.4_darwin_${ARCH}.zip"
    elif [ "$OS" == "linux" ]; then
        # Linux
        URL="https://github.com/pocketbase/pocketbase/releases/download/v0.19.4/pocketbase_0.19.4_linux_${ARCH}.zip"
    elif [[ "$OS" == *"mingw"* ]] || [[ "$OS" == *"msys"* ]] || [[ "$OS" == *"cygwin"* ]]; then
        # Windows
        URL="https://github.com/pocketbase/pocketbase/releases/download/v0.19.4/pocketbase_0.19.4_windows_amd64.zip"
    else
        echo "Unsupported operating system: $OS"
        exit 1
    fi
    
    # Download and extract PocketBase
    echo "Downloading PocketBase from $URL..."
    curl -L "$URL" -o pocketbase.zip
    unzip pocketbase.zip
    rm pocketbase.zip
    
    # Make executable
    chmod +x pocketbase
    
    echo "PocketBase downloaded successfully."
fi

# Start PocketBase
echo "Starting PocketBase server..."
./pocketbase serve
