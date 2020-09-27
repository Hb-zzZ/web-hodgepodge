---
title: 手写Promise
date: 2020-09-25
# 置顶: 降序，可以按照 1, 2, 3, ... 来降低置顶文章的排列优先级
# sticky: 1
tags:
  - Promise
  - JavaScript
categories:
  - JavaScript
---

## 简单的实现

```js
class Promise {
  resolvedCallbacks = []
  rejectedCallbacks = []

  constructor(fn) {
    fn.call(this, this._resolve.bind(this), this._reject.bind(this))
  }

  then(callback) {
    this.resolvedCallbacks.push(callback)
    return this
  }

  catch(callback) {
    this.rejectedCallbacks.push(callback)
    return this
  }

  _resolve(data) {
    // 加入setTimeout支持同步resolve
    setTimeout(() => {
      this.resolvedCallbacks.reduce((result, fn) => {
        // 链式then返回上一个then结果
        return fn(result)
      }, data)
    })
  }

  _reject(data) {
    setTimeout(() => {
      this.rejectedCallbacks.reduce((result, fn) => {
        return fn(result)
      }, data)
    })
  }
}
```

## 增强版

```js
// 定义Promise三种状态
const STATE_PENDING = 'pending'
const STATE_FULFILLED = 'fulfilled'
const STATE_REJECTED = 'rejected'

class Promise {
  callbacks = []
  // 增加当前Promise状态和结果值
  state = STATE_PENDING
  value = null

  constructor(fn) {
    fn.call(this, this._resolve.bind(this), this._reject.bind(this))
  }

  then(fulfilledFn = null, rejectedFn = null) {
    return new Promise((resolve, reject) => {
      this._handle({
        fulfilledFn,
        rejectedFn,
        resolve,
        reject
      })
    })
  }

  catch(errorFn) {
    return this.then(null, errorFn)
  }

  _handle(params = {}) {
    if (this.state === STATE_PENDING) {
      // 当前Promise还未完成，筛入队列中待执行
      this.callbacks.push(params)
    } else {
      const IS_FULFILLED = this.state === STATE_FULFILLED
      const { fulfilledFn, rejectedFn, resolve, reject } = params

      // 放入then或catch内的函数
      const actionFn = IS_FULFILLED ? fulfilledFn : rejectedFn

      let result
      let cb

      try {
        result = actionFn ? actionFn(this.value) : this.value
        cb = IS_FULFILLED ? resolve : reject
      } catch (error) {
        result = error
        cb = reject
      } finally {
        cb(result)
      }
    }
  }

  _resolve(data) {
    // resolve的是一个Promise时
    if (data instanceof Promise) {
      data.then.call(data, this._resolve.bind(this), this._reject.bind(this))
    } else {
      // 状态不可逆转
      if (this.state === STATE_PENDING) {
        this.state = STATE_FULFILLED
        this.value = data
        this.callbacks.forEach((callback) => this._handle(callback))
      }
    }
  }

  _reject(data) {
    if (this.state === STATE_PENDING) {
      this.state = STATE_REJECTED
      this.value = data
      this.callbacks.forEach((callback) => this._handle(callback))
    }
  }
}
```
