---
title: Good pull (or merge) request etiquette for developers
description: Tips for 
date: 2022-11-16
---

Disclaimer: your experiences, company or co-workers may not be the same as what I describe here. This is based on my own observations and opinions.

## Keep changes minimal

- It's easier to review.
- If you have to revert, you only revert a small scope of changes.

## Use atomic commits

- Split out some parts of the changes (e.g. put a big find/replace into one commit)
- If your project generates a changelog from commits, you will make everyone's life easier

## Write a clear pull request description

### Context for the change

- Knowing why a change was made

### Testing instructions

- Everyone is busy, so make it easy for them to test your change.

### Screenshots

- Not always required, but can be helpful (especially a before/after)

## Review time: Conventional comments