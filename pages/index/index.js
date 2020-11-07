//index.js
//获取应用实例
const app = getApp()
const axios = require('../../utils/wx-axios/index.js')
Page({
  onLoad: function () {
    // this.testRequest()
    this.axios = new axios({
      timeout: 0
    });

    this.axios.interceptors.response.use(function(res) {
      debugger
      return res;
    }, function(reject) {
      debugger
      return reject
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
  }
})
