import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageItem from './MessageItem';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: undefined,
      active: 0,
    };
  }

  componentWillReceiveProps() {
    clearTimeout(this.state.timer);
    this.enter();
  }

  enter() {
    this.state.timer = setTimeout(() => {
      const node = this.message.children;

      if (!node[this.state.active]) return;

      node[this.state.active].className = 'ui-message-wrapper';

      this.state.active++;

      if (this.state.active !== this.message.children.length) this.enter();
    }, this.props.duration);
  }

  render() {
    const {
      msg, duration, theme, style,
    } = this.props;

    // eslint-disable-next-line
    let items = msg.map((o, i) => {
      return (
        // eslint-disable-next-line
        <MessageItem key={i} content={o.m} duration={duration} theme={theme} />
      );
    });

    return (
      <div
        className="ui-message"
        ref={(message) => { this.message = message; }}
        style={style}
      >
        {items}
      </div>
    );
  }
}

Message.propTypes = {
  msg: PropTypes.arrayOf(PropTypes.object),
  duration: PropTypes.number,
  theme: PropTypes.oneOf(['info', 'warning', 'success', 'error']),
};

Message.defaultProps = {
  msg: [],
  duration: 1500,
  theme: 'info',
};

export default Message;
