---
name: analyze-codebase-architecture
description: "Use when: analyzing source code structure, identifying architecture style, inferring design principles, detecting design patterns, understanding module boundaries, or learning how a codebase is organized before implementation."
argument-hint: "Describe the repository area, feature slice, or architecture question to analyze."
---

# Analyze Codebase Architecture

## Goal

Infer how the codebase is designed so implementation work stays consistent with its existing structure.

This is a read-only analysis skill.
Treat `.github/copilot-instructions.md` and `.github/openclaw/*` as the shared base contract.
Keep this skill focused on architecture-analysis deltas; it should not drift into planning or implementation.

## When To Use This Skill

- Before implementing in an unfamiliar area of the repository.
- When the task depends on understanding layers, module boundaries, or ownership.
- When the agent needs to identify design principles, architectural style, or recurring patterns.
- When the correct implementation shape is unclear from a single file.

## Procedure

1. Start from the task's nearest code anchor or affected module.
2. Inspect only the local structure needed to identify the controlling abstractions.
3. Infer the architecture from folder layout, interfaces, wiring, and data flow.
4. Identify explicit patterns that are evidenced by code, not by guesswork.
5. Summarize the practical implications for implementation.
6. If confidence is low, state the uncertainty and the missing evidence.

## Evidence Sources

- folder and file structure,
- DI or container wiring,
- interface and DTO boundaries,
- controller and service responsibilities,
- repository and persistence patterns,
- tests that reveal intended ownership.

## Constraints

- Do not label a pattern unless code evidence supports it.
- Do not map the whole repository if the task only touches one slice.
- Do not confuse framework defaults with deliberate architecture.
- Do not produce abstract theory without implementation implications.

## Output

Return the findings using the structure in [analysis template](./references/analysis-template.md).
