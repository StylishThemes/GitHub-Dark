#!/usr/bin/env bash

git log --use-mailmap --format=" %aN <%aE>" | sort -uf > ../AUTHORS