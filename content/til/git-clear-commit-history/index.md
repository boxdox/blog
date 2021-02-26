---
title: Git - Clear Commit History
date: 2019-12-25
language: en
tags:
  - git
---

Copied shamelessly from [StackOverflow](https://stackoverflow.com/a/26000395)

1. Checkout to an orphan branch
```shell
git checkout --orphan temp_branch
```

2. Add all files and commit
```shell
git add -A
git commit -am "commit message"
``` 

3. Delete the branch
```shell
git branch -D master
```

4. Rename current branch to master
```shell
git branch -m master
```

5. Force push to remote
```shell
git push -f origin master
```