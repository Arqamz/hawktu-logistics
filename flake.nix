{
  description = "Dev shell for Hawk-TU";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs, ...}: let
    pkgs = nixpkgs.legacyPackages."x86_64-linux";
  in {
    devShells.x86_64-linux.default = pkgs.mkShell {
      packages = with pkgs; [
        texliveFull  # Full TeX Live distribution for LaTeX typesetting (reports and documentation)
        d2           # D2 diagramming tool for generating diagrams from text-based descriptions
        nodejs_22    # Node.js 22 for JavaScript/TypeScript development
        pnpm         # pnpm for managing JavaScript/TypeScript project dependencies
        jdk23        # OpenJDK 23 for Java development
        maven        # Apache Maven for managing Java project dependencies and builds
        docker       # Docker for containerization (running and managing containers locally)
        # Additional dependencies here
      ];
  
      shellHook = ''
          echo "Welcome to the Hawk-TU development shell!"
        
          echo "TeX Live is available for LaTeX document processing."
          echo "TeX Live version: $(tex --version | head -n 1)"
          echo "D2 Diagramming tool is ready to generate diagrams."
          echo "D2 version: $(d2 --version)"
          echo "Node.js and npm are ready for JavaScript/TypeScript dependencies."
          echo "Node.js version: $(node --version)"
          echo "pnpm version: $(pnpm --version)"
          echo "OpenJDK and Maven are available for running java dependencies."
          echo "OpenJDK version: $(java --version | head -n 1)"
          echo "Maven version: $(mvn --version | head -n 1)"
          echo "Docker is available for container management."
          echo "Docker version: $(docker --version | head -n 1)"
          
          # Additional tips could be added here if necessary.
      '';
    };
  };
}