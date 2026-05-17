---
name: angular-delivery
description: "Use when: implementing or reviewing Angular frontends with components, modules or standalone components, services, routing, reactive forms, RxJS flows, and testable UI behavior."
argument-hint: "Describe the Angular component, route, service, or UI behavior to change."
---

# Angular Delivery

## Role Of This Skill

This is the stack-specific frontend convention pack for Angular applications.
Treat `.github/copilot-instructions.md` and `.github/openclaw/*` as the shared base contract.
Keep this skill focused on Angular-specific deltas.
Use it after the owning UI surface is known and repository evidence clearly matches Angular patterns.

## When to Use

- The repository uses Angular components, templates, services, modules or standalone components, routing, and RxJS-based state or async flows
- The change touches component ownership, service coordination, forms, routing, or change-detection-sensitive UI behavior
- You need stack-specific guidance beyond the generic frontend workflow

## Shared Boundary

- This skill does not replace planning and approval.
- This skill does not justify forcing Angular service or module conventions onto a frontend that does not use them.
- This skill does not replace the local design system or UI language.

## What This Skill Owns

- Component, route, and service ownership
- Template-driven versus reactive-form boundaries
- RxJS or signal-based state and async flow placement
- Dependency injection and provider placement in Angular-style UI
- Accessibility and rendering tradeoffs in Angular-style UI

## UI Checklist

1. Identify the owning route, component, container, or service.
2. Confirm whether the behavior belongs in template logic, component class logic, a shared service, or router configuration.
3. Keep inputs, outputs, DI, and async subscriptions explicit.
4. Preserve loading, empty, and error states.
5. Validate keyboard, focus, and screen-reader behavior for interactive changes.

## Common Watchpoints

- Putting business or orchestration logic directly into templates
- Leaking subscriptions or side effects without clear cleanup strategy
- Overusing shared services when local component ownership is sufficient
- Breaking route guards, resolvers, or form validation flow
- Generic UI that ignores existing product patterns

## Expected Result

Return the owning UI surface, service or state boundary, rendering implications, and focused validation run.