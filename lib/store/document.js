const Dispersive = require('dispersive');
const actions = require('../actions');


const DocumentStore = module.exports = Dispersive.createStore();

DocumentStore.bindAction(actions.importSVG, (data) => {
  DocumentStore.create({
    fileId: data.fileId,
    width: data.doc.root.attributes.width,
    height: data.doc.root.attributes.height,
  });

  DocumentStore.emit('change');
});
