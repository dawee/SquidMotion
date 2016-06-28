const Store = require('dwflux/store');
const actions = require('../actions');


class DocumentStore extends Store {

  constructor(fileId, doc) {
    super();

    this.fileId = fileId;
    this.doc = doc;
  }

  static create(fileId, doc) {
    const store = new DocumentStore(fileId, doc);

    this.prepareMapping();
    this.mapping[fileId] = store;
  }

  getState() {
    return {
      name: this.name,
      width: this.doc.root.width,
      height: this.doc.root.height,
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
