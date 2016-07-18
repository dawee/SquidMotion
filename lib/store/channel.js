const Dispersive = require('dispersive');
const actions = require('../actions');


const ChannelStore = module.exports = Dispersive.createStore();

ChannelStore.bindAction(actions.createChannel, (data) => {
  const count = ChannelStore.filter({animationId: data.animationId}).all().length;

  ChannelStore.create({
    animationId: data.animationId,
    channelId: data.channelId,
    name: `Channel #${count + 1}`,
  });

  ChannelStore.emit('change');
});

ChannelStore.allIDs = (animationId) => ChannelStore.filter({animationId}).all().map(
  (channel) => channel.channelId
);

