
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageItem from './MessageItem';

class Message extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timer : undefined,
      active: 0,
    };
  }

  componentWillReceiveProps (nextProps) {
    clearTimeout(this.state.timer);
    this.enter();
  }

  enter() {
    this.state.timer = setTimeout(() => {

      let node = this.refs.message.children;

      if(!node[this.state.active])
        return;

      node[this.state.active].className = 'ui-message-wrapper';

      this.state.active++;

      if( this.state.active != this.refs.message.children.length)
        this.enter();

    }, this.props.duration)
  }

  render () {
    const { msg, duration, theme, ...others } = this.props;

    let items = msg.map((o,i) => {
      return <MessageItem key={i} content={o.m} duration={duration} theme={theme} />
    });

    return <div className="ui-message" ref="message" {...others}>
      {items}
    </div>
  }
}

Message.propTypes = {
  msg     : PropTypes.array,
  duration: PropTypes.number,
  theme   : PropTypes.oneOf(['info', 'warning', 'success', 'error']),
};

Message.defaultProps = {
  msg     : [],
  duration: 1500,
  theme   : 'info',
};

export default Message;
