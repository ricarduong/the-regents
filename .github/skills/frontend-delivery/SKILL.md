---
name: frontend-delivery
description: "Use when: implementing frontend behavior, UI state changes, styling updates tied to UX, component refactors, accessibility fixes, and client-side validation with focused checks."
argument-hint: "Describe the UI surface, expected behavior, and current issue."
---

# Frontend Delivery

## Goal

Deliver frontend changes that preserve UX intent, local patterns, and accessibility.

Treat `.github/copilot-instructions.md` and `.github/openclaw/*` as the shared base contract.
Keep this skill focused on generic frontend-delivery deltas; load framework-specific frontend guidance separately when repository evidence supports it.

## When to Use

- Implementing UI behavior, state changes, loading or error states, and interaction fixes
- Adjusting component structure, styling, or accessibility in a user-facing flow
- Determining the owning component or state boundary for a change

## Shared Boundary

- This skill does not replace framework-specific frontend conventions when the repository clearly follows one.
- This skill does not replace design or behavior clarification when the request is still ambiguous.

## Procedure

1. Identify the owning component, route, or state boundary.
2. Form one local hypothesis about the failing or desired behavior.
3. Make the smallest behavior-complete UI change.
4. Validate with the narrowest test, lint, typecheck, or browser check available.

## UI Checks

- Component ownership and prop flow
- Local versus shared state boundaries
- Loading, empty, and error rendering
- Keyboard flow, semantics, and accessibility behavior
- Visual consistency with the existing product language

## Validation Order

1. Focused component or behavior test
2. Narrow typecheck or lint
3. Targeted browser or Playwright validation

## Watchpoints

- Accessibility and keyboard flow
- Responsive behavior
- Loading, error, and empty states
- Visual consistency with the local design system

## Expected Result

Return the owning UI surface, changed behavior, validation run, and UX or accessibility risks.
