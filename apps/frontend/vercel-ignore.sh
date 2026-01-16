#!/bin/bash

# Exit 1 = Build
# Exit 0 = Don't build

# Get changed files between HEAD and previous commit
if git diff --quiet HEAD^ HEAD -- ../frontend ../../packages/shared; then
  # No changes in frontend or shared
  echo "🚫 No frontend or shared changes detected"
  exit 0
else
  # Changes detected in frontend or shared
  echo "✅ Frontend or shared changes detected"
  exit 1
fi