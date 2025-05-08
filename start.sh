#!/bin/bash

# Start PocketBase in the background
cd be
./start.sh &
PB_PID=$!

# Wait a moment for PocketBase to start
sleep 2

# Start Next.js frontend
cd ../fe
npm run dev &
FE_PID=$!

# Function to handle script termination
function cleanup {
  echo "Shutting down services..."
  kill $PB_PID
  kill $FE_PID
  exit
}

# Trap SIGINT (Ctrl+C) and call cleanup
trap cleanup SIGINT

# Keep the script running
echo "SimulEx is running!"
echo "PocketBase: http://localhost:8090"
echo "Frontend: http://localhost:3000"
echo "Press Ctrl+C to stop all services"

# Wait for both processes to finish
wait $PB_PID $FE_PID
