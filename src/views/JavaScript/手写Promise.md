---
title: 手写Promise
date: 2020-09-25
# 置顶: 降序，可以按照 1, 2, 3, ... 来降低置顶文章的排列优先级
# sticky: 1
tags:
  - Promise
categories:
  - JavaScript
---

> 简单的实现

```js
const Promise = function(fn) {
  this.resolvedCallbacks = []
  this.rejectedCallbacks = []
  fn.call(this, this.resolve.bind(this), this.reject.bind(this))
}

Promise.prototype = {
  then: function(callback) {
    this.resolvedCallbacks.push(callback)
    return this
  },
  catch: function(callback) {
    this.rejectedCallbacks.push(callback)
    return this
  },
  resolve: function(data) {
    setTimeout(() => {
      this.resolvedCallbacks.reduce((result, fn) => {
        return fn(result)
      }, data)
    })
  },
  reject: function(data) {
    setTimeout(() => {
      this.rejectedCallbacks.reduce((result, fn) => {
        return fn(result)
      }, data)
    })
  }
}
```
