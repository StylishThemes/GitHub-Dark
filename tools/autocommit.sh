#!/bin/bash

cd "$(dirname "${BASH_SOURCE[0]}")/.."

git fetch --tags origin master
git reset --hard origin/master
npm install
npm run generate

if [[ $(git status --porcelain) ]]; then
  npm test || exit 1
  git commit -am "automated regeneration"
  npm run patch
  git push --tags origin master
fi
