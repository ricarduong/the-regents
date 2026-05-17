# PROMPT_CACHING

## Goal

Keep prompts cheaper to resend by maximizing stable shared prefixes and minimizing duplicated instructions across files.

## Core Principle

Write shared rules once, then let agents and skills reference that shared base instead of repeating it.

## Authoring Rules

1. Put the most stable instructions first.
2. Keep repository-wide behavior in `.github/copilot-instructions.md` and `.github/openclaw/*`.
3. Keep agent files focused on role-specific deltas, not repeated global workflow.
4. Keep skill files focused on task or stack-specific deltas, not repeated agent policy.
5. Prefer references to shared contracts over restating the same checklist in multiple files.
6. Avoid copying identical constraints, validation rules, or output formats across several agents unless a local override is truly needed.
7. Put volatile examples, edge cases, or rapidly changing guidance later in the file so the stable prefix changes less often.
8. When an instruction is shared by more than one specialist, move it upward into the shared contract instead of cloning it.

## Recommended Order

For agent files:

1. Frontmatter
2. One-line role statement
3. Shared-contract reference
4. Stable role scope
5. Role-specific constraints
6. Skill routing
7. Stack or domain signals
8. Mode-specific deltas
9. Output additions

For skill files:

1. Frontmatter
2. Goal
3. When to use
4. Procedure
5. Constraints
6. Expected result
7. Stack-specific or edge-case additions

## Practical Review Checklist

- Can this instruction live in a shared file instead?
- Is this paragraph duplicated in another agent or skill?
- Does the first half of the file stay stable across routine edits?
- Is the role-specific delta easy to identify?
- Would removing this sentence change behavior, or only repeat an existing rule?

## One-Line Summary

Stable shared prefix first, role-specific delta second, volatile guidance last.
