const Store = require('dwflux/store');
const actions = require('../actions');


class DocumentStore extends Store {

  static create(fileId, doc) {
    const store = new DocumentStore(fileId, doc);

    this.prepareMapping();
    this.mapping[fileId] = store;

    return store;
  }

  constructor(fileId, doc) {
    super();

    this.fileId = fileId;
    this.root = doc.root;
    this.initial = doc.mapping;
  }

  getState() {
    return {
      name: this.name,
      width: this.root.attributes.width,
      height: this.root.attributes.height,
    };
  }

}

class DocumentStoreFactory extends Store {

  constructor() {
    super();
    this.register(actions.importSVG, this.onImportSVG);
  }

  onImportSVG(opts) {
    DocumentStore.create(opts.fileId, opts.doc);
    this.emit('change');
  }
}

DocumentStore.factory = new DocumentStoreFactory();

module.exports = DocumentStore;
