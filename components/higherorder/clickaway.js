'use strict';

import ReactDOM from 'react-dom';
import * as Events from '../utils/events';

module.exports = function clickAway(Component) {
  Component.prototype.getClickAwayEvent = function () {
    let fn = this.state.checkClickAwayMethod;

    if (!fn) {
      fn = (e) => {
        let el = ReactDOM.findDOMNode(this);
        console.log(111)
        // Check if the target is inside the current component
        if (e.target !== el && !isDescendant(el, e.target)) {
          console.log(222)
          this.componentClickAway();
        }
      };
      this.setState({ checkClickAwayMethod: fn });
    }

    return fn;
  };

  Component.prototype.bindClickAway = function () {
    let fn = this.getClickAwayEvent();
    Events.on(document, 'click', fn);
    Events.on(document, 'touchstart', fn);
  };

  Component.prototype.unbindClickAway = function () {
    let fn = this.getClickAwayEvent();
    Events.off(document, 'click', fn);
    Events.off(document, 'touchstart', fn);
  };

  return Component;
}

function isDescendant (parent, child) {
  let node = child.parentNode;

  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}