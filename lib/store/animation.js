import hat from 'hat';
import Store from 'dwflux/store';
import {importSVG} from '../action/svg';


class AnimationStore extends Store {

  constructor() {
    super();

    this.register(importSVG, this.onImportSVG);
  }

  createAnimation() {
    return {
      id: hat(),
      name: 'Default',
      channels: [
        {
          id: hat(),
          name: 'Channel #1',
          states: [{time: 0}]
        }
      ]
    };
  }

  onImportSVG(opts) {
    let firstAnimation = this.createAnimation();

    this.animations = {};
    this.animations[firstAnimation.id] = firstAnimation;
    this.initial = Object.assign({}, opts.image.mapping);
    this.currentAnimation = firstAnimation;

    this.liveImage = this.initial;
    this.emit('change');
  }

}

export default new AnimationStore();
