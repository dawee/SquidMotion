const Store = require('dwflux/store');
const actions = require('../actions');
const MotionTimeline = require('motion-timeline');
const DocumentStore = require('./document');


class AnimationStore extends Store {

  static create(fileId, animationId) {
    const store = new AnimationStore(fileId, animationId);

    this.prepareMapping();
    this.mapping[animationId] = store;
  }

  constructor(fileId, animationId) {
    super();

    this.id = animationId;
    this.fileId = fileId;
    this.motionTimeline = new MotionTimeline(DocumentStore.get(fileId).initial);
  }

  static getAnimations(fileId) {
    return [...this.animations(fileId)];
  }

  static *animations(fileId) {
    for (const animationId of Object.keys(this.mapping)) {
      const animation = this.mapping[animationId];

      if (animation.fileId === fileId) yield animation;
    }
  }
}

class AnimationStoreFactory extends Store {

  constructor() {
    super();
    this.register(actions.createAnimation, this.onCreateAnimation);
  }

  onCreateAnimation(opts) {
    AnimationStore.create(opts.fileId, opts.animationId);
    this.emit('change');
  }

}

AnimationStore.factory = new AnimationStoreFactory();

module.exports = AnimationStore;
