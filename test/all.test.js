const assert = require('assert');
const mockery = require('mockery');
const dispatcher = require('dwflux/dispatcher');
const sinon = require('sinon');


describe('actions', () => {
  let actions;
  let DocumentStore;
  let ImageStore;
  let ProjectStore;
  let stores;

  before((done) => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });

    mockery.registerMock('electron', {
      remote: {
        getCurrentWindow: () => null 
      }
    });

    actions = require('../lib/actions');
    DocumentStore = require('../lib/store/document');
    ImageStore = require('../lib/store/image');
    ProjectStore = require('../lib/store/project');
    stores = [DocumentStore, ImageStore, ProjectStore];

    class FileReaderMock {

      readAsText(data) {
        this.result = data;
        this.onload();
      }

    }

    global.FileReader = FileReaderMock;
    done();
  });


  beforeEach((done) => {
    for (const store of stores) {
      store.map((instance) => instance.removeAllListeners());

      if (!!store.factory) store.factory.removeAllListeners();
    }

    done();
  });

  describe('computeImage', () => {

    it('should change image if fileId is correct', () => {
      const store = ImageStore.create('foo', {mapping: {}});
      const callback = sinon.spy();

      store.on('change', callback);
      actions.computeImage('foo');

      assert(callback.called);
    });

    it('should not change image if fileId is not correct', () => {
      const store = ImageStore.create('foo', {mapping: {}});
      const callback = sinon.spy();

      store.on('change', callback);
      actions.computeImage('bar');

      assert(!callback.called);
    });

  });

  describe('importSVG', () => {

    it('should create a new project', () => {
      const store = ProjectStore.factory;
      const callback = sinon.spy();

      store.on('change', callback);
      actions.importSVG('foobar', '<svg></svg>');

      assert(callback.called);
      assert.equal(store.getProjects().length, 1);
    });

    it('should create a new document', () => {
      const store = DocumentStore.factory;
      const callback = sinon.spy();

      store.on('change', callback);
      actions.importSVG('foobar', '<svg width="200" height="100"></svg>');

      assert(callback.called);
      assert.equal(DocumentStore.get('foobar').getState().width, 200);
    });

    it('should create a new image', () => {
      const store = ImageStore.factory;
      const callback = sinon.spy();

      store.on('change', callback);
      actions.importSVG('foobar', '<svg><rect x="0" y="0" width="200" height="100" id="me"></rect></svg>');

      assert(callback.called);
      assert.equal(ImageStore.get('foobar').getState().me.attributes.width, 200);
    });

  });

});

