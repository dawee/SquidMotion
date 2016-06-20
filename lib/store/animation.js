const hat = require('hat');
const Store = require('dwflux/store');
const MotionTimeline = require('motion-timeline');
const importSVG = require('../action/svg').importSVG;


class AnimationStore extends Store {

  constructor() {
    super();

    this.register(importSVG, this.onImportSVG);
  }

  createAnimation() {
    let animation = new MotionTimeline(this.initial);
    let channel = animation.createChannel();

    animation.id = hat();
    channel.name = 'Channel #1';

    return animation;
  }

  onImportSVG(opts) {
    this.initial = Object.assign({}, opts.image.mapping);

    let firstAnimation = this.createAnimation();

    this.animations = {};
    this.animations[firstAnimation.id] = firstAnimation;
    this.currentAnimation = firstAnimation;

    this.liveImage = this.initial;
    this.emit('change');
  }

}

module.exports = new AnimationStore();
