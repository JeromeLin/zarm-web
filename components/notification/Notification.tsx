import React from 'react';
import classnames from 'classnames';
import Icon from '../icon';
import { NotificationProps, NotificationIcon } from './PropsType';
import { mapToIconType, mapToIconTheme, getStyle } from './utils';

function getIcon(icon: NotificationIcon | React.ReactElement, className: string) {
  if (React.isValidElement(icon)) {
    return (
      <div className={className}>{icon}</div>
    );
  }
  const iconType = mapToIconType(icon);
  return iconType
    ? (
      <Icon
        type={iconType}
        className={className}
        size="sm"
        theme={mapToIconTheme(icon)}
      />
    )
    : null;
}

export class Notification extends React.Component<NotificationProps, {}> {
  static defaultProps: NotificationProps = {
    prefixCls: 'zw-notification',
    content: '',
    title: '',
  };

  render() {
    const {
      style, className, prefixCls, title, icon, content, footer,
      top, bottom,
      onMouseEnter, onMouseLeave, onClose, onClick,
    } = this.props;
    const iconToRender = icon ? getIcon(icon, `${prefixCls}__icon`) : null;
    const cls = classnames(`${prefixCls}__content`, { 'has-icon': iconToRender });
    return (
      <div
        className={classnames(prefixCls, className, {
          [`${prefixCls}--fixed`]: top || bottom,
        })}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={getStyle(style, top, bottom)}
      >
        <div className={cls} onClick={onClick}>
          {iconToRender}
          {title && <div className={`${prefixCls}__head`}>
            {title}
          </div>}
          {content && <div className={`${prefixCls}__body`}>{content}</div>}
          {footer && <div className={`${prefixCls}__foot`}>{footer}</div>}
        </div>
        <Icon
          className={`${prefixCls}__close`}
          type="wrong"
          size="sm"
          onClick={onClose}
        />
      </div>
    );
  }
}

export default Notification;
