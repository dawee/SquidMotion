const Store = require('dwflux/store');
const actions = require('../actions');


class DocumentStore extends Store {

  constructor() {
    super();

    this.documents = {};
    this.register(actions.importSVG, this.onImportSVG);
  }

  onImportSVG(opts) {
    this.documents[opts.fileId] = {
      fileId: opts.fileId,
      width: opts.doc.root,
    };

    this.emit('change');
  }

  getAll() {
    return Object.keys(this.documents).map((fileId) => this.documents[fileId]);
  }

  get(fileId) {
    return this.documents[fileId];
  }

}

DocumentStore.instance = new DocumentStore();

module.exports = DocumentStore;
