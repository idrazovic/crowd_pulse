---
name: load-current-feature
description: Load a feature spec file into context/current-feature.md and set status to "In Progress". Pass the spec file path as the argument. Example: /load-current-feature context/features/my-feature-spec.md
disable-model-invocation: true
allowed-tools: Read Edit
---

## Spec File Path

$ARGUMENTS

## Current Feature File

!`cat context/current-feature.md`

## Instructions

1. **Read the spec file** at the path provided in `$ARGUMENTS`.

2. **Extract the feature title** from the spec — use the top-level `#` heading as the feature name. If no heading exists, derive a short title from the filename.

3. **Update `context/current-feature.md`**:
   - Set the feature title (line after `# Current Feature`) to the extracted title
   - Set `Status` to `In Progress`
   - Replace the `## Goals` section body with a concise bullet list of the requirements from the spec
   - Replace the `## Notes` section body with a reference to the spec file: `Spec: <path>` (use the path from $ARGUMENTS)
   - Leave `## History` untouched

4. **Confirm** to the user: show the updated feature title, status, and a short summary of what was loaded.

Do not implement anything. Do not create branches or commits.
