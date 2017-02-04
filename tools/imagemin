#/bin/bash

shopt -s globstar
shopt -s nocaseglob

repo="$(cd "$(dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd)"

err=false
if ! hash pngcrush 2>/dev/null; then
  echo "pngcrush not found. Install it through: npm i -g pngcrush-bin"
  err=true
fi
if ! hash zopflipng 2>/dev/null; then
  echo "zopflipng not found. Install it through: npm i -g zopflipng-bin"
  err=true
fi
if ! hash svgo 2>/dev/null; then
  echo "svgo not found. Install it through: npm i -g svgo"
  err=true
fi

if "$err"; then
  exit 1
fi

# optimize PNGs
for f in $repo/**/*.png; do
  f=$(realpath --relative-to=$PWD "$f")
  pngcrush -reduce -brute -ow "$f"
done
for f in $repo/**/*.png; do
  f=$(realpath --relative-to=$PWD "$f")
  zopflipng -y -m --splitting=3 "$f" "$f"
done

# optimize SVGs
for f in $repo/**/*.svg; do
  f=$(realpath --relative-to=$PWD "$f")
  svgo --multipass -i "$f" -o "$f"
done
