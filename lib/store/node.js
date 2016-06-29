const Store = require('dwflux/store');
const MotionTimeline = require('motion-timeline');
const actions = require('../actions');


class Node {

  constructor(nodeId, fileId, initial) {
    this.initial = Object.assign({
      id: nodeId,
      matrix: initial.matrix,
    }, initial.attributes);

    this.id = nodeId;
    this.fileId = fileId;
    this.motionTimeline = new MotionTimeline({main: this.initial});
    this.computed = this.computeState(0);
  }

  computeState(time) {
    this.computed = this.motionTimeline.computeState(time).main;
  }

}


class NodeStore extends Store {

  constructor() {
    super();

    this.mapping = {};
    this.register(actions.importSVG, this.onImportSVG);
  }

  onImportSVG(opts) {
    this.prepareMapping();

    for (const nodeId of Object.keys(opts.doc.mapping)) {
      this.mapping[nodeId] = new Node(nodeId, opts.fileId, opts.doc.mapping[nodeId]);
    }

    this.emit('change');
  }

  *all(fileId) {
    for (const id of this.mapping) {
      const node = this.mapping[id];

      if (node.fileId === fileId) yield node.computed;
    }
  }

  getAll(fileId) {
    return [...this.all(fileId)];
  }

  get(id) {
    return super.get(id).computed;
  }

}

module.exports = NodeStore;
