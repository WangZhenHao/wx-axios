const axios = require('../../../dist/wx-axois')

const request = axios.create({
    baseURL: 'https://www.baidu.com'
})

request.interceptors.request.use(function(cnofig) {
    return cnofig;
})

module.exports = request