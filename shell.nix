{ pkgs ? import <nixpkgs> { } }:
let
  extraNodePackages = import ./default.nix { inherit pkgs; };
in
pkgs.mkShell {
  nativeBuildInputs = with pkgs; [
    bash
    nodejs_18
    extraNodePackages.tileserver-gl-light
    extraNodePackages."@maplibre/maplibre-gl-style-spec"
    extraNodePackages.mkdirp
    extraNodePackages.variable-replacer
    extraNodePackages.json
    extraNodePackages.commander
    extraNodePackages.cast-less-vars-to-json
    dhall-json
    dhall-yaml
  ];
  buildInputs = with pkgs; [
  ];
}
