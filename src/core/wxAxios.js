const mergeConfig = require('./mergeConfig.js')
const createDispatchRreuest = require('./dispatchRequest.js')
const InterceptorManager = require('./interceptorManager.js')
// const defaults = require('../defaults.js')
const methods = ['get', 'post', 'put']
function wxAxios(instanceConfig) {
  // this.defaults = mergeConfig(defaults, instanceConfig);
  this.defaults = instanceConfig
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
    const dispatchRequest = createDispatchRreuest()
    var chain = [dispatchRequest, null];
    var promise = Promise.resolve(config)

    this.interceptors.request.forEach(function unshfitRequsetInterceptors(intercetpor) {
      chain.unshift(intercetpor.fulfilled, intercetpor.rejected)
    })
    this.interceptors.response.forEach(function pushResponseInterceptors(intercetpor) {
      chain.push(intercetpor.fulfilled, intercetpor.rejected)
    })
    
    while(chain.length) {
      promise = promise.then(chain.shift(), chain.shift())
    }

    return promise;
  },
}
methods.forEach((method) => {
  wxAxios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      url: url,
      data: data,
      method: method
    }))
  }
})
module.exports = wxAxios;