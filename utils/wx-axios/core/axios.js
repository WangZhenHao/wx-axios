const mergeConfig = require('./mergeConfig.js')
const dispatchRequest = require('./dispatchRequest.js')
const InterceptorManager = require('./interceptorManager.js')

function wxAxios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  }
}

wxAxios.prototype = {
  request(config = {}) {
    config = mergeConfig(this.defaults, config)
    
    if(!config.method) {
      config.method = 'get'
    }
    config.method = config.method.toLowerCase();
    
    var chain = [dispatchRequest, null];
    var promise = Promise.resolve(config)

    this.interceptors.request.forEach(function unshfitRequsetInterceptors(intercetpor) {
      chain.unshift(intercetpor.fulfilled, interceptor.rejected)
    })
    this.interceptors.response.forEach(function pushResponseInterceptors(intercetpor) {
      chain.push(intercetpor.fulfilled, interceptor.rejected)
    })

    while(chain.length) {
      promise = promise.then(chain.shift(), chain.shift())
    }

    return promise;
  },
}

module.exports = wxAxios;