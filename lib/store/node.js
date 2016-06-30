const Store = require('dwflux/store');
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

class NodeStore extends Store {

  constructor() {
    super();
    this.cid = 'nodeId';
  }

  get(id) {
    return super.get(id).computed;
  }

}

class NodeObjects extends NodeStore {

  constructor() {
    super();

    this.projects = {};
    this.bindAction(actions.importSVG, this.onImportSVG);
  }

  onImportSVG(opts) {
    for (const nodeId of Object.keys(opts.doc.mapping)) {
      const node = new Node(nodeId, opts.fileId, opts.doc.mapping[nodeId]);

      this.add(node);
      this.projectNodesObjects.add(node);
    }

    this.emit('change');
  }

  add(node) {
    if (! (node.fileId in this.projects)) {
      this.projects[node.fileId] = new NodeStore();
    }

    super.add(node);
  }

  listAllByProject(fileId) {
    if (! (fileId in this.projects)) return [];

    return this.projects[fileId].listAll();
  }
}

exports.objects = new NodeObjects();
