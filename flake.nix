{
  description = "Beauty Med Spa dashboard development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs = { nixpkgs, ... }:
    let
      systems = [
        "x86_64-linux"
        "x86_64-darwin"
        "aarch64-linux"
        "aarch64-darwin"
      ];

      forAllSystems = nixpkgs.lib.genAttrs systems;
    in
    {
      devShells = forAllSystems (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          default = pkgs.mkShell {
            packages = with pkgs; [
              python312
              python312Packages.pip
              nodejs_22
              pnpm
              postgresql_17
              git
            ];

            shellHook = ''
              export PATH="$PWD/bin:$PATH"
              alias dev="bash ./scripts/dev.sh"
              echo "Beauty Med Spa dashboard dev shell"
              echo "Python: $(python --version)"
              echo "Node: $(node --version)"
              echo "pnpm: $(pnpm --version)"
              echo "Postgres: $(psql --version | head -n 1)"
              echo ""
              echo "Run 'dev' to start local Postgres, backend, and frontend."
              echo "Run 'source .envrc' if direnv is not active."
            '';
          };
        }
      );
    };
}
