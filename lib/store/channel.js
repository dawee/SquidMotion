const Store = require('dwflux/store');
const actions = require('../actions');
const AnimationStore = require('./animation');


class ChannelStore extends Store {

  static create(animationId, channelId) {
    this.prepareMapping();

    const store = new ChannelStore(animationId, channelId);
    this.mapping[channelId] = store;
  }

  constructor(animationId, channelId) {
    super();

    this.index = Object.keys(ChannelStore.mapping).length + 1;
    this.name = `Channel #${this.index}`;
    this.id = channelId;
    this.animation = AnimationStore.get(animationId);
    this.motionChannel = this.animation.motionTimeline.createChannel();
  }

  static getChannels(animationId) {
    return [...this.channels(animationId)];
  }

  static *channels(animationId) {
    for (const channelId of Object.keys(this.mapping)) {
      const channel = this.mapping[channelId];

      if (channel.animation.id === animationId) yield channel;
    }
  }

  getState() {
    return {
      name: this.name,
    };
  }

}

class ChannelStoreFactory extends Store {

  constructor() {
    super();
    this.register(actions.createAnimationChannel, this.onCreateChannel);
  }

  onCreateChannel(opts) {
    ChannelStore.create(opts.animationId, opts.channelId);
    this.emit('change');
  }

}

ChannelStore.factory = new ChannelStoreFactory();

module.exports = ChannelStore;
