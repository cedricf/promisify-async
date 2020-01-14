/** @license MIT License (c) copyright 2010-2014 original author or authors */

'use strict';

class PromisifyAsync {

  constructor() {
    this.correlationMap = new Map();
  }

  createPromise(correlationId) {
    var promiseResolve, promiseReject;
    return new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
      this.correlationMap.set(correlationId, {
        resolve: promiseResolve,
        reject: promiseReject,
      });
    }.bind(this)).then(value => {
      this.correlationMap.delete(correlationId, 1);
      return value;
    });

  };

  resolveForCorrelationId(correlationId, value) {
    this.correlationMap.get(correlationId).resolve.call(this, value);
  }
}

module.exports = PromisifyAsync;