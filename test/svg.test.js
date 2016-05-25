import chai from 'chai';
import pick from '101/pick';
import * as svg from '../lib/action/svg';

describe('svg', function () {

  it('should compute circle bounds', function () {
    chai.assert.deepEqual({
      left: 100,
      top: 200,
      width: 300,
      height: 300 
    }, svg._computeCircleBounds({attributes: {r: 150, cx: 250, cy: 350}}))
  });

  it('should parse a style attribute', function () {
    chai.assert.deepEqual({
      'fill': '#8ebd2c',
      'fill-opacity': '1',
      'fill-rule': 'nonzero',
      'stroke': 'none'
    }, svg._parseStyleAttribute('fill:#8ebd2c;fill-opacity:1;fill-rule:nonzero;stroke:none'))
  });

  it('should import a simple root doc', function () {
    var parsed = svg._parse('<svg width="200" height="100" />');
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
    var parsed = svg._parse('<svg><g id="group1"><path id="path1" d="m10,10" /></g><g id="group2"></g></svg>');

    chai.assert.deepEqual({
      name: 'path',
      attributes: {
        d: 'm10,10'
      }
    }, pick(parsed.mapping.path1, ['name', 'attributes']))
  });

});