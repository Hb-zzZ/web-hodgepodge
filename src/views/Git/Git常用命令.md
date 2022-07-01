---
title: Git常用命令
date: 2022-7-1
# 置顶: 降序，可以按照 1, 2, 3, ... 来降低置顶文章的排列优先级
sticky: 1
tags:
  - Git
categories:
  - Git
---

### 取得两个tag之间的commit

`git log --pretty=oneline tagA...tagB `(i.e. three dots)

If you just wanted commits reachable from tagB but not tagA:

`git log --pretty=oneline tagA..tagB `(i.e. two dots)

or

`git log --pretty=oneline ^tagA tagB`

[参考链接](https://stackoverflow.com/questions/5863426/get-commit-list-between-tags-in-git)


### 复制commit到指定分支

一次转移单个或多个提交：

`git cherry-pick commit1 commit2`

多个连续的commit，也可区间复制：

`git cherry-pick commit1^..commit2`

[参考链接](https://juejin.cn/post/7071780876501123085#heading-11)