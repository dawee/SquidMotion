import assert from 'assert';
import projectStore from '../lib/store/project';
import * as action from '../lib/action';

describe('storing', function () {

  it('should store when action is triggered', function () {
    action.createProject('foobar.svg');
    assert.equal(1, projectStore.projects.length);
  });

});