//index.js
//获取应用实例 
const app = getApp()
const axios = require('../../dist/wx-axois')
const req = require('./js/request.js')

console.log(req.defaults)
Page({
  onLoad: function () {
    this.axios = axios.create({
      header: {
        'my-hearder': '111',
      },
      baseURL: 'https://life.365gl.com'
    })
    console.log(this.axios.defaults)

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
  pageLoad() {
    req.get('/sugrec', {pre: 1,
    p: 3,
    ie: 'utf-8',
    json: 1,
    prod: 'pc',
    from: 'pc_web',
    sugsid: '37374,36557,37354,36885,37397,36569,37407,36789,37071,37317,26350,37285,37371',
    wd: '111',
    req: 2,
    csor: 4}).then(res => {

    })

    req.get('/sugrec', { wd: '2222' }).then(res => {

    })

    req.get('/sugrec', { wd: '3333' }).then(res => {

    })
    req.get('/sugrec', { wd: '444' }).then(res => {

    })
  }
})
