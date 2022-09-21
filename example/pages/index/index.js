//index.js
//获取应用实例 
const app = getApp()
const axios = require('../../dist/wx-axois')
const req = require('./js/request.js')

console.log(req.defaults)
Page({
  onLoad: function () {
 
    // axios({
    //   method: 'post',
    //   url: 'http://www.baidu.com/test',
    //   data: {
    //     name: 'wzh'
    //   }
    // }).then(res => {
    //   console.log(res)
    // }).catch(res => {

    // })
    // console.log(axios.post)
    this.axios = axios.create({
      header: {
        'my-hearder': '111',
      },
      baseURL: 'https://life.365gl.com'
    })
    console.log(this.axios.defaults)
    // a.get('/kstore/mobile/citybanner/getAdvertBanner', {
    //   activityPicType: 1,
    //   cityId: 62,
    //   bannerPosition: 1
    // }).then(res => {
    //   console.log(res)
    // }).catch(res => {

    // })
    // this.axios = new axios({
    //   timeout: 0,
    //   header: {
    //     'my-hearder': '1111'
    //   },
    //   baseURL: 'http://www.baidu.com'
    // });

    // this.axios.interceptors.response.use(function(res) {
    //   return res;
    // }, function(reject) {
    //   return reject
    // })

    this.axios.interceptors.request.use(function(res) {
      return res;
    })
  },
  testPost() {
    this.axios.post('/tes', {wzh: 'wzh', list: {name: 'wzh', age: 2}}).then(res => {
      console.log(res)
    }).catch(res => {
      console.log(res)
    })
  },
  testGet() {
    this.axios.get('/tes', {wzh: 'wzh', list: [1,2,3,4]}).then(res => {
      console.log(res)
    }).catch(res => {
      console.log(res)
    })
  },
  testRequest() {

    this.axios.request({
      url: '/tset',
      data: {
        name: 'wzh'
      }
    }).then(res => {
      console.log(res, 'resolve')
    }).catch(res => {
      console.log(res, 'resolve')
    })

  },
  testCanel() {
    const source = axios.cancelToken.source();

    this.axios.request({
      url: '/tset',
      cancelToken: source.token
    }).then(res => {
      console.log(res, 'resolve')
    }).catch(res => {
      console.log(res, 'resolve')
    })

    source.cancel('取消请求')
  },
  testLogin() {
    req.get('/sugrec', { wd: '测试' }).then(res => {

    })
  }
})
