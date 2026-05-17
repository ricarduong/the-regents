---
name: plan-and-approve
description: "Use when: the user wants a plan before implementation, wants todo items proposed first, wants explicit approval before code changes, or asks the agent to wait for confirmation before executing."
argument-hint: "Describe the task to plan, the desired scope, and any approval boundary the agent must respect."
---

# Plan And Approve

## Goal

Create a concrete execution plan, present it for approval, and stop there until the user explicitly approves.

Treat `.github/copilot-instructions.md` and `.github/openclaw/*` as the shared base contract.
Keep this skill focused on planning and approval-gate deltas instead of repeating general implementation policy.

When the ask-questions tool is available, approval should be collected inline via `vscode_askQuestions` instead of relying on a follow-up freeform chat message.

When the user wants gated execution, the skill should also support step-by-step approval so the agent completes one approved mutating todo item, then pauses again for the next allow decision.

## When To Use This Skill

- By default for implementation work in specialist agents such as `be-coder`, `fe-coder`, or `devops` unless the user explicitly asks for direct implementation.
- The user asks for a plan first.
- The user wants to review todos before any code changes.
- The user asks the agent to wait for confirmation before implementing.
- The task is sensitive enough that an explicit go-ahead is required.

## Procedure

1. Inspect only enough context to form a concrete, scoped plan.
2. Break the work into actionable todo items.
3. If the `todo` tool is available, mirror those items in the shared todo list before asking for approval.
4. Present the plan clearly and ask whether to proceed.
5. Default to asking for the next approved todo item or approved batch, not open-ended permission.
6. If the `vscode_askQuestions` tool is available, use it immediately to request explicit approval in the current conversation flow.
7. Prefer fixed choices such as `Allow next step`, `Allow all remaining steps`, `Revise plan`, and `Cancel` so the user can confirm without sending a separate freeform request.
8. Do not edit files, run mutating commands, or start implementation until approval is received.
9. If approval is limited to one step, execute only that step, update the todo state, and ask again before the next mutating step.
10. If approval is denied or revised, update the plan first and ask again before implementing.

## Approval Gate

- Approval must be explicit.
- Silence, ambiguity, or partial agreement do not count as approval.
- If the user changes scope while reviewing the plan, revise the plan before acting.
- "Implement directly", "skip planning", or equivalent wording counts as an explicit bypass of this gate.
- `Allow next step` approves only the next mutating todo item.
- `Allow all remaining steps` removes the per-step pause for the rest of the current approved plan.

## Planning Rules

- Keep the plan action-oriented and reviewable.
- Prefer 3 to 7 todo items unless the task genuinely needs more.
- Call out assumptions, risks, and validation expectations.
- Make each todo item small enough that step-by-step approval is meaningful.
- Do not disguise implementation as planning.

## Constraints

- Do not make code edits before approval.
- Do not run destructive or mutating commands before approval.
- Do not present vague plans such as "fix code" or "update tests" without scope.
- Do not continue from planning into execution in the same step unless the user explicitly approves.
- Do not silently bypass planning for implementation work in specialist implementation agents.
- Do not prefer a plain trailing question over `vscode_askQuestions` when that tool is available.
- Do not treat one-step approval as approval for the whole plan.

## Expected Result

Before approval, the output should include:

- a scoped plan,
- clear todo items,
- the requested approval question.

When `vscode_askQuestions` is available, the approval prompt should use inline choices so the user can confirm from the chat UI without composing a separate follow-up request.

When step-by-step gating is requested, each mutating todo item should end with a fresh inline allow question before the next step begins.
