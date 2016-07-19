const Dispersive = require('dispersive');
const electron = require('electron');
const hat = require('hat');
const SVGFlatDocument = require('svg-flat-document');

let machineIsPlaying = false;
const win = electron.remote.getCurrentWindow();
const actions = module.exports = {};


const contextualize = (res, ctx) => Object.assign({}, ctx || {}, res || {});


function startAnimation(ctx) {
  let time = 0;
  let lastTick = Date.now();

  const runStep = () => {
    if (!machineIsPlaying) return;

    const delta = Date.now() - lastTick;
    lastTick = Date.now();

    time += delta;
    actions.selectTime(ctx, time);

    window.requestAnimationFrame(runStep);
  };

  machineIsPlaying = true;
  window.requestAnimationFrame(runStep);
}

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
  (ctx, fileId) => contextualize(ctx, {fileId})
);

actions.createProjectFromSVG = Dispersive.createAction(
  (ctx, file) => {
    const fedContext = contextualize({fileId: hat()}, ctx);

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
    const fedContext = contextualize({
      animationId: hat(),
      channelId: hat(),
    }, ctx);

    return Dispersive.createActionGroup()
      .chain(actions.createAnimation, [fedContext, fedContext.animationId])
      .chain(actions.selectAnimation, [fedContext, fedContext.animationId])
      .chain(actions.createPreparedChannel, [fedContext]);
  }
);

actions.createPreparedChannel = Dispersive.createAction(
  (ctx) => {
    const fedContext = contextualize({
      channelId: hat(),
    }, ctx);

    return Dispersive.createActionGroup()
      .chain(actions.createChannel, [fedContext, fedContext.channelId])
      .chain(actions.createAndSelectStep, [fedContext, 0]);
  }
);

actions.selectAnimation = Dispersive.createAction(
  (ctx, animationId) => contextualize({animationId: animationId || hat()}, ctx)
);

actions.createAnimation = Dispersive.createAction(
  (ctx, animationId) => contextualize({animationId: animationId || hat()}, ctx)
);

actions.createChannel = Dispersive.createAction(
  (ctx, channelId) => contextualize({channelId: channelId || hat()}, ctx)
);

actions.createStep = Dispersive.createAction(
  (ctx, time, stepId) => contextualize({
    stepId: stepId || hat(),
    time: time,
  }, ctx)
);

actions.selectStep = Dispersive.createAction(
  (ctx, stepId) => contextualize({stepId}, ctx)
);

actions.selectTime = Dispersive.createAction(
  (ctx, time) => contextualize({time}, ctx)
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
 * Animation
 */

actions.playAnimation = Dispersive.createAction(
  (ctx, animationId) => {
    const fedContext = contextualize({animationId}, ctx);

    startAnimation(fedContext);
    return fedContext;
  }
);

actions.stopAnimation = Dispersive.createAction(
  (ctx, animationId) => {
    const fedContext = contextualize({animationId}, ctx);

    machineIsPlaying = false;
    actions.selectTime(fedContext, 0);

    return fedContext;
  }
);

actions.togglePlayAnimation = Dispersive.createAction(
  (ctx, animationId, playing) => (
    Dispersive.createActionGroup()
      .chain(playing ? actions.stopAnimation : actions.playAnimation, [ctx, animationId])
  )
);


/*
 * Image
 */

actions.selectNode = Dispersive.createAction(
  (ctx, nodeId) => contextualize({nodeId}, ctx)
);


actions.translateSelected = Dispersive.createAction(
  (ctx, tx, ty) => contextualize({tx, ty}, ctx)
);

actions.importSVG = Dispersive.createAction(
  (ctx, file) => (
    new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = () => resolve(contextualize({
        name: file.name,
        doc: SVGFlatDocument.parse(reader.result),
      }, ctx));

      reader.readAsText(file);
    })
  )
);
