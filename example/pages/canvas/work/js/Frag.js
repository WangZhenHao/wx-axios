/*
 * @Descriptions: 每一个小点点的运动实例
 * @Autho: WangZhenHao
 * @Date: 2022-01-05 10:55:36
 * @LastEditTime: 2022-01-05 17:23:47
 */


/**
 * 
 * @param {object} startPoint  开始运动的位置 { x: '', y: '' }
 * @param {object} targetPoint 结束运动的位置 { x: '', y: '' }
 * @param {object} options     各种对象
 */
function Frag(startPoint, targetPoint, options) {
  this.x = startPoint.x;
  this.y = startPoint.y;

  this.tx = targetPoint.x;
  this.ty = targetPoint.y;

  this.dead = false;

  this.radius = options.radius;
  this.color = options.color;

  this.ctx = options.ctx;
}

Frag.prototype = {
  paint: function () {
    this.ctx.beginPath();
    this.ctx.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},1)`;
    // this.ctx.fillRect(
    //   this.x - this.radius,
    //   this.y - this.radius,
    //   this.radius * 2,
    //   this.radius * 2
    // );
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    this.ctx.fill();
  },
  // 运动算法
  move: function () {
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

module.exports = Frag;
