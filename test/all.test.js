const assert = require('assert');
const mockery = require('mockery');
const Dispersive = require('dispersive');
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
      store.removeAllListeners();
      store.values = [];
    }

    done();
  });

});

