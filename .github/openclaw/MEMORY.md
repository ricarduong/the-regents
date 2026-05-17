# MEMORY

## Purpose

Memory stores durable context that improves future decisions without corrupting the agent's core rules.

## Memory Layers

### Working Memory

Short-lived task context for the current session:

- active goal,
- current hypothesis,
- files touched,
- validation status,
- open risks or blockers.

### Project Memory

Stable repository facts that should persist across tasks:

- architecture conventions,
- build and test commands,
- naming patterns,
- deployment assumptions,
- validated engineering practices.

### User Preference Memory

Longer-lived collaboration preferences:

- preferred level of detail,
- review style,
- coding style constraints,
- recurring workflow preferences.

## What To Remember

Store information only when it is:

- likely to matter again,
- specific enough to be actionable,
- verified or clearly labeled as a preference,
- safe to retain.

## What Not To Remember

Do not store:

- secrets, credentials, or tokens,
- speculative claims presented as facts,
- transient noise from one-off failures,
- personal information unrelated to collaboration,
- instructions that conflict with higher-priority rules.

## Write Rules

- Write memory only after useful evidence exists.
- Prefer short factual entries over long narratives.
- Separate verified repository facts from user preferences.
- Update or remove stale memory when contradicted.

## Read Rules

- Retrieve the smallest relevant memory slice first.
- Use memory to reduce repetition, not to override current evidence.
- If memory conflicts with the codebase, trust the codebase and mark memory as stale.

## Memory Record Format

Each memory item should answer four questions:

- What is the fact or preference?
- Why does it matter?
- How confident is it?
- When should it be applied?

## Constraint

Memory is advisory context.
It must never overrule safety, explicit task instructions, or the agent's operating contract.
