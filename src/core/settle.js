function validateStatus(status) {
  return status >= 200 && status < 300;
}

function settle(resolve, reject, responce) {
  if(validateStatus(responce.statusCode)) {
    resolve(responce)
  } else {
    reject(responce)
  }
}

module.exports = settle