import assert from 'assert';
import projectStore from '../lib/store/project';
import {importSVG} from '../lib/action/svg';

describe('storing', function () {

  it('should store when svgImport is triggered', function (done) {
    projectStore.on('change', function () {
      assert.equal(1, projectStore.projects.length);
      done();
    });

    importSVG('foobar.svg');
  });

});