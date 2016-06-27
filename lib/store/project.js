const Store = require('dwflux/store');
const actions = require('../actions');


class ProjectStore extends Store {

  initProject(name, doc) {
    this.doc = doc;
    this.name = name;
  }

  static all() {
    return Object.keys(this.mapping).map((id) => ({name: this.mapping[id].name, id: id}));
  }

}

module.exports = ProjectStore;
