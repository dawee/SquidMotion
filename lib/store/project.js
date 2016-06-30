const Store = require('dwflux/store');
const actions = require('../actions');


class ProjectObjects extends Store {

  constructor() {
    super();

    this.cid = 'fileId';
    this.bindAction(actions.createProjectFromSVG, this.onCreateProject);
  }

  onCreateProject(opts) {
    this.add({
      name: opts.name,
      fileId: opts.fileId,
    });

    this.emit('change');
  }

}

exports.objects = new ProjectObjects();
