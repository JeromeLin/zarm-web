
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Message extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timer: undefined,
      visible: false
    };
  }

  componentDidUpdate(){
    clearTimeout(this.state.timer);
    console.log(this.props.message)
    if( this.props.message.length )
      this.state.timer = setTimeout(() => {

        this._onClose();
      }, this.props.duration)
  }

  _onClose(){
    this.props.message.shift();
    this.setState({
      visible: false
    });
  }

  render () {
    const { message, duration, ...others } = this.props;

    let classname = classnames({
      'ui-message-wrapper': true,
      'ui-message-visible': true
    })

    return <div className="ui-message" {...others}>
      {message.map((o,i) => <div key={i} className={classname}>
        <div className="ui-message-container">
          内容:{o} - 时间:{duration}
        </div>
      </div>)}
    </div>

  }

  _onContainerClick(e) {
    e.stopPropagation();
  }

}

Message.propTypes = {
  message     : PropTypes.array,
  duration    : PropTypes.number,
};

Message.defaultProps = {
  message     : [],
  duration    : 1500
};

export default Message;

