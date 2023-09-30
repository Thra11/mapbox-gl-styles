#!/bin/sh
nix shell github:NixOS/nixpkgs/nixos-23.11\#node2nix --command node2nix --nodejs-18 -i node-packages.json
