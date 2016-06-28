const Store = require('dwflux/store');
const actions = require('../actions');


class ProjectStore extends Store {

  constructor(fileId, name) {
    super();
    this.name = name;
    ProjectStore.prepareMapping();
    ProjectStore.mapping[fileId] = this;
  }

}

class ProjectStoreFactory extends Store {

  constructor() {
    super();
    this.projects = [];
    this.register(actions.importSVG, this.onImportSVG);
  }

  onImportSVG(opts) {
    const project = new ProjectStore(opts.fileId, opts.name);

    this.projects.push(project);
    this.emit('change');
  }

  getProjects() {
    return this.projects;
  }
}

ProjectStore.factory = new ProjectStoreFactory();

module.exports = ProjectStore;
