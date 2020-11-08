function cancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve
  })

  var token = this;
  executor(function calcel(message) {
    if(token.reason) {
      return;
    }

    token.reason = 'calcel ' + message;
    resolvePromise(token.reason)
  })
}

cancelToken.source = function() {
  var cancel;
  var token = new cancelToken(function(c) {
    cancel = c;
  })

  return {
    token: token,
    cancel: cancel
  }
}

module.exports = cancelToken;