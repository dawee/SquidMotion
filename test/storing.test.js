import assert from 'assert';
import projectStore from '../lib/store/project';
import * as action from '../lib/action';

describe('storing', function () {

  it('should store when svgImport is triggered', function () {
    projectStore.on('change', function () {
      assert.equal(1, projectStore.projects.length);
    });

    action.importSVG('foobar.svg');
  });

});