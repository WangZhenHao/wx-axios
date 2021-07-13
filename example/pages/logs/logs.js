//logs.js
const util = require('../../utils/util.js');

const getNow = function () {
  return window && window.performance && window.performance.now
    ? window.performance.now() + window.performance.timing.navigationStart
    : +new Date();
};

const ease = {
  // easeOutQuint
  swipe: {
    style: 'cubic-bezier(0.23, 1, 0.32, 1)',
    fn: function (t) {
      return 1 + --t * t * t * t * t;
    },
  },
  // easeOutQuard
  swipeBounce: {
    style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    fn: function (t) {
      return t * (2 - t);
    },
  },
  // easeOutQuart
  bounce: {
    style: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
    fn: function (t) {
      return 1 - --t * t * t * t;
    },
  },
};
Page({
  data: {
    transitionDuration: '0ms',
    transform: 'translate(0px,0px) translateZ(0px)',
    momentumLimitTime: 300,
    transitionTimingFunction: ease.bounce,
    bounceTime: 800
  },
  onLoad: function () {
    this.x = 0;
    this.y = 0;
    this.pointY = 0;
    this.startY = 0;
    this.initiated = false;
    this.minScrollY = 0;
    this.maxScrollY = 0;
  },
  touchstartHandle(e) {
    // debugger
    const res = e.changedTouches[0];

    this._transitionTime(250);
    this._transitionTimingFunction('ease')
    this.stop();
    this.startTime = getNow();
    this.startY = this.y;
    this.initiated = true;
    
    this.pointY = res.pageY;
    this.myY = 0;
  },
  touchmoveHandle(e) {
    this.myY += 0.18
    // debugger
    if (!this.initiated) {
      return;
    }
    const res = e.changedTouches[0];

    let deltaY = res.pageY - this.pointY;
    this.pointY = res.pageY;
    let timestamp = getNow();
    let newY = this.y + deltaY;
    let newX = 0;

    this._translate(newX, newY);

    if (timestamp - this.startTime > this.data.momentumLimitTime) {
      this.startTime = timestamp;
      this.startX = this.x;
      this.startY = this.y;
      
    }
  },
  touchendHandle(e) {
    // debugger
    this.initiated = false;

    if (this.resetPosition(this.data.bounceTime, ease.bounce)) {
      return
    }
  },
  _transitionTime: function (time = 0) {
    // this.scrollerStyle['transitionDuration'] = time + 'ms'
    this.setData({
      transitionDuration: time + 'ms',
    });
  },
  stop: function () {
    if (this.isInTransition) {
      this.isInTransition = false;
      // let pos = this.getComputedPosition();
      this._translate(this.x, this.y);
    }
  },
  _translate(x, y) {
    this.setData({
      transform: `translate(${x}px,${y}px) translateZ(0px)`,
      // transform: `translate3d(${x}px,${y}px,0px)`,
    });

    this.x = x;
    this.y = y;
  },
  _transitionTimingFunction: function(easing) {
		// this.scrollerStyle['transitionTimingFunction'] = easing;
    this.setData({
      transitionTimingFunction: easing
    })
	},
  //如果超出了最大滑动距离和最小滑动距离
  resetPosition: function (time = 0, easeing = ease.bounce) {
    let y = this.y;
    let x = this.x;
    let roundY = Math.round(y);

    if (roundY > this.minScrollY) {
      y = this.minScrollY;
    } else if (roundY < this.maxScrollY) {
      y = this.maxScrollY;
    }

    if (x === this.x && y === this.y) {
      return false;
    }

    this.scrollTo(x, y, time, easeing);
    return true;
  },
  scrollTo: function (x, y, time = 0, easing = ease.bounce, isSilent) {
    if (x === this.x && y === this.y) {
      return;
    }
    this.isInTransition = time > 0 && y !== this.y;
    this._transitionTimingFunction(easing.style);
    this._transitionTime(time);
    this._translate(x, y);
  },
});
