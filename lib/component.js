const React = require('react');


class Component extends React.Component {

  static el(props, children) {
    return React.createElement(this, props, children);
  }

  static from(element) {
    return {
      el: (props, children) => React.createElement(element, props, children)
    };
  }

}

module.exports = Component;
