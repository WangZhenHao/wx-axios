const { getCanvas }  = require('./fire/utitls')
const { Boom, putValue } = require('./fire/index.js')

function getRandom(a, b) {
  return Math.random() * (b - a) + a;
}

const res = require('./fire/index');
let canvas, ctx, bigbooms = [];

function animate() {
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  ctx.globalAlpha = 0.1;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  var newTime = new Date();

  bigbooms.forEach(function (item) {
    var that = this;
    if (!item.dead) {
      item._move();
      item._drawLight();
    } else {
      item.booms.forEach(function (subItem, index) {
        if (!subItem.dead) {
          subItem.moveTo();
        } else if (index === item.booms.length - 1) {
          bigbooms.splice(bigbooms.indexOf(item), 1);
        }
      });
    }
  });

  canvas.requestAnimationFrame(animate);
}

Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.createSelectorQuery()
    //   .select('#canvas')
    //   .fields({
    //     node: true,
    //     size: true,
    //   })
    //   .exec(this.init.bind(this));
    var canvas1 = getCanvas('#canvas');
    var canvas2 = getCanvas('#canvas2');
    
    Promise.all([canvas1, canvas2]).then(res => {
        var arr = []
        // this.init(res[0])

        canvas = res[0][0].node;
        ctx = canvas.getContext('2d');

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

          var x = getRandom(canvas._width/5 , canvas._width*4/5);
          var y = canvas._width / 2;

          var bigboom = new Boom({ x: canvas._width / 2, y: canvas._height } , 4,"#FFF" , { x:x , y:y }, null, { ctx, canvas });

          bigbooms.push(bigboom)

        animate()
    })
  },
  init(res) {
    const width = res[0].width;
    const height = res[0].height;

    canvas = res[0].node;
    ctx = canvas.getContext('2d');

    const dpr = wx.getSystemInfoSync().pixelRatio;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.arc(width / 2, 100, 50, 0, 2 * Math.PI);
    ctx.fillStyle = 'red'
    ctx.fill();
    // console.log(canvas)
    // var random = Math.random()*100>30?true:false;
    var x = getRandom(width/5 , width*4/5);
    var y = width / 2;

    var bigboom = new Boom({ x: width / 2, y: height } , 4,"#FFF" , { x:x , y:y }, null, { ctx, canvas });
    // bigbooms.push(bigboom)

    // animate(ctx, canvas)
    // animate()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
