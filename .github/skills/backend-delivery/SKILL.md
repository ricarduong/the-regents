---
name: backend-delivery
description: "Use when: implementing backend features, fixing server-side bugs, wiring APIs, preserving contracts, placing logic in the right layer, and validating backend behavior with focused checks."
argument-hint: "Describe the backend change and relevant files or behavior."
---

# Backend Delivery

## Goal

Deliver backend changes that respect the target repository's architecture and contracts.

Treat `.github/copilot-instructions.md` and `.github/openclaw/*` as the shared base contract.
Keep this skill focused on backend-delivery deltas; load stack-specific backend guidance separately when the repository evidence supports it.

## When to Use

- Implementing or fixing backend endpoints, services, data access, or validation flows
- Deciding which backend layer should own a change
- Preserving contracts while changing internal orchestration

## Shared Boundary

- This skill does not replace planning and approval.
- This skill does not replace stack-specific backend conventions when the repository clearly follows one.

## Procedure

1. Identify the owning backend layer from local code evidence.
2. Form one falsifiable local hypothesis.
3. Make the smallest change that fixes the root cause.
4. Add or update the narrowest unit or integration test that proves the changed behavior.
5. Run focused validation immediately.

## Layer Checks

- Routes or handlers: wiring only, no domain rules unless the repository intentionally keeps them there
- Controllers or transport adapters: input/output translation and transport concerns
- Services or use-cases: business rules, orchestration, policy, side-effect sequencing
- Repositories or data adapters: persistence access and query composition
- Shared DTOs, interfaces, errors, and validators: explicit contracts and cross-cutting rules

## Validation Order

1. Focused unit or integration test for the changed behavior
2. Narrow typecheck or lint for the touched slice
3. Broader backend validation only if the local check is unavailable or insufficient

## Watchpoints

- Authentication and authorization
- Input validation and data shape
- Error handling and status semantics
- Transaction or persistence boundaries

## Expected Result

Return the owning layer, changed behavior, focused validation, and any remaining contract risk.
