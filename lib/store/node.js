const Dispersive = require('dispersive');
const MotionTimeline = require('motion-timeline');
const actions = require('../actions');


class Node {

  constructor(nodeId, fileId, initial) {
    this.initial = Object.assign({
      id: nodeId,
      matrix: initial.matrix,
    }, initial.attributes);

    this.nodeId = nodeId;
    this.fileId = fileId;
    this.motionTimeline = new MotionTimeline({main: this.initial});
    this.computed = this.computeState(0);
  }

  computeState(time) {
    this.computed = this.motionTimeline.computeState(time).main;
  }

}

const NodeStore = module.exports = Dispersive.createStore();


NodeStore.bindAction(actions.importSVG, (data) => {
  for (const nodeId of Object.keys(data.doc.mapping)) {
    const node = new Node(nodeId, data.fileId, data.doc.mapping[nodeId]);

    this.create(node);
  }

  this.emit('change');
});

NodeStore.getComputedById = (nodeId) => NodeStore.get({nodeId}).computed;
NodeStore.getAllComputed = (fileId) => NodeStore.filter({fileId}).map((node) => (node.computed));
