{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    texliveFull  # TeX Live for LaTeX documents
    # Add any additional dependencies here
  ];

  shellHook = ''
    echo "Welcome to your project development shell!"
    echo "TeX Live is available."
  '';
}
