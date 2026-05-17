---
name: implement-task
description: "Use when: implementing a coding task, fixing a bug, making a scoped refactor, wiring tests, or completing a concrete engineering change end to end."
argument-hint: "Describe the task, the failing behavior, or the change to implement."
---

# Implement Task

## Goal

Execute a concrete engineering task from request to verified change with minimal drift.

This is the generic write-mode delivery workflow.
Treat `.github/copilot-instructions.md` and `.github/openclaw/*` as the shared base contract.
Keep this skill focused on write-mode execution deltas; use other skills for planning, architecture analysis, stack conventions, and unit-test specifics.

## When To Use This Skill

- Add or modify behavior in an existing feature.
- Fix a defect with a local code path.
- Make a small to medium scoped refactor.
- Add or adjust tests for a behavior change.

Use the `plan-and-approve` skill first for new API, endpoint, resource, or multi-file feature work unless the user explicitly requested direct execution.

## Workflow

1. Identify the nearest concrete anchor.
2. Read only enough code to form one falsifiable local hypothesis.
3. Make the smallest grounded edit.
4. Decide which adjacent skill applies next: architecture, backend conventions, or unit tests.
5. Run the narrowest useful validation immediately after the first substantive edit.
6. If the focused validation fails, determine whether the defect is in the implementation or in the validation, repair the failing side, and rerun the same focused check before expanding scope.
7. Review the touched source for architectural fit, consistency with local conventions, and unintended side effects.
8. Finish with a concise result summary and remaining risks.

## Constraints

- Do not map the whole codebase before editing.
- Do not make speculative wide changes.
- Do not skip validation when a focused check exists.
- Do not mix unrelated cleanup into the same change.
- Do not skip the final source review just because tests passed.
- Do not move on while the focused validation for the current slice still fails.

## Heuristics

- Prefer the owning abstraction over wiring layers.
- Prefer a nearby test or call site over broad search.
- Prefer explicit code over magical helpers.
- Prefer diff-friendly changes over clever rewrites.

## Final Review Checklist

- Check that the change lives in the correct layer or module.
- Check that naming, signatures, and control flow match nearby patterns.
- Check that no unrelated behavior or contract changed accidentally.
- Check that validation actually proves the intended behavior.
- Check that any failing focused test was resolved by repairing code or test rather than ignored.
- Check that the final diff remains scoped to the task.

## Expected Result

The task should end with:

- implemented code,
- focused validation,
- a short explanation of change, review result, and risk.
