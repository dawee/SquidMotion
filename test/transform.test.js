import chai from 'chai';
import * as svg from '../lib/action/svg';
import * as imageStore from '../lib/store/image';


describe('transform', function () {

  it('should compute circle bounds', function () {
    chai.assert.deepEqual({
      left: 100,
      top: 200,
      width: 300,
      height: 300 
    }, imageStore._computeCircleBounds({attributes: {r: 150, cx: 250, cy: 350}}))
  });

  it('should compute path bounds', function () {
    chai.assert.deepEqual({
      left: 10,
      top: 10,
      width: 5,
      height: 0 
    }, imageStore._computePathBounds({attributes: {d:'m10,10 h 5'}}))
  });

  it('should convert bounds without breaking it', function () {
    var bounds = {top: 0, left: 0, width: 100, height: 200};

    chai.assert.deepEqual(
      bounds,
      imageStore._pointsToBounds(imageStore._boundsToPoints(bounds))
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
