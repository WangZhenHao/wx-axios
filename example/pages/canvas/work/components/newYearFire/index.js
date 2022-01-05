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

Component({
  properties: {},
  data: {},
  ready() {
    setTimeout(() => {
      const canvas1 = getCanvas('.canvas1', this.createSelectorQuery);
      const canvas2 = getCanvas('.canvas2', this.createSelectorQuery);

      Promise.all([canvas1, canvas2]).then((res) => {
        canvas = res[0].canvas;
        ctx = res[0].ctx;

        fontCtx = res[1].ctx;
        fontCanvas = res[1].canvas;

        animate();

        
      });
    }, 1000);
  },
  methods: {
    tapHandle() {
        this.created()
    },
    created() {
      var textArr = ['新年快乐', '阖家幸福', '一帆风顺', '恭喜发财'];
      var a = getRandom(0, 10) >= 5 ? 1 : 2;
      var dots;
      if (a === 1) {
        const text = textArr[parseInt(getRandom(0, 4))];
        dots = Boom.createWordPoint(fontCtx, fontCanvas, {
          text,
          dr: 12,
        });
      } else {
        dots = null;
      }

      var booms = new Boom(
        { x: parseInt(getRandom(30, canvas._width)), y: canvas._height },
        {
          x: parseInt(getRandom(100, canvas._width)),
          y: parseInt(getRandom(100, canvas._height / 2)),
        },
        {
          ctx,
          canvas,
          dots,
        }
      );

      bigbooms.push(booms);
    },
  },
});
