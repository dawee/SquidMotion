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

  *all() {
    for (const fileId of this.mapping) {
      yield this.mapping[fileId];
    }
  }

  getAll() {
    return [...this.all()];
  }

}

ProjectStore.instance = new ProjectStore();

module.exports = ProjectStore;
