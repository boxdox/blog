---
title: Every developer should have these git aliases!
description: Git aliases increase developer's productivity. Here are few of my favorites!
date: 2020-04-12
language: en
tags:
  - git
---

1. Amend last commit, without editing commit message:
```shell
amend = !git add -A && git commit --amend --no-edit
```

2. Sync and rebase with remote:
```shell
f = !git fetch --all && git rebase origin/master
```

3. Compact status:
```shell
st = !git status -sb
```

4. Pretty git logs (single line):
```shell
ls = !git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
```

{{< image src="pretty-log.jpg" alt="pretty log with git" >}}
pretty log using `git ls`
{{</ image >}}

1. Remove merged branches (needs `grep` and `xargs`):
```shell
rmb = !git branch --merged | grep -v '*' | xargs -n 1 git branch -d
```
6. Push annotated tags simultaneously to master:
```shell
gpt = !git push origin master --follow-tags
```

At the end, some general purpose ones:
```shell
alias gac="git add . && git commit -m"
alias gi="git init"
alias gb="git branch"
alias gc="git checkout"
alias gcb="git checkout -b"
alias gra="git remote add"
alias gpm="git push origin master"
alias gsu="git stash -u -k"
alias undo="reset --soft HEAD^"
```
