---
name: nodejs-express-inversify
description: 'Repository-specific backend conventions for Node.js, TypeScript, Express, Inversify, and Prisma. Use when: placing backend code in the correct layer, wiring DI bindings, shaping DTOs and interfaces, applying AppError conventions, or following this repo\'s backend patterns after structure is already understood.'
argument-hint: 'Describe what resource or feature to implement (e.g. "add Department entity with CRUD")'
---

# Node.js + TypeScript + Express + Inversify DI + Prisma

## Role Of This Skill

This is the repository-specific backend convention skill.
Treat `.github/copilot-instructions.md` and `.github/openclaw/*` as the shared base contract.
Keep this skill focused on Node.js, Express, Inversify, and Prisma-specific deltas.
It does not own planning, architecture discovery, or the generic implementation workflow.
Use it after the target slice is known and you need to keep the change consistent with this backend.

## When to Use This Skill

- Adding a new entity/resource with full CRUD
- Implementing a new endpoint on an existing resource
- Debugging DI binding errors
- Adding validation middleware
- Following project error handling conventions

## Shared Boundary

- This skill does not replace the main implementation workflow.
- This skill does not replace architecture inference.
- This skill does not replace the primary unit-test workflow.

## What This Skill Owns

This skill should answer questions like:

- Which layer should this backend change live in?
- How should a new controller, service, repository, DTO, or interface be shaped in this repo?
- Where do DI tokens and bindings go?
- Which error and logging conventions should be preserved?
- Which HTTP, DTO, DI, and repository conventions fit the changed backend code?

## Resource Checklist

For a new backend resource, follow this order:

1. DI token
2. Prisma model and migration if needed
3. DTOs
4. Service and repository interfaces
5. Repository
6. Service
7. Controller
8. Container bindings
9. Routes
10. Route mount
11. Tests

See [architecture reference](./references/architecture.md) for concrete templates.

## Key Conventions

### DI Tokens
Always use `Symbol.for` in `TYPES`. Never inject by class directly.

### Class Decorators
Every injectable class needs `@injectable()`. Constructor parameters use `@inject(TYPES.X)`.

### Error Handling
Use `AppError` subclasses for domain and validation failures. Keep raw transport responses out of services.

| Error Class | Status | When to use |
|---|---|---|
| `NotFoundError` | 404 | Resource not found by id |
| `ConflictError` | 409 | Unique constraint violated (e.g. email) |
| `ValidationError` | 400 | Invalid input from middleware |

### Logger
Instantiate one logger per class with the class name as context.

### Controller Pattern
- Parse `req.params["id"] as string` before `parseInt`
- Always pass errors to `next(error)`, never `res.status(500)`
- Keep business logic out of controllers
- Typical status codes: `200` for get/update, `201` for create, `204` for delete when no body is returned

### Repository Pattern
- Keep Prisma access in repositories only
- Use `select` for public-safe shapes instead of returning full records blindly
- Use `prisma.$transaction([...])` for operations needing atomicity
- Pagination: `skip = (page - 1) * limit`

## Testing Conventions

Use `write-unit-tests` for unit-test workflow. Use [testing reference](./references/testing.md) for repository-specific placement and mocking conventions.

| Layer | Type | Mock |
|---|---|---|
| Middleware | Unit | None |
| Service | Unit | Repository (jest.fn()) |
| Repository | Integration | None (test DB) |
| Routes | Integration | None (supertest) |

- File naming: `*.spec.ts`
- Location: `src/test/unit/<layer>/` or `src/test/integration/<layer>/`
- Run all: `npm test` | Unit only: `npm run test:unit` | Integration: `npm run test:integration`

## Reference Files

- [architecture reference](./references/architecture.md): full resource templates
- [testing reference](./references/testing.md): layer-specific testing patterns
- [validate middleware template](./assets/validate-middleware.template.ts): validation middleware starter

## One-Line Summary

Use this skill to keep backend changes in the correct layer and aligned with this repository's DI, DTO, controller, service, repository, error, and testing conventions.
