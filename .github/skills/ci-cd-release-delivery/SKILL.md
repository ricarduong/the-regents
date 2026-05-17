---
name: ci-cd-release-delivery
description: "Use when: implementing or reviewing CI/CD pipelines, Docker build flows, artifact promotion, deployment stages, release automation, and environment-specific rollout behavior."
argument-hint: "Describe the pipeline, job, stage, or release behavior to change."
---

# CI/CD Release Delivery

## Role Of This Skill

This is the stack-specific operational pack for CI/CD and release engineering work.
Treat `.github/copilot-instructions.md` and `.github/openclaw/*` as the shared base contract.
Keep this skill focused on CI/CD and release-specific deltas.
Use it after the owning pipeline, job, or deployment boundary is known.

## When to Use

- The task is primarily about build, test, package, publish, deploy, or promote flow
- Docker or image build chains are part of the failing or changing path
- The main risk lies in pipeline sequencing, artifacts, rollout gates, or environment promotion

## Shared Boundary

- This skill does not replace generic operational analysis when the environment boundary is still unclear.
- This skill does not justify broad deployment changes without explicit evidence.
- This skill does not allow hardcoded secrets, environment URLs, or credentials.

## What This Skill Owns

- Job and stage sequencing
- Artifact packaging and handoff
- Cache, build, and image reproducibility
- Promotion rules across environments
- Rollback awareness and release safety

## Delivery Checklist

1. Identify the failing or changing pipeline stage.
2. Confirm trigger conditions, branch filters, and environment gates.
3. Trace artifact or image flow from build to release.
4. Apply the smallest safe automation change.
5. Validate with focused config checks, dry runs, or targeted jobs.

## Common Watchpoints

- Trigger conditions that run too often or not often enough
- Artifact names that do not line up across stages
- Docker layer caching or context mistakes
- Promotion logic that bypasses approvals or protected environments
- Missing rollback or re-run safety

## Expected Result

Return the owning pipeline boundary, changed stage behavior, validation run, and rollout risk.
