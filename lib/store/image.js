const Store = require('dwflux/store');
const actions = require('../actions');


class ImageStore extends Store {

  static create(fileId, doc) {
    const store = new ImageStore(fileId, doc);

    this.prepareMapping();
    this.mapping[fileId] = store;

    return store;
  }

  constructor(fileId, doc) {
    super();

    this.fileId = fileId;
    this.doc = doc;

    this.register(actions.computeImage, this.onComputeImage);
  }

  onComputeImage(opts) {
    if (opts.fileId !== this.fileId) return;

    this.emit('change');
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
