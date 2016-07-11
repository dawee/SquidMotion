const React = require('react');
const reactCSS = require('reactcss').default;
const Human = require('human-component');
const DocumentStore = require('../store/document');
const NodeStore = require('../store/node');

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


class SVGImage extends React.Component {

  constructor(props) {
    super(props);

    this.initState();
  }

  initState() {
    this.state = {
      document: DocumentStore.get({fileId: this.props.fileId}),
      nodes: NodeStore.getAllComputed(this.props.fileId),
    };
  }

  render() {
    const style = createStyle(this);
    const doc = this.state.document;

    return (
      svg.el({width: doc.width, height: doc.height, style: style.container})
    );
  }

}

SVGImage.propTypes = {
  fileId: React.PropTypes.string.isRequired,
};

module.exports = SVGImage;
