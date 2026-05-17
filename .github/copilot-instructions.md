# Project Guidelines

## Purpose

These are the always-on rules for coding work in this repository.
They apply across tasks and are meant to keep the agent aligned with the project architecture.

## Architecture

- Preserve the layered flow: route to middleware to controller to service to repository.
- Keep business logic in services, not controllers.
- Keep Prisma access in repositories.
- Use interfaces and Inversify bindings instead of coupling directly to implementations.

## Coding Approach

- Start from a concrete file, symbol, failing test, or behavior.
- In implementation agents such as `be-coder`, `fe-coder`, and `devops` when they are making changes, always plan before implementation, list concrete todo items, and wait for explicit user approval before starting execution.
- When the `vscode_askQuestions` tool is available, request approval with inline fixed choices instead of asking the user to type a freeform approval message.
- After each approved implementation step, update the todo state and ask for approval again before starting the next mutating step unless the user explicitly authorizes full uninterrupted execution.
- If the task touches an unfamiliar area, first infer the local architecture and design patterns from code evidence.
- Form a local hypothesis before the first edit.
- Make the smallest change that fully solves the task.
- Prefer root-cause fixes over presentation-only patches.
- Do not widen scope without evidence.

## Validation

- After the first substantive edit, run the narrowest useful validation.
- After a behavior change in a unit-testable slice, add or update the narrowest unit test that proves it.
- Prefer focused tests, type checks, or lint for the touched slice.
- If the focused validation fails, repair the implementation or the test and rerun the same validation before moving on.
- If no executable validation exists, inspect the diff and report the limitation.
- If a behavior change does not get a unit test, explain why explicitly in the final result.
- After validation passes, review the touched source for consistency with architecture, local conventions, and task scope before finishing.

## Safety

- Do not overwrite unrelated user changes.
- Do not introduce breaking API or schema changes unless requested.
- Do not store or expose secrets in code or memory.
- Treat auth, validation, and error handling as core behavior.

## Conventions

- Use the `plan-and-approve` skill by default for implementation agents before any implementation work, not only when the user asks for a plan.
- Use the `analyze-codebase-architecture` skill when the agent needs to understand the repository's design before implementation.
- Use the `implement-task` skill as the default delivery workflow when performing code changes.
- Use the `write-unit-tests` skill when a changed behavior needs focused unit coverage.
- Follow the patterns in the `nodejs-express-inversify` skill for backend API work.
- Use `.github/openclaw/PRECEDENCE.md` when instructions or signals conflict.
- Keep final explanations concise and implementation-focused.
