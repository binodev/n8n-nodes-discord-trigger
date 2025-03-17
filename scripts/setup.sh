#!/bin/bash

# Setup script for n8n-nodes-discord-trigger

echo "Setting up n8n-nodes-discord-trigger..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Create necessary directories if they don't exist
mkdir -p dist/nodes/DiscordTrigger
mkdir -p dist/credentials

# Build the project
echo "Building the project..."
npm run build

echo "Setup complete! You can now use the Discord Trigger node in n8n."
echo ""
echo "To publish the package to npm, run:"
echo "npm publish"
echo ""
echo "To test locally, run:"
echo "npm link"
echo "cd /path/to/n8n"
echo "npm link n8n-nodes-discord-trigger"
echo ""
echo "For more information, see the README.md file." 