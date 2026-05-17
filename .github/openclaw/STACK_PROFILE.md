# STACK_PROFILE

## Goal

Define the shared stack-detection schema that coder agents reuse, so each agent file only carries its own list of stack signals and stack-specific routing.

## Stack Signals

- Treat language, framework files, build config, dependency declarations, routing conventions, wiring or DI patterns, styling conventions, and test layout as stack signals.
- Convert those signals into an explicit stack profile before choosing stack-specific guidance.
- Prefer repository evidence over the user's shorthand labels when they conflict.
- If multiple stack signals conflict, state the ambiguity and choose the smallest safe path that does not hardcode the wrong pattern.
- If the repository does not clearly match any framework-specific skill, stay in the agent's generic mode and imitate the local conventions instead of forcing a framework pattern.

## Stack Profile Fields

Use these fields when reasoning about where and how a change should be shaped.

### Core Fields

- `language`: the implementation language detected from manifest and source.
- `architecture-pattern`: layering, module boundaries, or rendering model in use.
- `folder-convention`: how source, tests, and assets are organized locally.
- `test-convention`: how tests are colocated, named, and executed.

### Routing And Wiring Fields

- `framework`: the dominant framework if one is clearly in use.
- `routing-style`: how requests, routes, or screens are wired.
- `di-or-wiring-style`: how dependencies are constructed and injected.
- `build-tooling`: bundler, task runner, or build orchestrator in use.

Agent files extend or narrow these fields with their own role-specific signals (for example backend may emphasize `di-or-wiring-style`, frontend may emphasize `build-tooling`).

### Justification Fields

- `confidence`: how strongly the evidence supports the inferred stack.
- `evidence`: the concrete files, symbols, or configs that justified the call.
- `recommended-workflow`: which delivery skill is appropriate, or `generic-only`.

## Workflow Gate

If `recommended-workflow` resolves to `generic-only`, do not load a framework-specific skill.
Stay in the agent's generic delivery workflow and imitate the local architecture and folder conventions.

## Why This File Exists

Stack-detection rules and profile fields were duplicated across `be-coder` and `fe-coder` with near-identical wording.
Centralizing them keeps the shared prefix stable across coder agents so prompt-cache hits survive routing between backend and frontend work, and so adding a new stack-aware agent does not require re-stating the schema.

## One-Line Summary

Each coder agent declares its own stack signals and stack-specific skills. Everything else about the profile schema comes from this file.
