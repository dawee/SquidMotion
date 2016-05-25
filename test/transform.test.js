import chai from 'chai';
import * as svg from '../lib/action/svg';

describe('transform', function () {

  it('should convert bounds without breaking it', function () {
    var bounds = {top: 0, left: 0, width: 100, height: 200};

    chai.assert.deepEqual(
      bounds,
      svg._pointsToBounds(svg._boundsToPoints(bounds))
    );
  });


  it('should keep matrix intact', function () {
    chai.assert.deepEqual(
      [0, 0.5870736, -0.71490982, 0, 1263.1602, 149.78854],
      svg._matrixFromTransform('matrix(0,0.5870736,-0.71490982,0,1263.1602,149.78854)').toArray()
    );
  });

  it('should translate base matrix', function () {
    chai.assert.deepEqual(
      [1, 0, 0, 1, 100, 200],
      svg._matrixFromTransform('translate(100, 200)').toArray()
    );
  });

});
