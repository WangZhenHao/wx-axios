//index.js
//获取应用实例
const app = getApp()
const axios = require('../../dist/wx-axois')
console.log(axios.cancelToken.source())
Page({
  onLoad: function () {
    console.log(111)
    this.axios = new axios({
      timeout: 0,
      header: {
        'my-hearder': '1111'
      }
    });

    this.axios.interceptors.response.use(function(res) {
      return res;
    }, function(reject) {
      return reject
    })

    this.axios.interceptors.request.use(function(res) {
      return res;
    })
  },
  testPost() {
    this.axios.post('http://www.baidu.com/tes', {wzh: 'wzh'}).then(res => {
      console.log(res)
    }).catch(res => {
      console.log(res)
    })
  },
  testRequest() {

    this.axios.request({
      url: 'http://www.baidu.com/tset'
    }).then(res => {
      console.log(res, 'resolve')
    }).catch(res => {
      console.log(res, 'resolve')
    })

  },
  testCanel() {
    const source = axios.cancelToken.source();

    this.axios.request({
      url: 'http://www.baidu.com/tset',
      cancelToken: source.token
    }).then(res => {
      console.log(res, 'resolve')
    }).catch(res => {
      console.log(res, 'resolve')
    })

    source.cancel('取消请求')
  } 
})
