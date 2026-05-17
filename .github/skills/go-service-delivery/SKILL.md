---
name: go-service-delivery
description: "Use when: implementing or reviewing Go backends with handlers, services, repositories, packages, interfaces, context propagation, and testable service boundaries."
argument-hint: "Describe the Go service, handler, package, or backend issue to change."
---

# Go Service Delivery

## Role Of This Skill

This is the stack-specific backend convention pack for Go service-style applications.
Treat `.github/copilot-instructions.md` and `.github/openclaw/*` as the shared base contract.
Keep this skill focused on Go service-specific backend deltas.
Use it after the owning backend slice is known and repository evidence clearly matches Go package and service patterns.

## When to Use

- The repository uses `go.mod`, Go package layout, and `cmd/`, `internal/`, `pkg/`, or similar source structure
- The change touches handlers, services, repositories, clients, interfaces, or package boundaries
- Context propagation, error wrapping, and explicit dependency wiring are part of the runtime style

## Shared Boundary

- This skill does not replace planning and approval.
- This skill does not replace generic backend discovery.
- This skill does not justify forcing one Go folder pattern onto a repository that already uses another consistent package layout.

## What This Skill Owns

This skill should answer questions like:

- Which package should own the behavior?
- How should handlers, services, repositories, and clients remain separated?
- Where should interfaces live, if any?
- How should context, errors, and tests follow Go conventions in this repository?

## Resource Checklist

For a new Go backend resource or major extension, follow this order:

1. Package and interface boundary
2. Request or response structures if needed
3. Repository or client integration changes
4. Service or use-case orchestration
5. Handler or transport wiring
6. Route or server registration
7. Tests

## Key Conventions

### Package Boundaries

- Keep ownership at the package level, not at an artificial class hierarchy.
- Follow the repository's existing split between handlers, services, repositories, clients, and shared packages.
- Avoid cyclic dependencies and unnecessary interface extraction.

### Dependency Wiring

- Prefer explicit constructor-style wiring.
- Keep dependencies visible in struct fields and initialization paths.
- Use interfaces where they support testability or boundary isolation, not by default everywhere.

### Context and Errors

- Propagate `context.Context` through request-scoped paths when the repository expects it.
- Preserve the local error wrapping and sentinel or typed error conventions.
- Keep transport concerns out of service logic.

### Testing

- Table-driven tests are preferred when the repository uses them.
- Keep package-level test placement and naming aligned with local patterns.
- Use focused unit tests first, then integration tests when IO or persistence semantics are the risk.

## Expected Result

Return the correct package or layer placement, preserved Go service conventions, context or error-handling implications, and focused validation run.
