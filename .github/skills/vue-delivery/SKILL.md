---
name: vue-delivery
description: "Use when: implementing or reviewing Vue frontends with SFC components, composition or options API, router-based navigation, Pinia or Vuex style state, and component-driven UI behavior."
argument-hint: "Describe the Vue page, component, route, or frontend behavior to change."
---

# Vue Delivery

## Role Of This Skill

This is the stack-specific frontend convention pack for Vue applications.
Treat `.github/copilot-instructions.md` and `.github/openclaw/*` as the shared base contract.
Keep this skill focused on Vue-specific deltas.
Use it after the owning UI surface is known and repository evidence clearly matches Vue patterns.

## When to Use

- The repository uses `.vue` SFC files, Vue Router, Vite with Vue, Nuxt, Pinia, Vuex, or Composition API patterns
- The change touches component ownership, reactive state, routing, forms, or client-side interaction flow
- You need stack-specific guidance beyond the generic frontend workflow

## Shared Boundary

- This skill does not replace planning and approval.
- This skill does not justify forcing Vue composition or store patterns onto a frontend that does not use them.
- This skill does not replace the local design system or UI language.

## What This Skill Owns

- SFC component and route ownership
- Local reactive state versus shared store boundaries
- Composition API or Options API consistency
- Form handling, async state, and loading behavior
- Accessibility and rendering tradeoffs in Vue-style UI

## UI Checklist

1. Identify the owning view, route, layout, or component.
2. Confirm whether the behavior belongs in local state, a composable, or a shared store.
3. Keep props, emits, reactive state, and side effects explicit.
4. Preserve loading, empty, and error states.
5. Validate keyboard, focus, and screen-reader behavior for interactive changes.

## Common Watchpoints

- Mixing Options API and Composition API inconsistently without local precedent
- Over-centralizing state that should remain local
- Breaking route-level data flow or navigation guards
- Generic UI that ignores existing product patterns
- Hidden side effects in watchers or lifecycle hooks

## Expected Result

Return the owning UI surface, reactive-state boundary, rendering implications, and focused validation run.