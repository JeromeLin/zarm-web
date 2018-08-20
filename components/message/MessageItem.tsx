import React, { Component } from 'react';
import classnames from 'classnames';
import Icon from '../icon';
import { ItemProps } from './PropsType';

class MessageItem extends Component<ItemProps, any> {
  static defaultProps = {
    prefixCls: 'ui-message',
  };
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
    const { content, theme, style, prefixCls } = this.props;

    const wrapClass = classnames({
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-visible`]: this.state.visible,
    });

    const iconClass = classnames({
      [`${prefixCls}-${theme}`]: !!theme,
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
        <div className={`${prefixCls}-container`}>
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
