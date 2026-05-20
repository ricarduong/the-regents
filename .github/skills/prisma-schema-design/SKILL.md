---
name: prisma-schema-design
description: "Use when: designing or reviewing Prisma schema models, fields, relations, ids, enums, nullability, uniqueness, defaults, and normalization choices for relational databases."
argument-hint: "Describe the Prisma model, relation, field rule, or schema design problem."
---

# Prisma Schema Design

## Goal

Design or review Prisma schema changes that preserve data integrity and fit the repository's persistence patterns.

Treat `.github/copilot-instructions.md` and `.github/openclaw/*` as the shared base contract.
Keep this skill focused on Prisma schema-design deltas; load migration-safety and stack-specific backend guidance separately when rollout or application wiring matters.

## When To Use This Skill

- Adding or reshaping Prisma models, fields, enums, or relations
- Choosing one-to-one, one-to-many, or many-to-many structures
- Reviewing ids, nullability, uniqueness, defaults, and audit fields
- Deciding normalization or denormalization from concrete access patterns

## Shared Boundary

- This skill does not replace planning and approval.
- This skill does not replace the generic write-mode workflow.
- This skill does not replace migration rollout analysis when existing data or overlapping app versions are at risk.
- This skill does not replace repository-specific backend conventions once the owning application layer is known.

## Procedure

1. Start from the concrete Prisma model, schema diff, or query pattern.
2. Identify entity boundaries, ownership, and lifecycle.
3. Choose relation shape from cardinality, optionality, and delete or update semantics.
4. Set field types, nullability, defaults, uniqueness, and indexes to match integrity and access needs.
5. Check naming, audit fields, soft-delete strategy, and enum placement against local conventions.
6. Review how the schema maps to expected Prisma queries and repository boundaries.
7. If live data or rollout safety is affected, hand off to `database-migration-safety` before finalizing the change plan.

## Model Checks

- Primary keys and id generation strategy
- Required versus optional fields
- Natural keys versus surrogate keys
- Enum versus lookup table
- Join-table ownership for many-to-many relations
- Cascade and restrict behavior
- Audit columns such as `createdAt` and `updatedAt`
- Soft-delete markers when the repository uses them

## Prisma Heuristics

- Prefer explicit relation names when multiple links exist between the same models.
- Prefer join models when the relation needs metadata, ordering, or lifecycle.
- Prefer add-nullable, backfill, then enforce-required when introducing a new required field to live data.
- Prefer defaults only when the value semantics are truly universal.
- Prefer composite unique or index definitions when access patterns naturally pair columns.
- Avoid encoding workflow state in multiple booleans when an enum or separate table is clearer.

## Watchpoints

- Hidden many-to-many tables that later need metadata
- Unique constraints on nullable fields and engine-specific behavior
- Cascades that can delete more data than intended
- Wide JSON or text blobs used to avoid modeling real relations
- Schema choices that force repository code to bypass ownership boundaries

## Expected Result

Return the proposed model shape, relation and field decisions, Prisma-specific implications, and any unresolved migration or workload assumption.
