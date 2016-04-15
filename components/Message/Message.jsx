
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import MessageItem from './MessageItem';
// 创建一个div
let openFlg = false,
    div = document.createElement('div'),
    theme = 'info';

class Message extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timer : undefined,
      active: 0,
    };
  }

  componentDidMount() {
    if ( openFlg ) {
      this.enter();
      openFlg = false;
    }
  }

  componentWillReceiveProps (nextProps) {
    clearTimeout(this.state.timer);
    this.enter();
  }

  static default(message, duration) {
    openFlg = true;
    let messageArray = [{m: message}];
        duration = duration || 1500;  
    document.body.appendChild(div);
    ReactDOM.render(<Message msg={messageArray} duration={duration} theme={theme} />,div);
  }

  static info(message, duration) {
    theme = 'info';
    this.default(message, duration);
  }

  static success(message, duration) {
    theme = 'success';
    this.default(message, duration);
  }

  static warning(message, duration) {
    theme = 'warning';
    this.default(message, duration);
  }

  static error(message, duration) {
    theme = 'error';
    this.default(message, duration);
  }

  enter() {
    this.state.timer = setTimeout(() => {

      let node = this.refs.message.children;

      if(!node[this.state.active])
        return;

      node[this.state.active].className = 'ui-message-wrapper';

      this.state.active++;

      if( this.state.active != this.refs.message.children.length){
        this.enter();
      }

      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div)
      }, 500);

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
