---
name: react-nextjs-delivery
description: "Use when: implementing or reviewing React and Next.js frontends with component boundaries, hooks, route segments, server/client component tradeoffs, form flows, accessibility, and UI state management."
argument-hint: "Describe the page, component, route, or UI behavior to change."
---

# React Next.js Delivery

## Role Of This Skill

This is the stack-specific frontend convention pack for React and Next.js style applications.
Treat `.github/copilot-instructions.md` and `.github/openclaw/*` as the shared base contract.
Keep this skill focused on React and Next.js-specific deltas.
Use it after the owning UI surface is known and the repository clearly follows React or Next.js patterns.

## When to Use

- The repository uses React, Next.js, JSX or TSX components, hooks, route segments, or server and client component boundaries
- The change touches component ownership, state flow, rendering behavior, forms, or navigation
- You need stack-specific guidance beyond the generic frontend workflow

## Shared Boundary

- This skill does not replace planning and approval.
- This skill does not justify forcing Next.js-specific assumptions onto a plain SPA or non-React frontend.
- This skill does not replace the local design system or UI language.

## What This Skill Owns

- Component and route ownership
- Local, shared, and server-derived state boundaries
- Form handling, optimistic updates, and pending states
- Server versus client execution implications
- Accessibility and rendering tradeoffs in React-style UI

## UI Checklist

1. Identify the owning route, page, layout, or component.
2. Confirm whether the behavior belongs in server logic, client state, or shared UI composition.
3. Keep props, state, and side effects explicit.
4. Preserve loading, empty, and error states.
5. Validate keyboard, focus, and screen-reader behavior for interactive changes.

## Common Watchpoints

- Overlifting state without evidence
- Mixing data loading and presentation in ways the repository avoids
- Breaking server and client component boundaries
- Rendering jank from avoidable synchronous work
- Generic UI that ignores existing product patterns

## Expected Result

Return the owning UI surface, state boundary, rendering implications, and focused validation run.
