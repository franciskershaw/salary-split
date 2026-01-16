#!/bin/bash

# Exit 1 = Build
# Exit 0 = Don't build

echo "Current directory: $(pwd)"
echo "Checking for changes in frontend or shared packages..."

# Check if we can access git history
if ! git rev-parse HEAD^ >/dev/null 2>&1; then
  echo "⚠️ Cannot access previous commit, building to be safe"
  exit 1
fi

# Get changed files (use absolute paths from repo root)
CHANGED_FILES=$(git diff --name-only HEAD^ HEAD 2>/dev/null)

if [ $? -ne 0 ]; then
  echo "⚠️ Git diff failed, building to be safe"
  exit 1
fi

echo "Changed files:"
echo "$CHANGED_FILES"

# Check if any frontend or shared files changed
# Use patterns that work from any directory in the monorepo
if echo "$CHANGED_FILES" | grep -qE '(^apps/frontend/|^packages/shared/)'; then
  echo "✅ Frontend or shared changes detected - BUILDING"
  exit 1
else
  echo "🚫 No frontend or shared changes detected - SKIPPING BUILD"
  exit 0
fi