# Summarize Session

Generate a comprehensive markdown summary of the current agent session and save it to `.cursor/sessions/` with a timestamped filename.

## Instructions

Review the entire conversation history and gather the following information:

1. **Session Context**: Original user request, git branch, starting state
2. **All Commands**: Every terminal command run (bash, python, npm, etc.) with exit codes and purpose
3. **File Operations**: All files created, modified, or deleted
4. **Test Results**: Any tests run and their outcomes
5. **Learning Moments**: Discoveries, patterns, or "aha" moments
6. **Error Stories**: Any errors encountered and how they were resolved
7. **Outcomes**: What was accomplished and key decisions made

## Output Format

Create a markdown file with the following structure:

```markdown
# Session Summary

**Date**: [Current date/time]
**Branch**: [Git branch name]
**Original Request**: [Quote the user's initial request]

## Outcomes

- **Status**: [Success / Partial / Blocked]
- **Accomplished**: [What was completed]
- **Key Decisions**: 
  - [Decision 1] - [Brief rationale]
  - [Decision 2] - [Brief rationale]

## Actions Performed

### Commands Run

| Command | Exit Code | Purpose |
|---------|-----------|---------|
| `command1` | 0 | What it did |
| `command2` | 1 | What it did (if failed, note why) |

### Files Modified

- `path/to/file1` - [Brief description of changes]
- `path/to/file2` - [Brief description of changes]

### Files Created

- `path/to/newfile1` - [Purpose]
- `path/to/newfile2` - [Purpose]

### Files Deleted

- `path/to/deleted1` - [Reason]

### Tests Run

- **Backend Tests**: [Pass/Fail counts, coverage if available]
- **Frontend Tests**: [Pass/Fail counts]
- **Other**: [Any other test commands]

## Learning Moments

- [Discovery about the codebase, pattern, or convention]
- [Another insight worth remembering]

## Error Resolution Stories

### Error: [Error name/type]

**Encountered**: [When/where the error occurred]
**Investigation**: [How you debugged it]
**Solution**: [How it was fixed]
**Takeaway**: [What to remember for next time]

## Follow-ups

- [ ] [TODO item for next session]
- [ ] [Open question needing human input]
- [ ] [Technical debt introduced]

## Notes

[Any additional context, warnings, or important information]
```

## File Naming

Save the summary as: `.cursor/sessions/YYYY-MM-DD-NN-[descriptive-topic].md`

Where:
- `YYYY-MM-DD` is the date
- `NN` is a two-digit sequential number for that day (01, 02, 03, etc.)
- `[descriptive-topic]` is a descriptive, kebab-case summary of what was accomplished (5-10 words)

**To determine the sequence number:**
1. Check `.cursor/sessions/` for existing files with today's date
2. Use the next available number (if 01 exists, use 02; if none exist, use 01)

**Guidelines for descriptive topic:**
- Extract from the main accomplishment or primary feature worked on
- Use kebab-case (lowercase with hyphens)
- Be specific enough to identify the session at a glance
- Include the "what" and optionally the "why" if helpful
- Avoid generic terms like "fix", "update", "changes" unless combined with specifics

**Good examples:**
- `create-cursor-session-summarizer-command`
- `add-websocket-reconnection-logic-frontend`
- `refactor-complexity-analyzer-add-caching`
- `fix-type-errors-module-inspector-component`
- `implement-user-authentication-backend-api`

**Bad examples (too vague):**
- `session-summarizer` (what about it?)
- `fix-websocket` (what was fixed?)
- `add-tests` (tests for what?)
- `update-code` (too generic)

**Example**: `.cursor/sessions/2024-01-15-01-create-cursor-session-summarizer-command.md`

## Important Notes

- Be thorough but concise - capture everything meaningful
- Include actual command output snippets if they're relevant to understanding what happened
- For learning moments, focus on things that would help future sessions
- For error stories, make them actionable - someone should be able to use this to debug similar issues
- If no errors occurred, you can omit that section
- If no learning moments were particularly notable, you can omit that section

