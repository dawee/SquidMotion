import hat from 'hat';
import Store from './store';
import {importSVG} from '../action/svg';
import {computeNodeBounds} from '../svg/bound';
import State from '../svg/state';


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
          states: [new State({time: 0})]
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

    this.emit('change');
  }

  computeLiveImage() {
    for (let id of Object.keys(this.initial)) {
      this.initial[id].bounds = computeNodeBounds(this.initial[id]);
      this.initial[id].attributes.transform = this.initial[id].matrix.toCSS();
    }

    return this.initial;
  }

}

export default new AnimationStore();
