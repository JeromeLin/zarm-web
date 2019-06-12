import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export interface PortalProps {
  children: any;
  container?: React.ReactInstance | (() => React.ReactInstance) | null;
  disablePortal?: boolean;
  onRendered?: () => void;
}

function getContainer(container, defaultContainer) {
  container = typeof container === 'function' ? container() : container;
  return ReactDOM.findDOMNode(container) || defaultContainer;
}

class Portal extends React.Component<PortalProps> {
  static defaultProps = {
    disablePortal: false,
  };

  static propTypes = {
    children: PropTypes.node.isRequired,
    container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    disablePortal: PropTypes.bool,
    onRendered: PropTypes.func,
  };

  private mountNode: HTMLElement | null;

  componentDidMount() {
    const { container, disablePortal, onRendered } = this.props;
    this.setMountNode(container);

    if (!disablePortal) {
      this.forceUpdate(onRendered);
    }
  }

  /*componentDidUpdate(prevProps) {
    if (
      prevProps.container !== this.props.container ||
      prevProps.disablePortal !== this.props.disablePortal
    ) {
      this.setMountNode(this.props.container);

      if (!this.props.disablePortal) {
        this.forceUpdate(() => {
          if (this.props.onRendered) {
            clearTimeout(this.renderedTimer);
            this.renderedTimer = setTimeout(this.props.onRendered);
          }
        });
      }
    }
  }*/

  componentWillUnmount() {
    this.mountNode = null;
    // clearTimeout(this.renderedTimer);
  }

  setMountNode(container) {
    if (this.props.disablePortal) {
      this.mountNode = ReactDOM.findDOMNode(this)!.parentElement;
      return;
    }

    this.mountNode = getContainer(container, document.body);
  }

  getMountNode () {
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
