var Frag = function (centerX, centerY, radius, color, tx, ty, ctx) {
  this.tx = tx;
  this.ty = ty;
  this.x = centerX;
  this.y = centerY;
  this.dead = false;
  this.centerX = centerX;
  this.centerY = centerY;
  this.radius = radius;
  this.color = color;
  this.ctx = ctx;
};

Frag.prototype = {
  paint: function () {
    // ctx.beginPath();
    // ctx.arc(this.x , this.y , this.radius , 0 , 2*Math.PI);
    this.ctx.fillStyle =
      'rgba(' + this.color.a + ',' + this.color.b + ',' + this.color.c + ',1)';
    this.ctx.fillRect(
      this.x - this.radius,
      this.y - this.radius,
      this.radius * 2,
      this.radius * 2
    );
  },
  moveTo: function () {
    this.ty = this.ty + 0.3;
    var dx = this.tx - this.x,
      dy = this.ty - this.y;
    this.x = Math.abs(dx) < 0.1 ? this.tx : this.x + dx * 0.1;
    this.y = Math.abs(dy) < 0.1 ? this.ty : this.y + dy * 0.1;
    if (dx === 0 && Math.abs(dy) <= 80) {
      this.dead = true;
    }
    this.paint();
  },
};
var Boom = function (startAare, r, c, boomArea, shape, options) {
  this.booms = [];
  this.x = startAare.x;
  this.y = startAare.y + r;
  this.r = r;
  this.c = c;
  this.shape = shape || false;
  this.boomArea = boomArea;
  this.theta = 0;
  this.dead = false;
  this.ba = parseInt(getRandom(80, 200));
  this.ctx = options.ctx;
};

Boom.prototype = {
  _paint: function () {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.c;
    this.ctx.fill();
    this.ctx.restore();
  },
  _move: function () {
    var dx = this.boomArea.x - this.x,
      dy = this.boomArea.y - this.y;
    this.x = this.x + dx * 0.01;
    this.y = this.y + dy * 0.01;

    if (Math.abs(dx) <= this.ba && Math.abs(dy) <= this.ba) {
      if (this.shape) {
        this._shapBoom();
      } else this._boom();
      this.dead = true;
    } else {
      this._paint();
    }
  },
  _drawLight: function () {
    this.ctx.save();
    this.ctx.fillStyle = 'rgba(255,228,150,0.3)';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r + 3 * Math.random() + 1, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.restore();
  },
  _boom: function () {
    var fragNum = getRandom(100, 300);
    var style = getRandom(0, 10) >= 5 ? 1 : 2;
    var color;
    if (style === 1) {
      color = {
        a: parseInt(getRandom(128, 255)),
        b: parseInt(getRandom(128, 255)),
        c: parseInt(getRandom(128, 255)),
      };
    }

    var fanwei = fragNum;
    // var audio = document.getElementsByTagName("audio");
    // for(var i=0;i<audio.length;i++){
    // 	if(audio[i].src.indexOf("boom")>=0&&(audio[i].paused||audio[i].ended)){
    // 		audio[i].play();
    // 		break;
    // 	}
    // }
    for (var i = 0; i < fragNum; i++) {
      if (style === 2) {
        color = {
          a: parseInt(getRandom(128, 255)),
          b: parseInt(getRandom(128, 255)),
          c: parseInt(getRandom(128, 255)),
        };
      }
      var a = getRandom(-Math.PI, Math.PI);
      var x = getRandom(0, fanwei) * Math.cos(a) + this.x;
      var y = getRandom(0, fanwei) * Math.sin(a) + this.y;
      var radius = getRandom(0, 2);
      var frag = new Frag(this.x, this.y, radius, color, x, y, this.ctx);
      this.booms.push(frag);
    }
  },
  _shapBoom: function () {
      if(this.shape) {
          this.booms = this.shape
      }
    // var that = this;
    // putValue(ocas, octx, this.shape, 5, function (dots) {
    //   var dx = canvas.width / 2 - that.x;
    //   var dy = canvas.height / 2 - that.y;
    //   for (var i = 0; i < dots.length; i++) {
    //     color = { a: dots[i].a, b: dots[i].b, c: dots[i].c };
    //     var x = dots[i].x;
    //     var y = dots[i].y;
    //     var radius = 1;
    //     var frag = new Frag(that.x, that.y, radius, color, x - dx, y - dy);
    //     that.booms.push(frag);
    //   }
    // });
  },
};

// pages/canvas/index.js
Array.prototype.foreach = function (callback) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] !== null) callback.apply(this[i], [i]);
  }
};

function getimgData(canvas, context, dr) {
  var imgData = context.getImageData(0, 0, canvas._width, canvas._height);
  context.clearRect(0, 0, canvas._width, canvas._height);
  var dots = [];
  for (var x = 0; x < imgData.width; x += dr) {
    for (var y = 0; y < imgData.height; y += dr) {
      var i = (y * imgData.width + x) * 4;
      if (imgData.data[i + 3] > 128) {
        var dot = {
          x: x,
          y: y,
          a: imgData.data[i],
          b: imgData.data[i + 1],
          c: imgData.data[i + 2],
        };
        dots.push(dot);
      }
    }
  }
  return dots;
}

function getRandom(a, b) {
  return Math.random() * (b - a) + a;
}

function putValue(canvas , context , ele , dr){
    context.clearRect(0,0,canvas.width,canvas.height);
    var text = ele.innerHTML;
    context.save();
    var fontSize =200;
    context.font = fontSize+"px 宋体 bold";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "rgba("+parseInt(getRandom(128,255))+","+parseInt(getRandom(128,255))+","+parseInt(getRandom(128,255))+" , 1)";
    context.fillText(text , canvas._width/2 , canvas._height/2);
    context.restore();
    var dots = getimgData(canvas , context , dr);
    var dx = canvas._width/2-ele.x;
    var dy = canvas._height/2-ele.y;

    let booms = []
    for(var i=0;i<dots.length;i++){
        var color = {a:dots[i].a,b:dots[i].b,c:dots[i].c}
        var x = dots[i].x;
        var y = dots[i].y;
        var radius = 1;
        var frag = new Frag(ele.x , ele.y , radius , color , x-dx , y-dy, ele.ctx);
        booms.push(frag);
    }
    callback(booms);

    return booms;
}
module.exports = {
    Boom,
    putValue
};
