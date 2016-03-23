
import React, { Component, PropTypes } from 'react';
import MessageItem from './MessageItem';

class Message extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timer: undefined,
      active: 0,
    };
  }

  componentWillReceiveProps (nextProps) {
    clearTimeout( this.state.timer );
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

    }, this.props.dur )
  }

  render () {
    const { msg, dur, ...others } = this.props;

    let items = msg.map((o,i) => {
      return <MessageItem key={i} msg={o.m} dur={dur} />
    });

    return <div className="ui-message" ref="message" {...others}>
      {items}
    </div>
  }
}

Message.propTypes = {
  msg: PropTypes.array,
  dur: PropTypes.number,
};

Message.defaultProps = {
  msg: [],
  dur: 1500,
};

export default Message;
