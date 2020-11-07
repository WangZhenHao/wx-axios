const settle = require('./settle.js')

function dispatchRequest(config) {
  const {
    url,
    data,
    header,
    timeout,
    method,
    dataType,
    responseType
  } = config

  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      header,
      timeout,
      method,
      dataType,
      responseType,
      success: (response) => {
        settle(resolve, reject, response)
      },
      fail: (reason) => {
        reject(reason)
      }
    })
  })
  
}

module.exports = dispatchRequest