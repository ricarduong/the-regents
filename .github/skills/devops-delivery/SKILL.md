---
name: devops-delivery
description: "Use when: fixing CI/CD, Docker, deployment config, infrastructure automation, environment setup, or observability pipelines with safe, reviewable operational changes."
argument-hint: "Describe the pipeline, environment, or infra issue and available evidence."
---

# DevOps Delivery

## Goal

Deliver safe operational changes with deterministic validation.

Treat `.github/copilot-instructions.md` and `.github/openclaw/*` as the shared base contract.
Keep this skill focused on generic operational-delivery deltas; load pipeline- or release-specific guidance separately when needed.

## When to Use

- Fixing pipeline failures, deployment automation, image build flows, or environment configuration
- Improving observability or runtime reliability without changing product behavior directly
- Deciding which config, stage, or environment boundary owns an operational issue

## Shared Boundary

- This skill does not replace pipeline- or release-specific guidance when the repository clearly needs it.
- This skill does not bypass approval for changes that affect release or deployment semantics.

## Procedure

1. Anchor on the failing job, config, or environment boundary.
2. Form a local hypothesis from logs, config, or command evidence.
3. Apply the smallest safe change.
4. Validate with a dry run, focused command, or targeted pipeline check.

## Operational Checks

- Trigger conditions and branch filters
- Build, test, package, and deploy stage boundaries
- Artifact naming, retention, and handoff
- Environment variables, secrets, and protected promotion paths
- Rollback and re-run safety

## Validation Order

1. Focused dry run or local config validation
2. Narrow pipeline command or linter
3. Targeted CI job verification

## Watchpoints

- Secret handling
- Idempotency
- Rollback paths
- Environment drift between local, CI, and production

## Expected Result

Return the owning operational boundary, changed automation behavior, validation run, and remaining rollout risk.
