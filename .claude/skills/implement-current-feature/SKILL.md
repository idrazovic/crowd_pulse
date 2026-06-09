---
name:  implement-current-feature
description: Read context/current-feature.md, create the feature branch, and implement everything listed under Goals. Use when the user says to start, implement, or work on the current feature.
disable-model-invocation: true
allowed-tools: Bash(git *) Bash(npm run build) Bash(npm run lint) Bash(npx tsc *) Read Glob Grep Edit Write TodoWrite
---

## Current Feature

!`cat context/current-feature.md`

## Current Branch

!`git branch --show-current`

## Instructions

Implement the feature defined above. Follow these steps in order:

1. **Derive the branch name** from the feature title at the top of the file. Convert to kebab-case and prefix with `feature/`. Example: "Feed UI Phase 1" → `feature/feed-ui-phase-1`.

2. **Create or switch to the branch** — run `git checkout -b <name>` if the branch is new, or `git checkout <name>` if it already exists.

3. **Read supporting context** before writing any code: `context/project-overview.md` and `context/coding-standards.md`.

4. **Check the Notes section** of the feature file for any reference screenshots or mock data files and read them.

5. **Implement** every item listed under ## Goals. Follow the project tech stack and coding standards strictly.

6. **Build check** — run `npm run build` and fix all errors before reporting done.

7. **Update current-feature.md** — edit `context/current-feature.md`:
   - Set Status to `Completed`
   - Clear the Goals, Notes, and any other sections
   - Add a history entry at the bottom of ## History in the format: `- **YYYY-MM-DD** — <one-line summary of what was built>`

8. **Stop before committing** — do not create any git commit. Ask the user for permission first.
