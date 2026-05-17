# Architecture Analysis Template

Use this template when reporting findings.

## 1. Architecture Style

- Name the likely architecture style.
- State the evidence that supports the classification.
- Distinguish deliberate structure from framework boilerplate.

## 2. Layer Responsibilities

- Identify the main layers or modules.
- State what each layer appears to own.
- Note where control flow moves between layers.

## 3. Design Principles In Use

- Identify principles that are clearly visible in code.
- Examples: separation of concerns, dependency inversion, explicit contracts, single responsibility.
- Tie each principle to code evidence.

## 4. Design Patterns Detected

- List only patterns supported by evidence.
- Examples: repository pattern, dependency injection, service layer, controller pattern, middleware pipeline, factory, strategy.
- For each pattern, state where it appears and why it fits.

## 5. Implementation Implications

- Explain where a new change should be added.
- Explain which files or abstractions should be extended.
- Explain which conventions must be preserved.

## 6. Consistency Rules

- State the rules the next implementation should follow.
- Keep these rules concrete and action-oriented.

## 7. Confidence And Gaps

- State confidence level.
- State what is inferred versus directly evidenced.
- List any missing evidence that could change the conclusion.
