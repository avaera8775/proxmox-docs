#!/bin/bash

set -e  

echo "Building project..."
npm run build

if git show-ref --quiet refs/heads/gh-pages; then
  git checkout gh-pages
else
  echo "Creating gh-pages branch..."
  git checkout --orphan gh-pages
fi

echo "Cleaning old files from gh-pages branch..."
git rm -rf . > /dev/null 2>&1 || true

echo "Copying built files..."
cp -r dist/* .

git add .

git commit -m "Deploy updated site" || echo "No changes to commit."

echo "Pushing to gh-pages branch..."
git push origin gh-pages

git checkout master

echo "Deployment complete!"
