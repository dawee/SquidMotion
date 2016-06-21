const Store = require('dwflux/store');
const MotionTimeline = require('motion-timeline');
const importSVG = require('../action/svg').importSVG;


class AnimationStore extends Store {

  constructor() {
    super();

    this.register(importSVG, this.onImportSVG);
    this.animations = [];
    this.initial = {};
  }

  createAnimation() {
    let animation = new MotionTimeline(this.initial);
    let channel = animation.createChannel();

    channel.name = `Channel #${this.animations.length + 1}`;

    return animation;
  }

  onImportSVG(opts) {
    this.animations = [];
    this.initial = Object.assign({}, opts.image.mapping);

    let firstAnimation = this.createAnimation();

    this.animations.push(firstAnimation);

    this.currentAnimation = firstAnimation;
    this.liveImage = this.currentAnimation.computeState(0);
    this.emit('change');
  }

  currentChannels() {
    return !!this.currentAnimation && this.currentAnimation.channels || [];
  }

}

module.exports = new AnimationStore();
