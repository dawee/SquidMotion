const Dispersive = require('dispersive');
const actions = require('../actions');


const ChannelStore = module.exports = Dispersive.createStore();

ChannelStore.bindAction(actions.createChannel, (data) => {
  const count = ChannelStore.filter({fileId: data.fileId}).all().length;

  ChannelStore.create({
    fileId: data.fileId,
    channelId: data.channelId,
    name: `Channel #${count + 1}`,
  });

  ChannelStore.emit('change');
});

ChannelStore.allIDs = (fileId) => ChannelStore.filter({fileId}).all().map(
  (channel) => channel.channelId
);
