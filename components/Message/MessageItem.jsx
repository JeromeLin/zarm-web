
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class MessageItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible : false,
    };
  }

  componentDidMount() {
  	requestAnimationFrame(() => this.setState({ visible: true }));
  }

  render() {
	const { msg, dur, ...others } = this.props;

	let classname = classnames({
		'ui-message-wrapper': true,
		'ui-message-visible': this.state.visible
	});
  	return (
  		<div className={classname} {...others}>
          <div className="ui-message-container">
            内容：{msg} - 间隔：{dur}
          </div>
        </div>
  	);
  }
}

export default MessageItem;
