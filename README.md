# nrs

[![CI Tests](https://github.com/nrs-org/monorepo/actions/workflows/ci-tests.yml/badge.svg)](https://github.com/nrs-org/monorepo/actions/workflows/ci-tests.yml)
[![Pre-commit Lints](https://github.com/nrs-org/monorepo/actions/workflows/pre-commit-lints.yml/badge.svg)](https://github.com/nrs-org/monorepo/actions/workflows/pre-commit-lints.yml)
[![codecov](https://codecov.io/gh/nrs-org/monorepo/graph/badge.svg)](https://codecov.io/gh/nrs-org/monorepo)

This repository is the official implementation monorepo for the NRS project
(see the [specifications](https://github.com/nrs-org/nrs)). Its purpose is to
collect packages and tools that implement the spec and related functionality:

- core scoring and solver libraries (calculation of impacts, relations, and the
  embedding/combine logic)
- extensions and helper modules (score-collapse helpers, visualization helpers,
  importers/exporters)
- markup tooling (parsers, validators and utilities around NRSML)
- developer tools and small CLIs for importing data, running batch calculations,
  and producing reports

This repo is organized as a monorepo of NPM-style packages. We use Bun for the
JS runtime in development, and provide a reproducible developer shell via
`flake.nix`.

## Quick pointers

- Spec: https://github.com/nrs-org/nrs
- Markup (NRSML): https://github.com/nrs-org/nrsml
- Flake devshell: `./flake.nix`
- Direnv: `./.envrc.example` / `./.envrc` (gitignored)

## License

This repository is licensed under the GNU Affero General Public License v3
(AGPLv3). See the `LICENSE` file for the full text.

## Contributing

If you want to contribute a package, add it under `packages/<name>` with a
`package.json`. Aim to keep package boundaries small and focused (calculation,
markup, CLI, UI). Open a PR for changes; pre-commit checks run in CI to keep
format and lint consistent.

## Contact

For discussion and specification questions, see the issues and discussions on
the main spec repository: https://github.com/nrs-org/nrs
