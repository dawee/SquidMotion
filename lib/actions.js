const Dispersive = require('dispersive');
const electron = require('electron');
const hat = require('hat');
const SVGFlatDocument = require('svg-flat-document');

const win = electron.remote.getCurrentWindow();
const actions = module.exports = {};


/*
 * Window
 */


actions.showWindow = Dispersive.createAction(() => {
  win.maximize();
  win.show();
});


/*
 * Project
 */


actions.openProject = Dispersive.createAction(
  (ctx, fileId) => Object.assign({fileId}, ctx)
);

actions.createProjectFromSVG = Dispersive.createAction(
  (ctx, file) => {
    const fedContext = Object.assign({
      fileId: hat(),
    }, ctx || {});

    return Dispersive.createActionGroup()
      .chain(actions.importSVG, [fedContext, file])
      .chain(actions.createPreparedAnimation, [fedContext])
      .chain(actions.openProject, [fedContext]);
  }
);


/*
 * Timeline
 */


actions.createPreparedAnimation = Dispersive.createAction(
  (ctx) => {
    const fedContext = Object.assign({
      animationId: hat(),
      channelId: hat(),
    }, ctx || {});

    return Dispersive.createActionGroup()
      .chain(actions.createAnimation, [fedContext, fedContext.animationId])
      .chain(actions.createPreparedChannel, [fedContext]);
  }
);

actions.createPreparedChannel = Dispersive.createAction(
  (ctx) => {
    const fedContext = Object.assign({
      channelId: hat(),
    }, ctx || {});

    return Dispersive.createActionGroup()
      .chain(actions.createChannel, [fedContext, fedContext.channelId])
      .chain(actions.createAndSelectStep, [fedContext, 0]);
  }
);

actions.createAnimation = Dispersive.createAction(
  (ctx, animationId) => Object.assign({animationId: animationId || hat()}, ctx)
);

actions.createChannel = Dispersive.createAction(
  (ctx, channelId) => Object.assign({channelId: channelId || hat()}, ctx)
);

actions.createStep = Dispersive.createAction(
  (ctx, time, stepId) => Object.assign({
    stepId: stepId || hat(),
    time: time,
  }, ctx)
);

actions.selectStep = Dispersive.createAction(
  (ctx, stepId) => Object.assign({stepId}, ctx)
);

actions.selectTime = Dispersive.createAction(
  (ctx, time) => Object.assign({time}, ctx)
);

actions.moveTime = Dispersive.createAction(
  (ctx, timeline, xDelta) => {
    const delta = xDelta * timeline.gap / timeline.gapWidth;
    const newTime = Math.ceil(timeline.cursor + delta);

    return Dispersive.createActionGroup()
      .chain(actions.selectTime, [ctx, newTime < 0 ? 0 : newTime]);
  }
);

actions.createAndSelectStep = Dispersive.createAction(
  (ctx, time) => {
    const stepId = hat();

    return Dispersive.createActionGroup()
      .chain(actions.createStep, [ctx, time, stepId])
      .chain(actions.selectStep, [ctx, stepId]);
  }
);


/*
 * Image
 */


actions.translateNode = Dispersive.createAction(
  (ctx, nodeId, tx, ty) => Object.assign({nodeId, tx, ty}, ctx)
);

actions.importSVG = Dispersive.createAction(
  (ctx, file) => (
    new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = () => resolve(Object.assign({
        name: file.name,
        doc: SVGFlatDocument.parse(reader.result),
      }, ctx));

      reader.readAsText(file);
    })
  )
);
