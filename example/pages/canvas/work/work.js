// pages/canvas/work/work.js
const { getCanvas, getRandom } = require('./js/utitls.js');
const Boom = require('./js/Boom.js');

let canvas,
  ctx,
  bigbooms = [],
  fontCtx,
  fontCanvas;

function animate() {
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  ctx.globalAlpha = 0.1;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  bigbooms.forEach((item) => {
    if (!item.dead) {
      item.move();
    } else {
      item.booms.forEach((subItem, index) => {
        if (!subItem.dead) {
          subItem.move();
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
    const canvas1 = getCanvas('#canvas');
    const canvas2 = getCanvas('#canvas2');

    Promise.all([canvas1, canvas2]).then((res) => {
      canvas = res[0].canvas;
      ctx = res[0].ctx;

      fontCtx = res[1].ctx;
      fontCanvas = res[1].canvas;

      // bigbooms.push(
      //   new Boom(
      //     { x: canvas._width / 2 + 30, y: canvas._height },
      //     { x: canvas._width / 2, y: 200 },
      //     {
      //       ctx: ctx,
      //     }
      //   )
      // );
      // var textArr = ['新年快乐', '阖家幸福', '一帆风顺', '恭喜发财']
      // setInterval(() => {
      //   var a = getRandom(0, 10) >= 5 ? 1 : 2;
      //   var dots
      //   if(a === 1) {
      //     const text = textArr[parseInt(getRandom(0, 4))]
      //     dots = Boom.createWordPoint(fontCtx, fontCanvas, {
      //           text,
      //           dr: 12
      //     });
      //   } else {
      //     dots = null;
      //   }

      //   var booms = new Boom(
      //     { x: parseInt(getRandom(30, canvas._width)), y: canvas._height },
      //     { x: parseInt(getRandom(100, canvas._width)), y: parseInt(getRandom(100, canvas._height / 2)) },
      //     {
      //       ctx,
      //       canvas,
      //       dots
      //     }
      //   )
        
      //   bigbooms.push(booms);
      // }, 500)

      // setTimeout(() => {
      //   const dots = Boom.createWordPoint(fontCtx, fontCanvas, {
      //     text: '撒旦飞洒',
      //     dr: 12
      //   });
      //   bigbooms.push(
      //     new Boom(
      //       { x: canvas._width / 2 - 30, y: canvas._height },
      //       { x: canvas._width / 2, y: 200 },
      //       {
      //         ctx: ctx,
      //         dots,
      //         canvas,
      //       }
      //     )
      //   );
      // }, 500);
      // debugger
      animate();
    });
  },
  tapHandle() {
    bigbooms.push(
      new Boom(
        { x: canvas._width / 2 + 30, y: canvas._height },
        { x: canvas._width / 2, y: 200 },
        {
          ctx: ctx,
        }
      )
    );

    setTimeout(() => {
      const dots = Boom.createWordPoint(fontCtx, fontCanvas, {
        text: '新年快乐',
        dr: 12
      });
      bigbooms.push(
        new Boom(
          { x: canvas._width / 2 - 30, y: canvas._height },
          { x: canvas._width / 2, y: 200 },
          {
            ctx: ctx,
            dots,
            canvas,
          }
        )
      );
    }, 500);
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
