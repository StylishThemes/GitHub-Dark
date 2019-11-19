#/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
    echo "Usage: $(basename $0) FILE .. FILE"
    exit 1
fi

nodeps=false
if ! hash pngcrush 2>/dev/null; then nodeps=true; fi
if ! hash zopflipng 2>/dev/null; then nodeps=true; fi
if ! hash svgo 2>/dev/null; then nodeps=true; fi
if "$nodeps"; then
  echo "Missing dependencies. Install through: npm install -g pngcrush-bin zopflipng-bin svgo"
fi

for f in $@;do
  f=$(realpath --relative-to=$PWD "$f")
  if echo "$f" | egrep -iq ".png$"; then
    pngcrush -reduce -brute -ow "$f"
    zopflipng -y -m --splitting=3 "$f" "$f"
  elif echo "$@" | egrep -iq ".svg$"; then
    svgo --multipass -i "$f" -o "$f"
  fi
done
