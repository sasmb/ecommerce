#!/bin/bash

echo "Stopping any running Next.js processes..."
pkill -f "node.*next"

echo "Clearing Next.js build cache..."
rm -rf .next
rm -rf node_modules/.cache

echo "Rebuilding the application..."
npm run build

echo "Starting the development server..."
npm run dev 