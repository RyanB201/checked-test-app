#!/bin/bash
# Auto-push script: watches for file changes and auto-commits/pushes to GitHub
# Usage: ./auto-push.sh (run from the project root)
# To stop: press Ctrl+C

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
DEBOUNCE_SECONDS=30
BRANCH="main"

echo "🔄 Auto-push watcher started for: $REPO_DIR"
echo "📌 Branch: $BRANCH"
echo "⏱  Debounce: ${DEBOUNCE_SECONDS}s (waits for changes to settle)"
echo "🛑 Press Ctrl+C to stop"
echo ""

cd "$REPO_DIR" || exit 1

fswatch -o \
  --exclude '\.git/' \
  --exclude 'node_modules/' \
  --exclude '\.DS_Store' \
  --exclude 'auto-push\.sh' \
  --latency "$DEBOUNCE_SECONDS" \
  "$REPO_DIR/src" \
  "$REPO_DIR/public" \
  "$REPO_DIR/index.html" \
  "$REPO_DIR/package.json" \
  "$REPO_DIR/.gitignore" \
  "$REPO_DIR/.env.example" \
| while read -r count; do
  # Check if there are actually changes
  if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
    echo "$(date '+%H:%M:%S') — No changes detected, skipping."
    continue
  fi

  echo "$(date '+%H:%M:%S') — Changes detected, pushing..."
  git add -A
  TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
  git commit -m "Auto-update: $TIMESTAMP"
  
  if git push origin "$BRANCH" 2>&1; then
    echo "$(date '+%H:%M:%S') — ✅ Pushed successfully!"
  else
    echo "$(date '+%H:%M:%S') — ❌ Push failed. Will retry on next change."
  fi
  echo ""
done
