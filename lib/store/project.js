const Store = require('dwflux/store');
const actions = require('../actions');


class ProjectStore extends Store {

  constructor() {
    super();

    this.register(actions.importSVG, this.onImportSVG);
  }

  onImportSVG(opts) {
    this.mapping[opts.fileId] = {
      fileId: opts.fileId,
      width: opts.doc.root,
    };

    this.emit('change');
  }

  all() {
    return Object.keys(this.mapping).map((fileId) => this.mapping[fileId]);
  }

}

ProjectStore.instance = new ProjectStore();

module.exports = ProjectStore;
