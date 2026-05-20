---
name: database-migration-safety
description: "Use when: planning or reviewing schema migrations, backfills, expand-contract rollouts, data compatibility, constraint changes, column renames, and zero-downtime database change safety."
argument-hint: "Describe the schema change, migration plan, deployment model, or compatibility risk."
---

# Database Migration Safety

## Goal

Plan schema and data changes so deployed application versions and live data remain compatible during rollout.

Treat `.github/copilot-instructions.md` and `.github/openclaw/*` as the shared base contract.
Keep this skill focused on migration-safety deltas; load schema-design and stack-specific backend guidance separately when model shape or application wiring is the main concern.

## When To Use This Skill

- Adding, dropping, or renaming columns, tables, indexes, or constraints
- Changing nullability, uniqueness, or foreign-key behavior on live data
- Splitting or merging tables
- Backfilling derived fields or moving data between structures
- Coordinating schema rollout across multiple deployed app versions

## Shared Boundary

- This skill does not replace planning and approval.
- This skill does not replace the generic write-mode workflow.
- This skill does not decide the best schema shape from scratch.
- This skill does not replace infrastructure-specific operational guidance when provisioning, backup, or restore is the main task.

## Procedure

1. Start from the concrete schema diff, current data shape, and deployment model.
2. Classify the change as additive, contract-tightening, data-moving, or destructive.
3. Prefer expand-contract rollout when old and new application versions may overlap.
4. Separate schema migration, data backfill, constraint enforcement, and cleanup into reversible stages when possible.
5. Identify locks, table rewrites, long-running backfills, and index-build risk before recommending execution order.
6. Define validation and rollback assumptions for each stage.
7. Coordinate application-layer changes and operational steps explicitly instead of hiding all risk inside one migration.

## Change Patterns

- Add nullable column, backfill, dual-read if needed, enforce `NOT NULL`, then remove the old path.
- Rename column by introducing the new shape first, backfilling, switching reads and writes, then removing the old shape.
- Add unique constraint only after duplicate cleanup and application-side enforcement are aligned.
- Split or merge relations in stages so old and new representations can coexist during cutover.
- Build large indexes using the safest engine-supported path and verify query adoption before removing older indexes.

## Prisma Notes

- Treat generated Prisma migration SQL as a proposal, not as proof that rollout is safe.
- Inspect non-trivial migration SQL for table rewrites, locking behavior, and destructive clauses.
- Keep schema diff, backfill, and application cutover steps explicit instead of burying them in one migration.
- Prefer staged migrations over one-step rename or drop operations when live traffic or old app versions may still exist.

## Safety Checks

- Backward compatibility with the previous application version
- Forward compatibility during rolling or phased deployment
- Idempotent backfill or restart behavior
- Lock duration and table-rewrite risk
- Verification signals after each stage
- Realistic rollback, not just theoretical reversal

## Watchpoints

- Making a live field required in one step
- Dropping columns still read by old code
- Combining schema rewrite and data rewrite in one irreversible migration
- Assuming ORM-generated defaults are safe for large tables
- Forgetting historical duplicates, orphaned rows, or invalid legacy values

## Expected Result

Return the rollout stages, blocking risks, validation plan, and explicit assumptions about deployment overlap, data volume, and rollback.
