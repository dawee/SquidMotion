const Store = require('dwflux/store');
const actions = require('../actions');


class DocumentStore extends Store {

  constructor() {
    super();

    this.register(actions.importSVG, this.onImportSVG);
  }

  onImportSVG(opts) {
    this.mapping[opts.fileId] = {
      fileId: opts.fileId,
      width: opts.doc.root.width,
      height: opts.doc.root.height,
    };

    this.emit('change');
  }

  all() {
    return Object.keys(this.mapping).map((fileId) => this.mapping[fileId]);
  }

}

DocumentStore.instance = new DocumentStore();

module.exports = DocumentStore;
