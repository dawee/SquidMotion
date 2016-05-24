import chai from 'chai';
import {_parse, _parseStyleAttribute} from '../lib/action/svg';

describe('svg', function () {

  it('should parse a style attribute', function () {
    chai.assert.deepEqual({
      'fill': '#8ebd2c',
      'fill-opacity': '1',
      'fill-rule': 'nonzero',
      'stroke': 'none'
    }, _parseStyleAttribute('fill:#8ebd2c;fill-opacity:1;fill-rule:nonzero;stroke:none'))
  });

  it('should import a simple root doc', function () {
    chai.assert.deepEqual({
      name: 'svg',
      attributes: {
        width: "200",
        height: "100"
      },
      children: []
    }, _parse('<svg width="200" height="100" />'))
  });

  it('should import a more complex doc', function () {
    
    chai.assert.deepEqual({
      name: 'svg',
      attributes: {},
      children: [
        {
          name: 'g',
          attributes: {
            id: 'group1'
          },
          children: [
            {
              name: 'path',
              attributes: {
                d: 'm10,10'
              },
              children: []
            }
          ]
        },
        {
          name: 'g',
          attributes: {
            id: 'group2'
          },
          children: []
        }
      ]
    }, _parse('<svg><g id="group1"><path d="m10,10" /></g><g id="group2"></g></svg>'))
  });

});