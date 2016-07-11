const Dispersive = require('dispersive');
const actions = require('../actions');


const ProjectStore = module.exports = Dispersive.createStore();

ProjectStore.bindAction(actions.importSVG, (data) => {
  ProjectStore.create({
    name: data.name,
    fileId: data.fileId,
    open: false,
  });

  ProjectStore.emit('change');
});

ProjectStore.bindAction(actions.openProject, (data) => {
  const project = ProjectStore.get({fileId: data.fileId});

  project.open = true;
  ProjectStore.emit('change');
});

ProjectStore.allOpen = () => ProjectStore.filter({open: true}).all();
