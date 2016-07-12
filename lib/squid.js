const React = require('react');
const bindAll = require('101/bind-all');


let dragging = false;
let dragger = null;
let lastX = 0;
let lastY = 0;


class Component extends React.Component {

  constructor(props) {
    super(props);
    this.bindEvents();
    this.initState();
  }

  onDragEnter(evt) {
    dragging = true;
    dragger = this;
    lastX = evt.nativeEvent.screenX;
    lastY = evt.nativeEvent.screenY;
  }

  onDragMove(evt) {
    if (!dragging) return;

    dragger.onDrag(
      evt.nativeEvent.screenX - lastX,
      evt.nativeEvent.screenY - lastY
    );

    lastX = evt.nativeEvent.screenX;
    lastY = evt.nativeEvent.screenY;
  }

  onDragLeave() {
    dragging = false;
    dragger = null;
  }

  onDrag() {}
  initState() {}

  bindEvents() {
    bindAll(this, [
      'onDrag',
      'onDragEnter',
      'onDragMove',
      'onDragLeave',
    ].concat(this.constructor.events || []));
  }

}

exports.Component = Component;
