const Store = require('dwflux/store');


class NodeStore extends Store {

  static create(nodeId, image) {
    const store = new NodeStore(nodeId, image);

    this.prepareMapping();
    this.mapping[nodeId] = store;

    return store;
  }

  constructor(nodeId, image) {
    super();

    this.image = image;
    this.id = nodeId;
  }

  node() {
    return this.image.getState()[this.id];
  }

  getState() {
    return Object.assign({
      id: this.id,
      transform: this.node().matrix.serialize(),
    }, this.node().attributes);
  }

}

module.exports = NodeStore;
