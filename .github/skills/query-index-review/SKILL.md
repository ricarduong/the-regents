---
name: query-index-review
description: "Use when: reviewing query shape, explain plans, scan strategy, join order, sort and pagination costs, and composite index coverage for relational databases or Prisma-backed repositories."
argument-hint: "Describe the query, Prisma access pattern, explain output, or index design problem."
---

# Query Index Review

## Goal

Review query behavior and index strategy so database reads stay aligned with real access patterns instead of speculative tuning.

Treat `.github/copilot-instructions.md` and `.github/openclaw/*` as the shared base contract.
Keep this skill focused on query-plan and index-review deltas; load schema-design, migration-safety, and stack-specific backend guidance separately when model shape, rollout, or application wiring is the main concern.

## When To Use This Skill

- Reviewing slow reads, joins, sorts, pagination, or aggregation patterns
- Interpreting `EXPLAIN`, `EXPLAIN ANALYZE`, or ORM-generated SQL behavior
- Choosing single-column versus composite indexes
- Checking whether filter, join, and `ORDER BY` patterns are aligned with existing indexes
- Evaluating repository or Prisma query changes that may alter database access paths

## Shared Boundary

- This skill does not replace planning and approval.
- This skill does not replace the generic write-mode workflow.
- This skill does not decide the best schema shape from scratch.
- This skill does not replace migration rollout analysis when new indexes, dropped indexes, or rewritten queries affect live traffic safety.

## Procedure

1. Start from the concrete query, Prisma call, repository method, or explain-plan output.
2. Identify the real workload shape: filters, joins, sort order, pagination, projection, and expected cardinality.
3. Read the observed or likely access path: index scan, range scan, bitmap path, full scan, join strategy, and sort behavior.
4. Compare the access path with existing predicates and index definitions.
5. Choose whether the fix belongs in query shape, projection, pagination strategy, composite index design, or redundant-index cleanup.
6. Check whether the recommendation is engine-specific before suggesting advanced index features.
7. If index creation, removal, or backfill risk affects production rollout, hand off to `database-migration-safety` before finalizing the change plan.

## Query Review Checks

- Equality, range, and `IN` predicates
- Join keys and join selectivity
- `ORDER BY` columns and sort direction
- Offset versus cursor pagination shape
- Aggregation and grouping paths
- Selected columns versus full-row fetches
- Estimated rows versus actual rows when plan output is available
- Repeated lookups or N+1 query patterns above the repository boundary

## Composite Index Heuristics

- Prefer index column order that matches the dominant filter and sort pattern, not just the table schema order.
- Prefer placing columns frequently filtered together in the same composite index when the workload actually combines them.
- Prefer equality predicates before range or sort columns when the engine and workload make that path effective.
- Prefer one well-justified composite index over several weak single-column indexes when the query depends on a combined access path.
- Avoid duplicating coverage already provided by primary, unique, or existing composite indexes.
- Avoid indexing low-value columns that add write cost without reducing scanned rows or sort work.

## Plan Watchpoints

- Full scans caused by functions, casts, or mismatched data types in predicates
- Sort steps that could be avoided with index-aligned ordering
- Join explosions from weak predicates or missing join filters
- Composite indexes whose left-prefix does not match actual query usage
- ORM queries that pull wide rows when only a narrow projection is needed
- Recommendations based on one isolated plan without workload or cardinality context

## Expected Result

Return the observed query shape, likely or confirmed access path, recommended query or index change, and any engine-specific or rollout assumptions.
