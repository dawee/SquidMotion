const Store = require('dwflux/store');
const ProjectStore = require('./project');
const actions = require('../actions');


class AppStore extends Store {
  constructor() {
    super();
    this.register(actions.importSVG, this.onImportSVG);
  }

  onImportSVG(opts) {
    const store = ProjectStore.create();

    store.initProject(opts.name, opts.doc);
    this.emit('change');
  }
}

AppStore.create();

module.exports = AppStore;
