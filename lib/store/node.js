const Dispersive = require('dispersive');
const MotionTimeline = require('motion-timeline');
const actions = require('../actions');


class Node {

  constructor(nodeId, fileId, initial) {
    this.initial = Object.assign({
      id: nodeId,
      matrix: initial.matrix,
    }, initial.attributes);

    this.name = initial.name;
    this.nodeId = nodeId;
    this.fileId = fileId;
    this.channels = {};
    this.steps = {};
    this.motionTimeline = new MotionTimeline({main: this.initial});
    this.computeState(0);
  }

  computeState(time) {
    this.computed = this.motionTimeline.computeState(time).main;
  }

}

const NodeStore = module.exports = Dispersive.createStore();


NodeStore.bindAction(actions.importSVG, (data) => {
  for (const nodeId of Object.keys(data.doc.mapping)) {
    const node = new Node(nodeId, data.fileId, data.doc.mapping[nodeId]);

    NodeStore.create(node);
  }

  NodeStore.emit('change');
});

NodeStore.bindAction(actions.translateNode, (data) => {
  const node = NodeStore.get({fileId: data.fileId, nodeId: data.nodeId});

  if (node.currentStep) {
    node.currentStep.translate('main', data.tx, data.ty);
    node.computeState(node.currentStep.time);
  }

  NodeStore.emit(`change:${node.nodeId}`);
});

NodeStore.bindAction(actions.createChannel, (data) => {
  for (const node of NodeStore.filter({fileId: data.fileId}).all()) {
    const channel = node.motionTimeline.createChannel();

    channel.channelId = data.channelId;
    node.channels[data.channelId] = channel;
  }
});

NodeStore.bindAction(actions.createStep, (data) => {
  for (const node of NodeStore.filter({fileId: data.fileId}).all()) {
    const channel = node.channels[data.channelId];
    const step = channel.createStep(data.time);

    step.channelId = data.channelId;
    step.stepId = data.stepId;
    node.steps[data.stepId] = step;
  }
});

NodeStore.bindAction(actions.selectStep, (data) => {
  for (const node of NodeStore.filter({fileId: data.fileId}).all()) {
    const step = node.steps[data.stepId];

    node.currentStep = step;
    node.computeState(step.time);
  }

  NodeStore.emit('change');
});

NodeStore.bindAction(actions.selectTime, (data) => {
  for (const node of NodeStore.filter({fileId: data.fileId}).all()) {
    node.computeState(data.time);
  }

  NodeStore.emit('change');
});
