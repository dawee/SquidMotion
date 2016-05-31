import chai from 'chai';
import pick from '101/pick';
import * as parser from '../lib/svg/parser';
import * as bound from '../lib/svg/bound';
import * as matrix from '../lib/svg/matrix';

describe('svg', function () {

  describe('matrix', function () {
    it('should keep matrix intact', function () {
      chai.assert.deepEqual(
        [0, 0.5870736, -0.71490982, 0, 1263.1602, 149.78854],
        matrix.fromTransformString('matrix(0,0.5870736,-0.71490982,0,1263.1602,149.78854)').toArray()
      );
    });

    it('should translate base matrix', function () {
      chai.assert.deepEqual(
        [1, 0, 0, 1, 100, 200],
        matrix.fromTransformString('translate(100, 200)').toArray()
      );
    });

  });

  describe('parser', function () {

    it('should parse a style attribute', function () {
      chai.assert.deepEqual({
        'fill': '#8ebd2c',
        'fill-opacity': '1',
        'fill-rule': 'nonzero',
        'stroke': 'none'
      }, parser.parseStyleAttribute('fill:#8ebd2c;fill-opacity:1;fill-rule:nonzero;stroke:none'))
    });

    it('should import a simple root doc', function () {
      var parsed = parser.parse('<svg width="200" height="100" />');
      var svgRootNode = parsed.mapping[parsed.root.id];

      chai.assert.deepEqual({
        name: 'svg',
        attributes: {
          width: "200",
          height: "100"
        }
      }, pick(svgRootNode, ['name', 'attributes']));
    });

    it('should import a more complex doc', function () {
      var parsed = parser.parse('<svg><g id="group1"><path id="path1" d="m10,10" /></g><g id="group2"></g></svg>');

      chai.assert.deepEqual({
        name: 'path',
        attributes: {
          d: 'm10,10'
        }
      }, pick(parsed.mapping.path1, ['name', 'attributes']))
    });

  });

  describe('bound', function () {
    it('should compute circle bound', function () {
      chai.assert.deepEqual({
        left: 100,
        top: 200,
        width: 300,
        height: 300 
      }, bound.computeCircleBounds({attributes: {r: 150, cx: 250, cy: 350}}))
    });

    it('should compute path bound', function () {
      chai.assert.deepEqual({
        left: 10,
        top: 10,
        width: 5,
        height: 0 
      }, bound.computePathBounds({attributes: {d:'m10,10 h 5'}}))
    });

    it('should convert bound without breaking it', function () {
      var value = {top: 0, left: 0, width: 100, height: 200};

      chai.assert.deepEqual(
        value,
        bound.pointsToBounds(bound.boundsToPoints(value))
      );
    });
  });


});