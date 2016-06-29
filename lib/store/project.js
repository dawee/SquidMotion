const Store = require('dwflux/store');
const actions = require('../actions');


class ProjectStore extends Store {

  constructor() {
    super();

    this.mapping = {};
    this.register(actions.createProjectFromSVG, this.onCreateProject);
  }

  onCreateProject(opts) {
    this.mapping[opts.fileId] = {
      fileId: opts.fileId,
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

ProjectStore.instance = new ProjectStore();

module.exports = ProjectStore;
