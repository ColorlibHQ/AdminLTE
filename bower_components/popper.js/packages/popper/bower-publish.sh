#!/bin/sh

# Get version from package.json
version="$(cat package.json | jq -r '.version')"

# Bower doesn't support Lerna multi-packages, we sacrificy flexibity
# making Bower use the whole repository just for the Popper.js release
cp -R dist ../../dist
cp bower.json ../../bower.json
git add -f ../../dist/*
git add ../../bower.json
git add package.json # In case we directly bump version during publish

# Commit the dist files
git commit --no-verify -m "chore(automatic): v${version} (dist files)"
# Create a tag which will reference the previous commit containing dist files
git tag -a v${version} -m "chore(automatic): v${version} (tag release)"

# Delete dist files and the copied `bower.json` root file
git rm ../../dist/**/*
git rm ../../dist/*
git rm ../../bower.json

# Create a git commit to get rid of the dist files from the repository
# they will still be accessible referencing the just created tag
git commit --no-verify -m "chore(automatic): v${version} (dist files cleanup)"
