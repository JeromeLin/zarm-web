
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';

class MessageItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible : false,
    };
  }

  componentDidMount() {
  	setTimeout(() => this.setState({ visible: true }),50);
  }

  render() {
	const { msg, dur, theme, ...others } = this.props;

	let wrapClass = classnames({
		'ui-message-wrapper': true,
		'ui-message-visible': this.state.visible
	});

	let iconClass = classnames({
		[`ui-message-${theme}`] : !!theme,
	});

	let iconType = 'info';

	switch( theme ){
		case 'warning' :
			iconType = 'notice';
			break;
		case 'success' :
			iconType = 'roundcheck';
			break;
		case 'error' :
			iconType = 'roundclose';
			break;
	}

  	return (
  		<div className={wrapClass} {...others}>
          <div className="ui-message-container">
          	<Icon type={iconType} className={iconClass} style={{fontSize: 15}} />
            内容：{msg} - 间隔：{dur}
          </div>
        </div>
  	);
  }
}

export default MessageItem;
