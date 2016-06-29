const assert = require('assert');
const mockery = require('mockery');
const dispatcher = require('dwflux/dispatcher');
const SVGFlatDocument = require('svg-flat-document');
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
    ProjectStore = require('../lib/store/project');
    NodeStore = require('../lib/store/node');

    stores = [
      DocumentStore,
      ProjectStore,
      NodeStore,
    ];

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
      store.mapping = {};
    }

    done();
  });

  describe('computeImage', () => {

    it('should change image if fileId is correct');
    it('should not change image if fileId is not correct');

  });

  describe('importSVG', () => {

    it('should create a new project');
    it('should create a new document');
    it('should create a new image');

  });

  describe('createChannelStep', () => {


    it('should create a new step');

  });

  describe('createChannel', () => {

    it('should create a new channel');
    it('should create a first step');

  });

  describe('createAnimation', () => {

    it('should create a new animation');
    it('should create a first channel');

  })

});

