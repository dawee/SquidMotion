const React = require('react');
const reactCSS = require('reactcss').default;
const Human = require('human-component');
const DocumentStore = require('../store/document');

const svg = Human.from('svg');
const div = Human.from('div');


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

    DocumentStore.instance.on('change', this.onDocumentFactoryChange.bind(this));
    this.initState();
  }

  onDocumentFactoryChange() {
    this.setState({document: this.getDocumentState()});
  }

  getDocumentState() {
    const documentStore = DocumentStore.instance.get(this.props.fileId);
    return !!documentStore && documentStore.getState();
  }

  initState() {
    this.state = {document: this.getDocumentState()};
  }

  render() {
    const style = createStyle(this);
    const doc = this.state.document;

    if (!doc) return div.el();

    return (
      svg.el({width: doc.width, height: doc.height, style: style.container})
    );
  }

}

SVGImage.propTypes = {
  fileId: React.PropTypes.string.isRequired,
};

module.exports = SVGImage;
