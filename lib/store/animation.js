const hat = require('hat');
const Store = require('dwflux/store');
const MotionTimeline = require('motion-timeline');
const importSVG = require('../action/svg').importSVG;
const channels = require('../action/channel');


class AnimationStore extends Store {

  constructor() {
    super();

    this.register(importSVG, this.onImportSVG);
    this.register(channels.createStep, this.onCreateStep);
    this.register(channels.selectStep, this.onSelectStep);
    this.register(channels.createChannel, this.onCreateChannel);

    this.animations = [];
    this.initial = {};
  }

  createChannel(animation) {
    let channel = animation.createChannel();

    channel.name = `Channel #${this.animations.length + 1}`;
    channel.id = hat();
  }

  createAnimation() {
    let animation = new MotionTimeline(this.initial);

    this.createChannel(animation);
    return animation;
  }

  getChannel(channelId) {
    return this.currentAnimation.channels.find((channel) => channelId === channel.id);
  }

  onCreateChannel() {
    this.createChannel(this.currentAnimation);
    this.emit('change');
  }

  onCreateStep(opts) {
    let channel = this.getChannel(opts.channelId);

    this.currentStep = channel.createStep(opts.time);
    this.currentStep.id = hat();
    this.emit(`change:channel:${channel.id}`);
    this.emit('change:step:current');
  }

  getStep(channelId, stepId) {
    const channel = this.getChannel(channelId);

    return channel.steps.find((step) => stepId === step.id);
  }

  onSelectStep(opts) {
    this.currentStep = this.getStep(opts.channelId, opts.stepId);
    this.emit('change:step:current');
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

  isCurrentStep(step) {
    return this.currentStep.id === step.id;
  }

}

module.exports = new AnimationStore();
