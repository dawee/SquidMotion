import Store from './store';
import {importSVG} from '../action/svg';
import {Matrix as TransformMatrix} from 'transformation-matrix-js';


class ImageStore extends Store {

  constructor() {
    super();

    this.live = null;
    this.register(importSVG, this.onImportSVG);
  }

  onImportSVG(opts) {
    this.live = opts.image;
    this.emit('change');
  }

  translateNode(id, tx, ty) {
    var node = this.live.mapping[id];

    node.matrix = TransformMatrix.from(
      node.matrix.a, node.matrix.b, node.matrix.c,
      node.matrix.d, node.matrix.e, node.matrix.f
    );

    node.matrix.translate(tx, ty);

    this.emit('change:' + id); 
  }

}

export default new ImageStore();