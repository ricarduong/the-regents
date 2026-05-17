---
name: discovery-and-acceptance
description: "Use when: clarifying requirements, writing user stories, defining acceptance criteria, documenting edge cases, and preparing engineering-ready scope from product or business input."
argument-hint: "Describe the feature, flow, or stakeholder need to refine."
---

# Discovery And Acceptance

## Goal

Turn ambiguous requests into testable scope and acceptance criteria.

Treat `.github/copilot-instructions.md` and `.github/openclaw/*` as the shared base contract.
Keep this skill focused on discovery and acceptance deltas rather than implementation policy.

## When to Use

- Refining stakeholder requests into engineering-ready requirements
- Breaking down workflows, user stories, or business rules before implementation starts
- Identifying edge cases, dependencies, and explicit non-goals

## Procedure

1. Identify actors, triggers, rules, and exceptions.
2. Separate must-have behavior from nice-to-have requests.
3. Write concrete acceptance criteria and explicit non-goals.
4. Flag unresolved policy or data questions before implementation begins.

## Output Structure

- Problem statement
- Actors and trigger events
- Main workflow
- Business rules and edge cases
- Acceptance criteria
- Non-goals
- Open questions or dependencies

## Constraints

- Do not convert uncertainty into fake certainty.
- Do not skip non-goals.
- Do not leave acceptance criteria at the level of vague intent.
