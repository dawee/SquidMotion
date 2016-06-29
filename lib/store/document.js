const Store = require('dwflux/store');
const actions = require('../actions');


class DocumentStore extends Store {

  constructor() {
    super();

    this.mapping = {};
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

  *all() {
    for (const fileId of Object.keys(this.mapping)) {
      yield this.mapping[fileId];
    }
  }

  getAll() {
    return [...this.all()];
  }

}

DocumentStore.instance = new DocumentStore();

module.exports = DocumentStore;
