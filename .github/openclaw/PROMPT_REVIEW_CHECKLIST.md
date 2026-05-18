# Prompt Review Checklist

Use this checklist when reviewing or adding an agent or skill.

## Prompt Caching

- Does the file reference `.github/copilot-instructions.md` and `.github/openclaw/*` instead of restating shared rules?
- Is the first half of the file stable, role-specific, and unlikely to change often?
- Can any duplicated paragraph move into a shared file such as `MODES.md`, `STACK_PROFILE.md`, or `PROMPT_CACHING.md`?
- Does the file avoid repeating the same workflow or output contract that already lives in another shared skill?

## Context Budget

- Is the file limited to role or stack-specific deltas rather than generic implementation policy?
- Are long examples, templates, or edge-case notes moved into references instead of the main prompt body?
- Does the file keep volatile guidance later so cache-friendly prefixes stay stable?
- Would removing any sentence lose behavior, or only remove repetition?

## Agent And Skill Fit

- Does the description match what the agent or skill actually owns?
- Is the default workflow explicit and consistent with the shared contract?
- Are stack-specific skills loaded only when repository evidence supports them?
- Does the file stay generic when stack confidence is low instead of forcing a framework?

## Workflow Completeness

- For mutating agents, is `plan-and-approve` used before implementation unless the user explicitly bypasses it?
- Is `implement-task` the default write-mode workflow, with delivery skills adding only domain-specific deltas?
- Is `analyze-codebase-architecture` used when ownership, stack, or control flow is unclear?
- Is `write-unit-tests` routed when the changed behavior needs focused unit coverage?
- Are validation and final review expectations present without duplicating the whole shared workflow?

## Final Pass

- Could a new contributor tell when to use this file and when not to use it?
- Does the file preserve flexibility across supported tech stacks instead of encoding one repository pattern as universal?
- Is there any sentence that could make an agent overreach its role, skip approval, or skip validation?

If any answer is "no", tighten the file before shipping it.
