# 参考axios的写法，用法而封装的微信小程序requset请求

```
小程序导入example目录即可访问
```

```
const wxAxios = require('../../dist/wx-axois')

wxAxios.get(xxxx)
wxAxios.post(xxxx)
wxAxios.request({xxxx})

或者

axios = wxAxios.create({
  timeout: 0,
  header: {
    'my-hearder': '1111'
  },
  baseURL: ''
});

axios.interceptors.response.use(function(res) {
  return res;
}, function(reject) {
  return reject
})

axios.interceptors.request.use(function(res) {
  return res;
})

// get请求
axios.get('http://www.baidu.com/tes', {wzh: 'wzh'}).then(res => {
  console.log(res)
}).catch(res => {
  console.log(res)
})

// post请求
axios.post('http://www.baidu.com/tes', {wzh: 'wzh'}).then(res => {
  console.log(res)
}).catch(res => {
  console.log(res)
})

// 取消请求
const source = wxAxios.cancelToken.source();

axios.request({
  url: 'http://www.baidu.com/tset',
  cancelToken: source.token
}).then(res => {
  console.log(res, 'resolve')
}).catch(res => {
  console.log(res, 'resolve')
})

source.cancel('取消请求')

```

```
// 安装依赖
npm install

// 开发
npm run dev

// 构建
npm run build
```