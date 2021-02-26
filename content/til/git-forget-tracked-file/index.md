---
title: Git - Forget Tracked File
date: 2020-04-02
language: en
tags:
  - git
---

_It happened to me quite a few times, so adding it here for my future self._

So you committed a file to remote, and realized it should've been ignored by Git. You add it to `.gitignore`, but somehow, git still remembers the file. Here's a quick fix:

From this [stack overflow answer](https://stackoverflow.com/a/1274447):

For a list of files

```shell
git rm --cached <file1> <file2>
```

For a directory:

```shell
git rm -r --cached <folder>
```
