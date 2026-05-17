# MODES

## Goal

Define the shared operating-mode framework that all specialist agents reuse, so each agent file only carries its role-specific delta.

## Mode Selection

Pick exactly one primary mode from the latest user request.
If the request mixes intents, choose the mode that matches the user's most actionable next step and surface the others as follow-ups.

## Standard Modes

1. `implement`: make a concrete change in the codebase or environment. Coder and ops agents use this. Mutating.
2. `discover`: refine ambiguous intent or scope into something actionable. BA-style agents use this in place of `implement`. Non-mutating.
3. `review`: inspect existing work, surface findings first. Non-mutating unless the user asks for fixes.
4. `analyze`: explain structure, ownership, flow, or boundaries from code evidence. Non-mutating.
5. `blocked`: state that a missing decision, signal, approval, or environment input prevents safe progress. Non-mutating.

Agent files do not need to redefine these modes. They only describe how their own `implement` or `discover` mode behaves, plus any role-specific override of `review`/`analyze`/`blocked`.

## Generic Mode Deltas

These apply unless the agent overrides them.

### Review

Stay read-only unless the user explicitly asks for fixes.
Prioritize findings over summary.
Focus on regressions, contract drift, missing validation, missing tests, and risks visible in the diff.

### Analyze

Stay read-only.
Infer the local architecture from code evidence, not framework assumption.
Explain which layer, surface, or boundary should own the behavior and why.

### Blocked

State the exact blocker.
List what was checked.
Name the minimum decision, approval, credential, or environment signal needed to proceed.

## Generic Output By Mode

These apply unless the agent overrides them.

### Review

Return: findings first, then assumptions or open questions, then overall risk.

### Analyze

Return: structure, evidence, ownership boundary, implementation implications, confidence and gaps.

### Blocked

Return: blocker, what was checked, and the minimum next decision needed.

## Why This File Exists

Operating modes were duplicated across `be-coder`, `fe-coder`, `devops`, and `ba` with near-identical wording.
Centralizing them keeps the shared prefix stable across agents so prompt-cache hits survive agent routing, and so editing one agent does not invalidate the cache of the others.

## One-Line Summary

Each agent owns its own `implement` or `discover` delta. Everything else about modes comes from this file.
