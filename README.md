# the-regents

The Regents is a central repository for managing GitHub Copilot custom agents, reusable skills, and shared operating conventions for agent-driven workflows.

This repository acts as the source of truth for three prompt-level building blocks:

- Agents: role definitions and execution boundaries for each agent.
- Skills: reusable workflows, conventions, and task-specific guidance.
- OpenClaw contract: shared system rules for precedence, memory, behavior, and collaboration.

## Purpose

This repo separates agent and skill conventions from any single application codebase so they can be reused consistently across projects.

- Reuse one shared agent system across multiple repositories.
- Maintain agent behavior in a single place.
- Keep role-based and stack-specific conventions explicit and easier to evolve.

## Current Structure

```text
.github/
  agents/            Role-based agent definitions
  skills/            Workflow and stack-specific skill definitions
  openclaw/          Shared contract for the whole agent system
  copilot-instructions.md
README.md
```

## Quick Start

If you are new to this repo, start from the file that matches your goal:

1. Want the top-level operating rules: start with `.github/copilot-instructions.md`.
2. Want to understand agent responsibilities: read files under `.github/agents/`.
3. Want to understand reusable workflows or stack conventions: read files under `.github/skills/`.
4. Want the shared system contract behind all agents and skills: read files under `.github/openclaw/`.
5. Want to review prompt quality for caching, context size, or role fit: read `.github/openclaw/PROMPT_REVIEW_CHECKLIST.md`.

Suggested reading order for first-time exploration:

1. `.github/copilot-instructions.md`
2. `.github/openclaw/PRECEDENCE.md`
3. `.github/agents/be-coder.agent.md`
4. `.github/skills/plan-and-approve/SKILL.md`
5. Any stack- or role-specific skill relevant to your task

## Repository Components

### `.github/agents`

This directory contains specialist agents. Each `.agent.md` file defines the role, scope, and intended usage of that agent.

Current agents:

- `manager`: coordinates, triages, and routes multi-role work.
- `planner`: creates plans, breaks work into todos, and gates execution through approval.
- `stack-router`: identifies repository domain, stack, and best execution path.
- `be-coder`: backend-focused implementation and review agent.
- `fe-coder`: frontend-focused implementation and review agent.
- `devops`: CI/CD, infrastructure, deployment, and reliability agent.
- `ba`: requirements refinement, user story, and acceptance criteria agent.

### `.github/skills`

This directory contains reusable skill packs. Each skill is a guidance module for a workflow or a specific technology stack. Agents use these skills to follow consistent execution patterns and conventions.

The current skills can be grouped into four broad categories:

1. Workflow core

- `plan-and-approve`: planning, todo synchronization, approval gating, and stepwise execution control.
- `implement-task`: end-to-end task delivery workflow.
- `analyze-codebase-architecture`: architecture discovery and module-boundary analysis.
- `write-unit-tests`: guidance for adding or updating focused unit tests.

2. Backend delivery

- `backend-delivery`
- `nodejs-express-inversify`
- `java-spring-delivery`
- `go-service-delivery`

3. Frontend delivery

- `frontend-delivery`
- `react-nextjs-delivery`
- `vue-delivery`
- `angular-delivery`

4. Product and operations

- `discovery-and-acceptance`
- `devops-delivery`
- `ci-cd-release-delivery`

### `.github/openclaw`

This is the shared contract layer for the whole agent system. It contains the foundational documents that define how agents should behave and resolve decisions.

- `PRECEDENCE.md`: instruction precedence and conflict resolution.
- `AGENT.md`: shared agent behavior contract.
- `SOUL.md`: operating style and system identity.
- `USER.md`: collaboration priorities toward the user.
- `MEMORY.md`: memory usage and storage rules.
- `PROMPT_CACHING.md`: cache-aware authoring rules for agents and skills.
- `PROMPT_REVIEW_CHECKLIST.md`: fast review checklist for prompt caching, context budget, workflow fit, and role accuracy.

These files do not solve individual tasks directly. They define the shared behavioral frame that keeps agents and skills consistent.

## How The Parts Work Together

A typical workflow in this repo looks like this:

1. An agent is selected based on the task and role.
2. The agent follows `.github/copilot-instructions.md` and the OpenClaw contract.
3. The agent invokes one or more skills to execute the right workflow.
4. Skills supply the procedure, constraints, validation rules, and domain-specific conventions.
5. The result is more consistent agent behavior across repositories with less duplicated prompt logic.

## Design Direction

This repository is organized to:

- separate roles from implementation details,
- separate general workflows from stack-specific conventions,
- keep planning and architecture analysis reusable as skills,
- keep shared operating rules in a dedicated contract layer.

In other words, this is not a runtime application repository. It is a prompt platform repository that defines how agents should reason, plan, route work, and execute across different codebases.
