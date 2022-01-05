const Frag = require('./Frag');
const { getRandom, getImgData } = require('./utitls');

function Boom(startPoint, targetPoint, options) {
  this.booms = [];

  this.dead = false;
  this.radius = options.radius || 4;
  this.color = options.color || 'rgba(255,228,150,0.6)';

  this.ctx = options.ctx;
  this.canvas = options.canvas

  this.x = startPoint.x;
  this.y = startPoint.y;

  this.tx = targetPoint.x;
  this.ty = targetPoint.y;

  this.dx = this.tx - this.x;
  this.dy = this.ty - this.y;

  this.dots = options.dots;
}

Boom.prototype = {
  move() {
    // const dx = this.tx - this.x;
    // const dy = this.ty - this.y;

    this.x = this.x + this.dx * 0.01;
    this.y = this.y + this.dy * 0.01;

    if (parseInt(this.x) <= parseInt(this.tx) && parseInt(this.y) <= parseInt(this.ty)) {
      this.bigBom();
      this.dead = true;
    } else {
      this.drawLigth();
      this.paint();
    }
  },
  drawLigth() {
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius + getRandom(2, 4), 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.restore();
  },
  paint() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = '#fff';
    this.ctx.fill();
    this.ctx.restore();
  },
  bigBom() {
      if(this.dots) {
        this.wordBom();
      } else {
        this.fireBom();
      }
      
  },
  fireBom() {
    var fragNum = parseInt(getRandom(200, 300));
    var style = getRandom(0, 10) >= 5 ? 1 : 2;
    var color;

    if (style === 1) {
      color = {
        r: parseInt(getRandom(128, 255)),
        g: parseInt(getRandom(128, 255)),
        b: parseInt(getRandom(128, 255)),
      };
    }

    for (var i = 0; i < fragNum; i++) {
      if (style === 2) {
        color = {
          r: parseInt(getRandom(128, 255)),
          g: parseInt(getRandom(128, 255)),
          b: parseInt(getRandom(128, 255)),
        };
      }
      var a = getRandom(-Math.PI, Math.PI);
      var x = getRandom(0, fragNum) * Math.cos(a) + this.x;
      var y = getRandom(0, fragNum) * Math.sin(a) + this.y;
      var radius = getRandom(1, 3);
      var frag = new Frag({ x: this.x, y: this.y }, { x, y }, {
          ctx: this.ctx,
          radius,
          color
      });
      
      this.booms.push(frag);
    }
  },
  wordBom() {
    // 求出整个字体像素点的偏移量
    var dx = this.tx - this.canvas._width /  2;
    var dy = this.ty - this.canvas._height / 2;

    for(let i = 0; i < this.dots.length; i++) {
        const color = {
            r: this.dots[i].r,
            g: this.dots[i].g,
            b: this.dots[i].b
        }

        const targetX = this.dots[i].x;
        const targetY = this.dots[i].y;
        const radius = 1;
        // 设置起始位置，目标位置
        const frag = new Frag({ x: this.x, y: this.y }, { x: targetX + dx, y: targetY + dy }, { color, radius, ctx: this.ctx })

        this.booms.push(frag);
    }
  },
};

Boom.createWordPoint = function(ctx, canvas, options) {
    const dr = options.dr || 6
    const text = options.text;
    const fontSize = options.fontSize || 90

    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.save();
    ctx.font = "900 " +  fontSize + "px Microsoft YaHei";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba("+parseInt(getRandom(128,255))+","+parseInt(getRandom(128,255))+","+parseInt(getRandom(128,255))+" , 1)";
    ctx.fillText(text , canvas._width / 2 , canvas._height / 2);
    ctx.restore();
    var dots = getImgData(canvas, ctx , dr);
    
    return dots;
}

module.exports = Boom;
