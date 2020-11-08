const settle = require('./settle.js')

function dispatchRequest(config) {
  const {
    url,
    data,
    header,
    timeout,
    method,
    dataType,
    responseType,
    cancelToken
  } = config

  return new Promise((resolve, reject) => {
    let request = wx.request({
      url,
      data,
      header,
      timeout,
      method,
      dataType,
      responseType,
      success: (response) => {
        response.config = config
        settle(resolve, reject, response)
      },
      fail: (reason) => {
        reject(reason)
      }
    })

    if(cancelToken) {
      cancelToken.promise.then(function onCanceled(cancel) {
        if(!request) {
          return
        }

        request.abort();
        reject(cancel)
        request = null;
      })
    }
  })
  
}

module.exports = dispatchRequest