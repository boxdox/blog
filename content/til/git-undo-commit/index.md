---
title: Git - Undo Commit
date: 2020-05-25
language: en
tags:
  - git
---

Unless you have pushed your commit to remote, you can always undo your
last commit, you can try a couple different options:

From this [stack overflow answer](https://stackoverflow.com/a/927386):

Reset and unstage all changes of last commit (so all files appear under
`Untracked Files`):

```shell
git reset HEAD~
```

Reset and keep previously added files staged (so all files previously
selected show under `Changes to be committed`)

```shell
git reset --soft HEAD~
```

Make changes to your files

Stage your changes

```shell
git add -A
```

Don't forget to make a commit

```shell
git commit -m "my awesome commit message"
```
