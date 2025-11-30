# Advent of Code 2025 CLI

Nest-powered CLI scaffold for solving the Advent of Code 2025 puzzles. Every day lives in its own folder under `src/days/dayX`

## Requirements

- Node.js ≥ 20 (LTS recommended)
- pnpm ≥ 9

## Getting Started

```bash
pnpm install        # sync deps
pnpm test           # run unit tests (Jest)
pnpm lint           # eslint checks
pnpm format:check   # prettier verification
pnpm typecheck      # tsc --noEmit
```

## Running Solutions

Use the bundled CLI to execute puzzles:

```bash
# Run both parts of day 1 using the default inputs/day1.txt file (if it exists)
pnpm start -- --day 1

# Run only part 2 with a custom input file
pnpm start -- --day 5 --part 2 --input ./inputs/day5-sample.txt

# Pipe inline text without touching the filesystem
pnpm start -- --day 3 --raw "1 2 3 4"

# Show which days already have scaffolding
pnpm start -- --list
```

Where no input file exists, the CLI passes an empty string to the solver so you can stub logic quickly. Place your actual puzzle input in `inputs/dayX.txt` (already gitignored) or provide a path/inline string via CLI flags.

## Project Layout

```
src/
  app.module.ts        # Root Nest module importing the day registry
  app.service.ts       # CLI orchestrator and log formatting
  days/
    dayN/dayN.solution.ts  # Placeholder services for days 1-12
    day-runner.service.ts  # Loads inputs and executes parts
    days.module.ts         # Registers solvers with Nest DI
    days.providers.ts      # Keeps the list of day providers
    day-solution.ts        # Shared interfaces and result types
```

`inputs/` holds puzzle input files (empty `.gitkeep` committed). `templates/day-solution.template.ts` shows a copy/paste skeleton

## Adding or Updating Days

1. Edit the corresponding `src/days/dayX/dayX.solution.ts` file.
2. Implement `partOne` / `partTwo` and update the `name` property to match the puzzle.

## Development Scripts

- `pnpm start` – Build + run the CLI once.
- `pnpm start:dev` – Watch mode for rapid iteration.
- `pnpm lint` / `pnpm lint:fix` – ESLint checks.
- `pnpm format` / `pnpm format:check` – Prettier.
- `pnpm typecheck` – `tsc --noEmit`.
- `pnpm test` – Jest unit tests (see `src/**/*.spec.ts`).
