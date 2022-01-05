// pages/workFire/index.js
const { getCanvas, getRandom, getimgData, canvasGetImageData }  = require('../canvas/fire/utitls')
const { Boom, putValue } = require('../canvas/fire/index.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var canvas1 = getCanvas('#canvas');
    var canvas2 = getCanvas('#canvas2');

    Promise.all([canvas1, canvas2]).then(res => {
      var arr = []
      res.forEach(item => {
        const width = item[0].width;
        const height = item[0].height;
    
        const canvasItem = item[0].node;
        const ctxItem = canvasItem.getContext('2d');
    
        const dpr = wx.getSystemInfoSync().pixelRatio;
        canvasItem.width = width * dpr;
        canvasItem.height = height * dpr;
        ctxItem.scale(dpr, dpr);
        arr.push({
          ctx: ctxItem,
          canvas: canvasItem
        })
      })

      
      const { ctx, canvas } = arr[0];

      // ctx.fillStyle = 'red';
      // ctx.arc(30, 492, 50, 0, Math.PI * 2)
      // ctx.fill()
      // debugger

      var fontSize = 200;
      ctx.font = fontSize+"px 宋体 bold";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba("+parseInt(getRandom(128,255))+","+parseInt(getRandom(128,255))+","+parseInt(getRandom(128,255))+" , 1)";
      ctx.fillText('test' , canvas._width/2 , canvas._height/2);
      debugger

      var dotList = getimgData(canvas, ctx, 10);
  
      debugger
      function draw() {
        ctx.clearRect(0, 0, canvas._width, canvas._height);
        var flag = true;
        var speed = 2;
        ctx.fillStyle = 'red';
        console.log(1)
        for(var i = 0; i < dotList.length; i++) {
            // nowX自加，等到最后的点点渲染了 flag才变成true,就不执行递归了
            if(dotList[i]['x'] > dotList[i]['nowX']) {
                dotList[i]['nowX'] += speed;
                flag = false;
            } else {
                dotList[i]['nowX'] = Math.floor(dotList[i]['x'])
            }

            ctx.beginPath();
            ctx.arc(dotList[i]['nowX'], dotList[i]['y'], 2, 0, Math.PI * 2)
            ctx.fill();

        }  
        
        if(flag) {
            return
        }
        
        canvas.requestAnimationFrame(draw)


      }
      draw()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})