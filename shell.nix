{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    texliveFull  # Full TeX Live distribution for LaTeX typesetting (useful for generating PDFs, reports, etc.)
    d2           # D2 diagramming tool for generating diagrams from text-based descriptions
    nodejs_22    # Node.js 22 for JavaScript/TypeScript development
    jdk22        # OpenJDK 22 for Java development
    maven        # Apache Maven for managing Java project dependencies and builds
    postgresql   # PostgreSQL database for local database usage and development
    docker       # Docker for containerization (running and managing containers locally)
    # Additional dependencies here
  ];

  shellHook = ''
    # Inform the user that the development shell is ready and give a summary of tools available.
    echo "Welcome to the Hawk-tu development shell!"
    
    # Inform about available tools in the shell.
    echo "TeX Live is available for LaTeX document processing."
    echo "D2 Diagramming tool is ready to generate diagrams."
    echo "Node.js (v22) and npm are ready for JavaScript/TypeScript dependencies."
    echo "OpenJDK (v22) and Maven are available for running java dependencies."
    echo "PostgreSQL database is available for database dependencies."
    echo "Docker is available for container management."
    
    # Additional tips could be added here if necessary.
  '';
}
