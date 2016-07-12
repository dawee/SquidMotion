const reactCSS = require('reactcss').default;
const Human = require('human-component');
const Squid = require('../squid');
const ProjectStore = require('../store/project');


const div = Human.from('div');
const Landing = Human.require(module, './landing');
const Layout = Human.require(module, './layout');
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

class Projects extends Squid.Component {

  constructor(props) {
    super(props);
    ProjectStore.on('change', this.onProjectStoreChange);
  }

  onProjectStoreChange() {
    this.setState({projects: ProjectStore.allOpen()});
  }

  initState() {
    this.state = {projects: ProjectStore.allOpen()};
  }

  render() {
    const style = createStyle(this);

    return Tabs.el(null,
      this.state.projects.map((project) => (
        Tab.el({label: project.name, key: project.fileId},
          div.el({style: style.wrapper},
            div.el({style: style.subwrapper},
              Layout.el({fileId: project.fileId})
            )
          )
        )
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

Projects.events = ['onProjectStoreChange'];

module.exports = Projects;
