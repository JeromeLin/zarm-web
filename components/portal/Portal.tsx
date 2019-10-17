import React from 'react';
import ReactDOM from 'react-dom';

export interface PortalProps {
  children: any;
  container?: React.ReactInstance | (() => React.ReactInstance) | null;
  disablePortal?: boolean;
  onRendered?: () => void;
}

function getContainer(container, defaultContainer) {
  container = typeof container === 'function' ? container() : container;
  // eslint-disable-next-line react/no-find-dom-node
  return ReactDOM.findDOMNode(container) || defaultContainer;
}

class Portal extends React.Component<PortalProps> {
  static defaultProps = {
    disablePortal: false,
  };

  private mountNode: HTMLElement | null;

  componentDidMount() {
    const { container, disablePortal, onRendered } = this.props;
    this.setMountNode(container);

    if (!disablePortal) {
      this.forceUpdate(onRendered);
    }
  }

  componentWillUnmount() {
    this.mountNode = null;
    // clearTimeout(this.renderedTimer);
  }

  setMountNode(container) {
    const { disablePortal } = this.props;
    if (disablePortal) {
      // eslint-disable-next-line react/no-find-dom-node
      this.mountNode = ReactDOM.findDOMNode(this)!.parentElement;
      return;
    }

    this.mountNode = getContainer(container, document.body);
  }

  getMountNode() {
    return this.mountNode;
  }

  render() {
    const { children, disablePortal } = this.props;

    if (disablePortal) {
      return children;
    }

    return this.mountNode ? ReactDOM.createPortal(children, this.mountNode) : null;
  }
}

export default Portal;
