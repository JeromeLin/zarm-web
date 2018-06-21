import React, { Component } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';
import { ItemProps } from './PropsType';

class MessageItem extends Component<ItemProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ visible: true }), 50);
  }

  render() {
    const { content, theme, style } = this.props;

    const wrapClass = classnames({
      'ui-message-wrapper': true,
      'ui-message-visible': this.state.visible,
    });

    const iconClass = classnames({
      [`ui-message-${theme}`]: !!theme,
    });

    let iconType = 'info-round';

    switch (theme) {
      case 'warning':
        iconType = 'warning-round';
        break;
      case 'success':
        iconType = 'right-round';
        break;
      case 'error':
        iconType = 'wrong-round';
        break;
      default:
        break;
    }

    return (
      <div className={wrapClass} style={style}>
        <div className="ui-message-container">
          <Icon
            type={iconType}
            className={iconClass}
            style={{ fontSize: 15 }}
          />
          {content}
        </div>
      </div>
    );
  }
}

export default MessageItem;
