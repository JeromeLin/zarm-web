import React, { Component } from 'react';
import MessageItem from './MessageItem';
import PropsType from './PropsType';

class Message extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-message',
    msg: [],
    duration: 1500,
    theme: 'info',
  };

  static Item;

  private timer;
  private active = 0;
  private message;

  componentWillReceiveProps() {
    clearTimeout(this.timer);
    this.enter();
  }

  enter() {
    const { prefixCls } = this.props;
    this.timer = setTimeout(() => {
      const node = this.message.children;

      if (!node[this.active]) {
        return;
      }

      node[this.active].className = `${prefixCls}-wrapper`;

      this.active++;

      if (this.active !== this.message.children.length) {
        this.enter();
      }
    }, this.props.duration);
  }

  render() {
    const {
      msg, duration, theme, style, prefixCls,
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
        className={prefixCls}
        ref={(message) => { this.message = message; }}
        style={style}
      >
        {items}
      </div>
    );
  }
}

export default Message;
