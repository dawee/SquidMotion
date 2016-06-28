const Store = require('dwflux/store');
const actions = require('../actions');
const ChannelStore = require('./channel');


class StepStore extends Store {

  constructor(channelId, stepId, time) {
    super();

    this.time = time;
    this.channel = ChannelStore.get(channelId);
    this.motionStep = this.channel.motionChannel.createStep(time);
  }

  static create(channelId, stepId, time) {
    const store = new StepStore(channelId, stepId, time);

    this.prepareMapping();
    this.mapping[stepId] = store;
  }

  static getSteps(channelId) {
    return [...this.steps(channelId)];
  }

  static *steps(channelId) {
    for (const stepId of Object.keys(this.mapping)) {
      const step = this.mapping[stepId];

      if (step.channel.id === channelId) yield step;
    }
  }

  getState() {
    return {
      time: this.time,
    };
  }

}

class StepStoreFactory extends Store {

  constructor() {
    super();
    this.register(actions.createChannelStep, this.onCreateStep);
  }

  onCreateStep(opts) {
    StepStore.create(opts.channelId, opts.stepId, opts.time);
    this.emit('change');
  }
}

StepStore.factory = new StepStoreFactory();

module.exports = StepStore;
