const Dispersive = require('dispersive');
const actions = require('../actions');


const ProjectStore = module.exports = Dispersive.createStore();

ProjectStore.bindAction(actions.createProjectFromSVG, (data) => {
  ProjectStore.create({
    name: data.name,
    fileId: data.fileId,
  });

  ProjectStore.emit('change');
});
