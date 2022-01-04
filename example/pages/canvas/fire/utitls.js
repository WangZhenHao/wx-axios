function getCanvas(id) {
    return new Promise((resolve) => {
        wx.createSelectorQuery()
        .select(id)
        .fields({
            node: true,
            size: true,
        })
        .exec(function(res) {
            resolve(res)
        });
    })
    
}
function getRandom(a, b) {
    return Math.random() * (b - a) + a;
}

function canvasGetImageData(canvasId, width, height) {
    debugger
    return new Promise((resolve, rejext) => {
        wx.canvasGetImageData({
            canvasId,
            x: 0,
            y: 0,
            width,
            height,
            success: (res) => {
                debugger
                resolve(res)
            },
            complete: (res) => {
                debugger
            }
        })
    })
    
}

function getimgData(canvas, context, dr) {
    var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    context.clearRect(0, 0, canvas._width, canvas._height);
    var dots = [];
    
    for(var x = 0; x < imgData.width; x += dr) {
        for(var y = 0; y < imgData.height; y += dr) {
            var i = (y * imgData.width + x) * 4;
            
            var r = imgData.data[i];
            var g = imgData.data[i + 1];
            var b = imgData.data[i + 2];
            var a = imgData.data[i + 3];

            if(a > 128) {
            // if(r === 255 && g === 0 && b === 0) {
                dots.push({
                    x: x,
                    y: y,
                    nowX: 0
                })
            }
        }
    }
    // for (var x = 0; x < imgData.width; x += dr) {
    //   for (var y = 0; y < imgData.height; y += dr) {
    //     var i = (y * imgData.width + x) * 4;
    //     if (imgData.data[i + 3] > 128) {
    //       var dot = {
    //         x: x,
    //         y: y,
    //         a: imgData.data[i],
    //         b: imgData.data[i + 1],
    //         c: imgData.data[i + 2],
    //       };
    //       dots.push(dot);
    //     }
    //   }
    // }
    return dots;
  }

module.exports = {
    getCanvas,
    getRandom,
    getimgData,
    canvasGetImageData
}