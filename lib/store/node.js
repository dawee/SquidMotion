const omit = require('101/omit');
const Dispersive = require('dispersive');
const MotionTimeline = require('motion-timeline');
const camelCase = require('camelcase');
const actions = require('../actions');

const blackList = new RegExp(
  '(.+:.+)'
  + '|(pagecolor)'
  + '|(bordercolor)'
  + '|(borderopacity)'
  + '|(showgrid)'
  + '|(showguides)'
  + '|(fitMarginTop)'
  + '|(fitMarginLeft)'
  + '|(fitMarginRight)'
  + '|(fitMarginBottom)'
  + '|(lineHeight)'
  + '|(xmlns)'
);

function sanitize(attrs) {
  const sanitized = {};

  for (const key of Object.keys(attrs)) {
    const camelized = camelCase(key);

    if (!camelized.match(blackList)) sanitized[camelCase(key)] = attrs[key];
  }

  return sanitized;
}


class Node {

  constructor(nodeId, fileId, initial) {
    this.initial = Object.assign({
      id: nodeId,
    }, sanitize(initial.attributes));

    this.baseTransform = initial.matrix.serialize();
    this.name = initial.name;
    this.nodeId = nodeId;
    this.fileId = fileId;
    this.channels = {};
    this.steps = {};
    this.timelines = {};
  }

  computeState(time) {
    const computed = this.currentTimeline.computeState(time).main;

    this.computed = omit(computed, ['matrix']);
    this.computed.transform = computed.matrix.serialize();
  }

}

const NodeStore = module.exports = Dispersive.createStore();


NodeStore.bindAction(actions.createAnimation, (data) => {
  for (const node of NodeStore.filter({fileId: data.fileId}).all()) {
    node.timelines[data.animationId] = new MotionTimeline({main: node.initial});
  }
});

NodeStore.bindAction(actions.selectAnimation, (data) => {
  for (const node of NodeStore.filter({fileId: data.fileId}).all()) {
    node.currentTimeline = node.timelines[data.animationId];

    if (Number.isFinite(node.currentTimeline.cursor)) {
      node.computeState(node.currentTimeline.cursor);
    }
  }

  NodeStore.emit('change');
});

NodeStore.bindAction(actions.importSVG, (data) => {
  for (const nodeId of Object.keys(data.doc.mapping)) {
    const node = new Node(nodeId, data.fileId, data.doc.mapping[nodeId]);

    NodeStore.create(node);
  }
});

NodeStore.bindAction(actions.translateNode, (data) => {
  const node = NodeStore.get({fileId: data.fileId, nodeId: data.nodeId});

  if (node.currentStep) {
    node.currentStep.translate('main', data.tx, data.ty);
    node.computeState(node.currentStep.time);
  }

  NodeStore.emit('change');
});

NodeStore.bindAction(actions.createChannel, (data) => {
  for (const node of NodeStore.filter({fileId: data.fileId}).all()) {
    const channel = node.currentTimeline.createChannel();

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
    node.currentTimeline.cursor = step.time;
    node.computeState(step.time);
  }

  NodeStore.emit('change');
});

NodeStore.bindAction(actions.selectTime, (data) => {
  for (const node of NodeStore.filter({fileId: data.fileId}).all()) {
    node.computeState(data.time);
    node.currentTimeline.cursor = data.time;
  }


  NodeStore.emit('change');
});
