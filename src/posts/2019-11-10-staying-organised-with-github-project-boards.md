---
title: Staying organised with GitHub project boards
description: How GitHub project boards and issues help me stay on track.
date: 2019-11-10
---

One of my biggest problems with side projects is that I have too many of them, and too little time to work on them. Then, when I come back to a project after a break, I often find it difficult to remember:

- what I was working on last
- what I wanted to do next
- if there are any existing issues I need to tackle

## What doesn't work

I've tried a few things without success:

- Trello board: I forget it's there and never look at it
- TODO notes in the code: they're too scattered, and I forget to address them
  - similarly, a separate TODO list file requires maintenance, and I don't like committing it with the code
- a physical notebook: I misplace the notebook, forget which notebook I was using, or just don't look at those pages again

I don't have this problem at my day job, primarily because there we use Jira, do more focused work, and have a very effective Product Owner who keeps everyone on track. Jira would be overkill for my use case, and somehow I don't think my PO wants to help manage my side projects...

## Enter GitHub project boards

What _has_ been working for me is a [GitHub project board][gh-boards]. They're free with all account types and can work in combination with your project's issues, or as a stand-alone kanban board. When you set up the board, you can pick from a few pre-defined templates, and my favourite is the 'Automated kanban':

> Kanban-style board with built-in triggers to automatically move issues and pull requests across To do, In progress and Done columns.

If you work with other people, the 'Automated kanban with reviews' might be better, as it includes automation related to pull request reviews.

### My workflow

1. As soon as I think of something I need to tackle in a project (a new feature, a bug or anything else) I open an issue on the project's issue tracker. When creating the issue, I assign it to my project board.

   <img src="/images/posts/2019/add-new-issue.png" alt="">

2. Because I chose the 'Automated kanban' board template, these issues become cards in the 'To do' column of my board.

   <img src="/images/posts/2019/project-board-overview.png" alt="">

3. When I have time to work on the issue, I create a branch.
4. When the work is done, I open a new pull request, making sure to use [a keyword][issue-keywords] in the description so the issue will be closed when the <abbr title="Pull Request">PR</abbr> is merged. As when creating an issue, I assign the PR to my project board, which moves the card to the 'In progress' column of the project board.
5. Once the <abbr title="Pull Request">PR</abbr> is merged and the issue is closed, the card is moved automatically into the 'Done' column of the project board.

### Why it works

When I return to a project after some time away, I can go to the project board and scan through the columns to get a refresher on what work's been completed, and what's left to be done. It also gives me a sense of accomplishment to see what I've already worked on, which often gives me a little boost of incentive to move on the project.

Forcing myself to create an issue for each piece of work means I also end up breaking the project down into manageable pieces - again, this is really helpful when I haven't looked at the project in a while and feel a bit overwhelmed by what still needs to be done.

Other benefits:

- The issues and project board are co-located with my code on GitHub, so it's the single source of truth for anything related to the project.
- The automation helps me keep on top of things without extra busywork.
- Being able to tag issues means I can use this workflow for post ideas, bugs, features, investigation tasks - anything at all.
- While it's not as full-featured as a tool like Jira, that means it's also not as overwhelming. The UI is clean and straight-forward.

## More resources

For larger projects (or projects with other collaborators) you could add multiple project boards for different aspects of the work. You can create user-owned boards, organisation boards, or repository boards (as I've done here). [Read more about managing project boards][gh-board-managing].

If you're not using GitHub, you could give [GitLab's issue boards][gl-boards] a go, or try [Bitbucket's Trello integration][bb-trello].

[gh-boards]: https://help.github.com/en/github/managing-your-work-on-github/about-project-boards
[gh-board-managing]: https://help.github.com/en/github/managing-your-work-on-github/managing-project-boards
[bb-trello]: https://bitbucket.org/product/features/trello-boards
[gl-boards]: https://about.gitlab.com/product/issueboard/
[issue-keywords]: https://help.github.com/en/github/managing-your-work-on-github/closing-issues-using-keywords
