const React = require('react');
const ReactDOM = require('react-dom');


exports.boot = () => {
  ReactDOM.render(React.createElement('div'), document.getElementById('content'));
};

