{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    texliveFull  # TeX Live for LaTeX documents
    d2 # For the diagrams
    nodejs_22
    jdk22
    maven
    postgresql
    docker
    # Add any additional dependencies here
  ];

  shellHook = ''
    echo "Welcome to the Hawk-tu development shell!"
    echo "TeX Live is available."
    echo "D2 Diagramming is available."
  '';
}
