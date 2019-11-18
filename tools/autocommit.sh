#!/bin/bash

cd "$(dirname "${BASH_SOURCE[0]}")/.."

git fetch --tags origin master
git reset --hard origin/master
npm i
npx grunt generate

if [[ $(git status --porcelain) ]]; then
  npm t || exit 1
  git commit -am "automated regeneration"
  npx grunt patch
  git push --tags origin master
fi
