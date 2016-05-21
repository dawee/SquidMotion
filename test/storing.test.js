import assert from 'assert';
import projectStore from '../lib/store/project';
import * as action from '../lib/action';
import * as constant from '../lib/constant';

describe('storing', function () {

  it('should store when action is triggered', function () {
    action.createProject('foobar.svg');
    assert.equal(1, projectStore.projects.length);
  });

  it('should send an event when a project is created', function (done) {
    projectStore.on(constant.PROJECT_CREATED, done);
    projectStore.onCreate({svgFileName: 'foobar.svg'});
  });

});