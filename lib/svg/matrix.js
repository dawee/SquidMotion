import pick from '101/pick';
import {parse as parseTransform} from 'svg-transform-parser';
import {Matrix as TransformMatrix} from 'transformation-matrix-js';


export function fromTransformString(transformString) {
  let matrix = new TransformMatrix();

  if (!transformString) return matrix;

  let parsed = parseTransform(transformString);

  if ('matrix' in parsed) {
    matrix = matrix.setTransform(
      parsed.matrix.a, parsed.matrix.b, parsed.matrix.c,
      parsed.matrix.d, parsed.matrix.e, parsed.matrix.f
    );
  } else if ('translate' in parsed) {
    matrix.translate(parsed.translate.tx, parsed.translate.ty);
  } else {
    throw transformString + ' is not managed by the parser';
  }

  return matrix;
}


export function deserialize(dump) {
  return TransformMatrix.from(
    dump.a, dump.b, dump.c,
    dump.d, dump.e, dump.f
  );
}

export function serialize(matrix) {
  return pick(matrix, ['a', 'b', 'c', 'd', 'e', 'f']);
}
