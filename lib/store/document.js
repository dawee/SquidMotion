const Store = require('dwflux/store');
const actions = require('../actions');


class DocumentObjects extends Store {

  constructor() {
    super();

    this.cid = 'fileId';
    this.bindAction(actions.importSVG, this.onImportSVG);
  }

  onImportSVG(opts) {
    this.add({
      fileId: opts.fileId,
      width: opts.doc.root.width,
      height: opts.doc.root.height,
    });

    this.emit('change');
  }

}

exports.objects = new DocumentObjects();

