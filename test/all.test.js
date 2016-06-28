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
    ImageStore = require('../lib/store/image');
    ProjectStore = require('../lib/store/project');
    AnimationStore = require('../lib/store/animation');
    ChannelStore = require('../lib/store/channel');
    StepStore = require('../lib/store/step');

    stores = [
      DocumentStore,
      ImageStore,
      ProjectStore,
      AnimationStore,
      ChannelStore,
      StepStore,
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

  describe('createChannelStep', () => {

    let document;
    let animation;
    let channel;

    beforeEach((done) => {
      const data = '<svg><rect x="0" y="0" width="200" height="100" id="me"></rect></svg>';

      document = DocumentStore.create('foobar', SVGFlatDocument.parse(data));
      animation = AnimationStore.create('foobar', 'animation1');
      channel = ChannelStore.create('animation1', 'channel1');
      
      done();
    });


    it('should create a new step', () => {
      const store = StepStore.factory;
      const callback = sinon.spy();

      store.on('change', callback);
      actions.createChannelStep('channel1', 100);

      assert(callback.called);
      assert.equal(StepStore.getSteps('channel1').length, 1);
    });

  });

  describe('createChannel', () => {

    let document;
    let animation;

    beforeEach((done) => {
      const data = '<svg><rect x="0" y="0" width="200" height="100" id="me"></rect></svg>';

      document = DocumentStore.create('foobar', SVGFlatDocument.parse(data));
      animation = AnimationStore.create('foobar', 'animation1');
      
      done();
    });

    it('should create a new channel', () => {
      const store = ChannelStore.factory;
      const callback = sinon.spy();

      store.on('change', callback);
      actions.createAnimationChannel('animation1');

      assert(callback.called);
      assert.equal(ChannelStore.getChannels('animation1').length, 1);
    });

    it('should create a first step', () => {
      const store = StepStore.factory;
      const callback = sinon.spy();

      store.on('change', callback);
      actions.createAnimationChannel('animation1');

      assert(callback.called);

      const channel = ChannelStore.getChannels('animation1')[0];

      assert.equal(StepStore.getSteps(channel.id).length, 1);
      assert.equal(StepStore.getSteps(channel.id)[0].time, 0);
    });

  });

  describe('createAnimation', () => {

    let document;

    beforeEach((done) => {
      const data = '<svg><rect x="0" y="0" width="200" height="100" id="me"></rect></svg>';

      document = DocumentStore.create('foobar', SVGFlatDocument.parse(data));
      
      done();
    });

    it('should create a new animation', () => {
      const store = AnimationStore.factory;
      const callback = sinon.spy();

      store.on('change', callback);
      actions.createAnimation('foobar');

      assert(callback.called);
      assert.equal(AnimationStore.getAnimations('foobar').length, 1);
    });

    it('should create a first channel', () => {
      const store = ChannelStore.factory;
      const callback = sinon.spy();

      store.on('change', callback);
      actions.createAnimation('foobar');

      assert(callback.called);

      const animation = AnimationStore.getAnimations('foobar')[0];

      assert.equal(ChannelStore.getChannels(animation.id).length, 1);
    });

  })

});

