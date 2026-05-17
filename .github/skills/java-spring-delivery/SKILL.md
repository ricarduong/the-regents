---
name: java-spring-delivery
description: "Use when: implementing or reviewing Java Spring or Spring Boot backends with controllers, services, repositories, dependency injection, configuration properties, validation, and test slices."
argument-hint: "Describe the Spring resource, service, endpoint, or backend issue to change."
---

# Java Spring Delivery

## Role Of This Skill

This is the stack-specific backend convention pack for Java Spring and Spring Boot style applications.
Treat `.github/copilot-instructions.md` and `.github/openclaw/*` as the shared base contract.
Keep this skill focused on Spring-specific backend deltas.
Use it after the owning backend slice is known and repository evidence clearly matches Spring-style architecture.

## When to Use

- The repository uses `pom.xml`, `build.gradle`, `build.gradle.kts`, or Spring Boot application entry points
- Controllers, services, repositories, entities, and configuration classes follow Spring conventions
- Dependency injection is annotation-driven or configuration-driven
- The change touches controllers, services, repositories, DTOs, configuration, validation, or transaction boundaries

## Shared Boundary

- This skill does not replace planning and approval.
- This skill does not replace generic backend discovery.
- This skill does not justify forcing Spring stereotypes or annotations onto a Java backend that does not use Spring.

## What This Skill Owns

This skill should answer questions like:

- Which class or layer should own the backend behavior?
- How should controllers, services, repositories, DTOs, and entities stay separated?
- Where should validation, transactions, and configuration live?
- Which Spring testing slice or validation style should remain intact?

## Resource Checklist

For a new Spring resource or major extension, follow this order:

1. DTOs and validation rules
2. Domain model or entity changes if persistence changes are required
3. Repository interface and query changes
4. Service contract and orchestration logic
5. Controller endpoint mapping and transport translation
6. Configuration or bean wiring if needed
7. Tests

## Key Conventions

### Layer Boundaries

- Controllers handle HTTP transport, request mapping, and response translation.
- Services own business rules, orchestration, and transaction intent.
- Repositories isolate persistence access.
- Configuration classes and properties own environment or bean wiring concerns.

### Dependency Injection

- Prefer constructor injection over field injection.
- Keep bean wiring explicit when auto-scanning is not enough.
- Avoid hidden service location patterns.

### Validation and Errors

- Keep request validation close to transport DTOs when Spring validation is in use.
- Keep domain and business validation explicit in services.
- Preserve the repository's exception mapping and error response conventions.

### Transactions

- Place transaction boundaries where business consistency is owned.
- Do not spread write orchestration across controllers.
- Keep persistence semantics explicit when multiple repositories are involved.

## Testing Conventions

- Service logic: focused unit tests with repository mocks or stubs
- Controller behavior: focused web or slice tests when transport semantics matter
- Repository behavior: integration tests when query or persistence semantics are the risk
- End-to-end flow: broader tests only when narrower tests cannot prove the behavior safely

## Expected Result

Return the correct layer placement, preserved Spring conventions, validation or transaction implications, and focused validation run.
