const React = require('react');
const reactCSS = require('reactcss').default;
const Human = require('human-component');
const Squid = require('../squid');
const DocumentStore = require('../store/document');
const NodeStore = require('../store/node');

const SVGElement = Human.require(module, './svgelement');
const svg = Human.from('svg');


const createStyle = (me) => reactCSS({
  default: {
    container: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      background: 'white',
      transform: 'translate(-50%,-50%)',
      transformOrigin: 'center center',
    },
  },
}, me.props, me.state);


class SVGImage extends Squid.Component {

  constructor(props) {
    super(props);

    this.initState();
  }

  initState() {
    this.state = {
      document: DocumentStore.get({fileId: this.props.fileId}),
      nodes: NodeStore.filter({fileId: this.props.fileId}).all(),
    };
  }

  render() {
    const style = createStyle(this);
    const doc = this.state.document;

    return (
      svg.el({width: doc.width, height: doc.height, style: style.container},
        this.state.nodes.map((node) => (
          SVGElement.el({fileId: this.props.fileId, nodeId: node.nodeId, key: node.nodeId})
        ))
      )
    );
  }

}

SVGImage.propTypes = {
  fileId: React.PropTypes.string.isRequired,
};

module.exports = SVGImage;
