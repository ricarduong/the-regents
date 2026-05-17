# PRECEDENCE

## Global Rule Order

When two instructions or signals conflict, resolve them in this order:

1. Platform, safety, and system-level constraints.
2. The current explicit task from the user.
3. `.github/copilot-instructions.md`.
4. Active custom agent contract such as `.github/agents/be-coder.agent.md`.
5. Active task skill such as `implement-task`.
6. AGENT.md.
7. SOUL.md.
8. USER.md.
9. MEMORY.md.
10. Local defaults and stylistic judgment.

## Runtime Rule Order

In the actual runtime for this repository, the expected order is:

1. Platform and system constraints.
2. The user's current request.
3. `.github/copilot-instructions.md`.
4. The currently selected agent, usually one of the specialist agents such as `.github/agents/be-coder.agent.md`.
5. Any explicitly relevant skill.
6. `.github/openclaw/AGENT.md`.
7. `.github/openclaw/SOUL.md`.
8. `.github/openclaw/USER.md`.
9. `.github/openclaw/MEMORY.md`.

## OpenClaw Core Order

Within the OpenClaw file set itself, the precedence is:

1. AGENT.md
2. SOUL.md
3. USER.md
4. MEMORY.md

## Why This Order Exists

- `copilot-instructions.md` holds always-on repository rules.
- The active custom agent defines the execution role.
- Skills shape a task-specific workflow without replacing the core contract.
- AGENT defines the operating contract and execution boundaries.
- SOUL shapes behavior and decision style within that contract.
- USER personalizes collaboration within the contract and identity.
- MEMORY contributes accumulated context but is the easiest source to become stale.

## Conflict Resolution Rules

### AGENT vs SOUL

If tone or identity conflicts with execution discipline, AGENT wins.

Example:
If SOUL suggests being conversational but AGENT requires concise operational output, stay concise.

### SOUL vs USER

If a user preference changes presentation style but does not harm correctness, USER may shape the response.
If the preference would degrade rigor or create confusion, SOUL wins.

### Agent vs Skill

If a task skill suggests a workflow that conflicts with the current agent's role boundaries, the agent wins.
Skills are accelerators, not replacements for the active execution contract.

### Instructions vs Agent

If the active agent conflicts with `.github/copilot-instructions.md`, the project-wide instructions win.
The agent should adapt its behavior to the repository-wide rules.

### USER vs MEMORY

An explicit request from the current user overrides remembered preferences or historical patterns.

### MEMORY vs Current Evidence

If remembered context conflicts with the repository, active task, or fresh validation, memory is treated as stale and should be updated.

## Practical Decision Test

When unsure, apply this sequence:

1. Is it safe and allowed?
2. Is it what the user explicitly wants now?
3. Does it obey the repository-wide instructions?
4. Does it respect the active agent's mission and boundaries?
5. Does an active skill help without conflicting?
6. Does it fit the agent's identity and values?
7. Does it respect known user preferences?
8. Is memory helping, or is it outdated?

## One-Line Summary

Project instructions govern the workspace, the active agent governs execution, SOUL shapes character, USER tunes collaboration, and MEMORY informs context.
When in doubt, move upward in the precedence stack.
