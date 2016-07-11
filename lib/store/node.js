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

  node.computed.matrix = node.computed.matrix.translate(data.tx, data.ty);
  node.computed.tranform = node.computed.matrix.serialize();

  NodeStore.emit(`change:${node.nodeId}`);
});