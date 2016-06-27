const React = require('react');
const reactCSS = require('reactcss').default;
const Human = require('human-component');
const AppStore = require('../store/app');
const ProjectStore = require('../store/project');


const div = Human.from('div');
const Landing = Human.require(module, './landing');
const Tabs = Human.require(module, 'material-ui/Tabs', 'Tabs');
const Tab = Human.require(module, 'material-ui/Tabs', 'Tab');


const createStyle = (me) => reactCSS({
  default: {
    wrapper: {
      position: 'relative',
      width: '100vw',
      height: '100vh',
    },
    subwrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 44,
      right: 0,
    },
  },
}, me.props, me.state);

class Projects extends React.Component {

  constructor(props) {
    super(props);
    this.state = {projects: []};
    AppStore.get('current').on('change', this.onAppChange.bind(this));
  }

  onAppChange() {
    this.setState({projects: ProjectStore.all()})
  }

  render() {
    const style = createStyle(this);

    return Tabs.el(null,
      this.state.projects.map((project) => (
        Tab.el({label: project.name, key: project.id})
      )),
      Tab.el({label: 'New Project', key: 'new-project'},
        div.el({style: style.wrapper},
          div.el({style: style.subwrapper},
            Landing.el()
          )
        )
      )
    );
  }

}

module.exports = Projects;
