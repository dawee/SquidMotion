const React = require('react');
const reactCSS = require('reactcss').default;
const Human = require('human-component');
const AnimationStore = require('../store/animation');
const Squid = require('../squid');

const div = Human.from('div');
const SVGImage = Human.require(module, './svgimage');
const Timeline = Human.require(module, './timeline');

const createStyle = (me) => reactCSS({
  default: {
    container: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    workspace: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: me.state.timelineHeight,
      left: 0,
      overflow: 'hidden',
    },
    timeline: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      left: 0,
      height: me.state.timelineHeight,
    },
  },
}, me.props, me.state);


class Layout extends Squid.Component {

  initState() {
    this.state = {
      timelineHeight: 300,
      currentAnimation: AnimationStore.getCurrentAnimation(this.props.fileId),
    };
  }

  render() {
    const style = createStyle(this);

    return (
      div.el({className: 'layout-project', style: style.container},
        div.el({style: style.workspace, key: 'workspace-wrapper'},
          SVGImage.el({fileId: this.props.fileId})
        ),
        div.el({style: style.timeline, key: 'timeline-wrapper'},
          Timeline.el({
            fileId: this.props.fileId,
            animationId: this.state.currentAnimation.animationId,
          })
        )
      )
    );
  }

}

Layout.propTypes = {
  fileId: React.PropTypes.string.isRequired,
};

module.exports = Layout;
