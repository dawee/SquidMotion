const assert = require('assert');
const projectStore = require('../lib/store/project');
const importSVG = require('../lib/action/svg').importSVG;

describe('storing', function () {

  it('should store when svgImport is triggered', function (done) {
    projectStore.on('change', function () {
      assert.notEqual(null, projectStore.project);
      done();
    });

    importSVG('<svg></svg>');
  });

});