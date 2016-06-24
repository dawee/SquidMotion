const Store = require('dwflux/store');
const importSVG = require('../action/svg').importSVG;


class ProjectStore extends Store {

  constructor() {
    super();

    this.project = null;
    this.register(importSVG, this.onImportSVG);
  }

  onImportSVG(evt) {
    this.project = {
      document: {
        width: evt.image.root.attributes.width,
        height: evt.image.root.attributes.height,
      },
    };
    this.emit('change');
  }

}

module.exports = new ProjectStore();
