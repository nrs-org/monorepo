Agent Guidelines for this repository

Purpose

- This monorepo collects packages and tools that implement the NRS specification
  (https://github.com/nrs-org/nrs). Agents working in this repository are
  expected to produce small, well-tested, and well-documented changes to
  packages under `packages/` (calculation core, extensions, markup tooling,
  CLIs, etc.).

Developer environment (quick)

- Enter the Nix devshell (recommended):
  - From repo root: `nix develop --extra-experimental-features 'nix-command flakes'`
  - Or allow direnv if you use it: `direnv allow` then open a new shell.
- The devshell provides `bun` and the pre-commit tooling used by CI.
- Install JS deps for a package (run inside that package directory):
  - `bun install`

Build / Lint / Test commands

- Per-package (recommended):
  - Install dependencies: `cd packages/<name> && bun install`
  - Run all tests for a package: `cd packages/<name> && bun test`
  - Run a single test file (fast, deterministic):
    - `cd packages/<name> && bun test tests/whatever.test.ts` (or an equivalent
      path to the test file). Providing the test file path runs only that file.
  - Run a single test case by file path and test name (if you need to focus):
    - Create/run an isolated test file with only that case, or run the file and
      filter by test name in your test runner UI. (Different test runners may
      support `--filter`/`--grep` flags; `bun test <file>` is always supported.)

- Repo-level lint and formatting (pre-commit):
  - Run all hooks: `pre-commit run -a` (this is what CI runs)
  - Run hooks for modified files only: `pre-commit run`
  - Run a hook on a single file: `pre-commit run --files path/to/file`

- CI-equivalent command (local):
  - `nix develop --extra-experimental-features 'nix-command flakes' -c pre-commit run -a`

Notes about CI

- The GitHub workflow `.github/workflows/pre-commit-lints.yml` runs the same
  pre-commit hooks within a Nix environment. Keep changes small and ensure
  `pre-commit run -a` passes before opening a PR.

Repository layout assumptions

- packages/ — independent JS/TS packages (each with package.json)
- flake.nix — Nix flake to set up devshells and pre-commit tooling
- .pre-commit-config.yaml — pre-commit configuration used by CI and devs

Code style and conventions (for agents)

- Formatting
  - Do not reformat code manually; run and rely on the repository's formatters
    via `pre-commit run -a`. If a formatter is added later (Prettier, taplo,
    rustfmt, etc.) respect its defaults and avoid fighting it.
  - If you must change formatter config, open a separate RFC-style PR and run
    `pre-commit run -a` across the repo to normalize changes.

- Modules & imports
  - Use ECMAScript modules (ESM) as the default for new JS/TS code. Prefer
    `import { foo } from 'pkg'` over CommonJS `require` unless interacting with
    legacy code.
  - Keep import groups ordered: external dependencies, internal repo packages,
    then local relative imports. Separate groups with a blank line.
  - Prefer named exports over default exports for libraries (easier to search
    and refactor). Use default exports only for CLI entrypoints or rare cases.
  - Keep import paths shallow: import from package entrypoints rather than deep
    file paths when referencing other packages in the monorepo.

- Types & TypeScript
  - Prefer TypeScript for library code. Aim for strict typing; avoid `any`.
  - Use `interface` for public data shapes and `type` for unions/aliases/generic
    transformations.
  - Name generic type parameters with a single capital letter (`T`, `K`, `V`)
    unless a descriptive name improves readability.
  - Export explicit types for public package APIs; document invariants in the
    type comments.

- Naming conventions
  - Variables & functions: camelCase (e.g. `calculateScore`, `entryId`)
  - Types & classes: PascalCase (e.g. `ScoreVector`, `EntryRecord`)
  - Constants: UPPER_SNAKE (for environment-driven values), or PascalCase for
    exported constants when they represent domain concepts (e.g. `DEFAULT_P`)
  - File names: kebab-case for package-level files (`score-core.ts`), but
    test files may use `.test.ts` suffix matching the implementation file.

- Error handling
  - Use exceptions for unexpected error conditions. Throw `Error` (or a small
    Error subclass) with clear messages and include relevant context.
  - Do not swallow errors silently. Log a concise message and propagate the
    error up unless you can recover safely.
  - For long-running/CLI processes, use exit codes to indicate failure.

- APIs & functions
  - Keep exported functions small and single-purpose. Prefer composing smaller
    utilities rather than large monolithic functions.
  - Make side effects explicit. Prefer pure functions for the calculation core
    so they are easier to test.
  - Accept and return plain serializable data structures where possible — this
    simplifies inter-package boundaries and test fixtures.

- Tests
  - Place unit tests next to implementation or in a `tests/` directory inside
    the package. Name test files `*.test.ts` / `*.test.js`.
  - Tests must be deterministic and avoid network or filesystem flakiness. Use
    fixtures and mocks for external interactions.
  - For a single failing test, create an isolated test file and run it with
    `bun test path/to/file.test.ts` to iterate quickly.
  - Aim for good coverage on the calculation core — correctness is the
    priority for scoring/solver algorithms.

- Documentation & comments
  - Document exported package APIs in the source (TSDoc style for TypeScript)
    and keep the top-level `README.md` for package-level docs and usage.
  - Explain non-obvious algorithms with short comments and link to the spec or
    blog posts where applicable.

- Commit & PR guidance for agents
  - Keep changes focused and small. One logical change per commit/PR.
  - Run `pre-commit run -a` and the package tests before opening a PR.
  - Do not modify unrelated files. If a change must touch many files, discuss
    in an issue or add a clear explanatory PR description.

Agent operational rules (automated agents like code-synthesis bots)

- Always run `nix develop` (or use direnv) before executing repository commands
  so `bun` and `pre-commit` are available.
- Run `pre-commit run -a` and the relevant package test(s) locally before
  creating commits or PRs. If a pre-commit hook auto-fixes files, re-run tests
  and include the auto-fixed files in the commit.
- When adding or modifying packages, also update top-level documentation (the
  monorepo README) and add package-local README if the package is non-trivial.
- If your change touches flake or CI configuration, ensure you document the
  motivation in the PR and run `nix flake show` / `nix develop` to sanity check.
- Do not change license or legal files. If a change requires a license update,
  flag it for human review.

Cursor / Copilot rules

- This repository does not include dedicated Cursor rules (no `.cursor/rules/`
  or `.cursorrules` directory) and there is no `.github/copilot-instructions.md`.
  Follow general repository guidelines above; if these files are added later,
  incorporate them into your workflow.

Where to ask questions

- Open an issue in the repo for design-level questions or to propose changing
  formatting or project-wide defaults. For small clarifications, add a PR
  comment.

Summary

- Be conservative: run the devshell, run `pre-commit run -a`, run focused tests
  (`bun test <file>`), and produce small, well-tested changes. Document any
  deviations from style or build tooling in the PR description.
