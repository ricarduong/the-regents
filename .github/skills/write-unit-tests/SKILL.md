---
name: write-unit-tests
description: "Use when: writing unit tests, updating unit tests after behavior changes, choosing the correct unit-test layer, or proving changed logic with focused Jest coverage."
argument-hint: "Describe the behavior to test, the files changed, or the layer that needs unit coverage."
---

# Write Unit Tests

## Goal

Add or update focused unit tests that prove changed behavior without widening scope unnecessarily.

This skill only owns unit-test design and execution.
Treat `.github/copilot-instructions.md` and `.github/openclaw/*` as the shared base contract.
Keep this skill focused on unit-test deltas; it does not own the primary implementation workflow.

## When To Use This Skill

- After implementing behavior in a service, middleware, helper, validator, or another isolated slice.
- When existing tests no longer cover the changed logic.
- When the agent needs to decide whether a change belongs in unit tests or another layer.

## Procedure

1. Identify the narrowest behavior that changed.
2. Choose the correct unit-test layer for that behavior.
3. Reuse nearby test patterns before inventing a new style.
4. Mock only the dependencies that cross the layer boundary.
5. Add or update the smallest test that fails without the change and passes with it.
6. Run the narrowest test command for the touched test file or slice.
7. If unit tests are not appropriate, state why explicitly.

## Layer Selection

- Service logic belongs in service unit tests.
- Middleware behavior belongs in middleware unit tests.
- Pure helpers or validators belong in their own focused unit tests.
- Repository behavior is usually not a unit-test target in this repository when integration coverage is the better fit.

## Constraints

- Do not write broad integration-style tests and call them unit tests.
- Do not mock internal logic of the unit under test.
- Do not over-assert implementation details that make refactors brittle.
- Do not skip a feasible unit test after a behavior change without stating the reason.

## Quality Bar

- Test observable behavior, not incidental implementation details.
- Keep setup minimal and explicit.
- Cover success and failure paths when the change affects both.
- Match the repository's existing Jest naming and file placement.

## Expected Result

The output should include:

- which behavior was covered,
- where the test was added or updated,
- which test command was run,
- or an explicit reason why unit tests were not added.
