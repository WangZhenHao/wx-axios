const axios = require('../../../dist/wx-axois')

const request = axios.create({
    baseURL: 'https://www.baidu.com'
})
let  userInfo = '' 
let loadingWating = false;
let index = 0;
let timer = ''
function login() {
    
    return new Promise((resolve, reject) => {
        if(userInfo) {
            resolve(userInfo)
        } else if(loadingWating) {
            clearTimeout(timer)
            function getInfo() {
                console.log(index++)
                if(userInfo) {
                    resolve(userInfo)
                } else {
                    timer = setTimeout(() => {
                        getInfo()
                    }, 100)
                }
            }

            getInfo()
        } else {
            loadingWating = true;
            setTimeout(() => {
                userInfo = { name: 'ss', age: 29 }
                loadingWating = false;
                resolve(userInfo);
            }, 3000)
        }
        
    })
}

request.interceptors.request.use(function(cnofig) {
    return new Promise((resolve, reject) => {
        login().then(() => {
            resolve(cnofig)
        })
    })
})

module.exports = request