#!/bin/bash

# Ask user for commit message
read -p "Enter commit message: " message

# Check if message is empty
if [ -z "$message" ]; then
  echo "❌ Commit message cannot be empty"
  exit 1
fi

# Add, commit, push
git add .
git commit -m "$message"
git push origin main

echo "✅ Code pushed successfully!"
