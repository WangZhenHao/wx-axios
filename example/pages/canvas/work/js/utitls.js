const dpr = wx.getSystemInfoSync().pixelRatio;

/**
 * 获取注册canvas实例
 * @param {string} id
 * @returns Promoise
 */
function getCanvas(id) {
  return new Promise((resolve) => {
    wx.createSelectorQuery()
      .select(id)
      .fields({
        node: true,
        size: true,
      })
      .exec(function (res) {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');

        const width = res[0].width;
        const height = res[0].height;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        resolve({
          ctx,
          canvas,
        });
      });
  });
}
function getRandom(a, b) {
  return Math.random() * (b - a) + a;
}

/**
 * 获取像素点
 * @param {*} canvas 
 * @param {*} context 
 * @param {*} dr 
 * @returns 
 */
function getImgData(canvas, context, dr) {
  var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
  //   context.clearRect(0, 0, canvas.width, canvas.height);
  var dots = [];
  for (var x = 0; x < imgData.width; x += dr) {
    for (var y = 0; y < imgData.height; y += dr) {
      var i = (y * imgData.width + x) * 4;
      if (imgData.data[i + 3] > 128) {
        var dot = {
          x: x / dpr,
          y: y / dpr,
          r: imgData.data[i],
          g: imgData.data[i + 1],
          b: imgData.data[i + 2],
        };
        dots.push(dot);
      }
    }
  }
  return dots;
}

module.exports = {
  getCanvas,
  getRandom,
  getImgData
};
