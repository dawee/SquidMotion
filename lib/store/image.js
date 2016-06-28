const Store = require('dwflux/store');
const actions = require('../actions');


class ImageStore extends Store {

  constructor(fileId, name, doc) {
    super();

    this.fileId = fileId;
    this.doc = doc;
  }

  static create(fileId, doc) {
    const store = new ImageStore(fileId, doc);

    this.prepareMapping();
    this.mapping[fileId] = store;
  }

  getState() {
    return this.doc.mapping;
  }

}

class ImageStoreFactory extends Store {

  constructor() {
    super();
    this.register(actions.importSVG, this.onImportSVG);
  }

  onImportSVG(opts) {
    ImageStore.create(opts.fileId, opts.doc);
    this.emit('change');
  }

}

ImageStore.factory = new ImageStoreFactory();

module.exports = ImageStore;
