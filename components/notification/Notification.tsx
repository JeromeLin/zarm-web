import React from 'react';
import classnames from 'classnames';
import Icon from '../icon';
import { NotificationItemProps, NotificationIcon } from './PropsType';
import { mapToIconType, mapToIconTheme, getStyle } from './utils';

function getDefaultTitle(icon?: NotificationIcon | React.ReactElement) {
  let title;
  if (icon === 'success') {
    title = '成功';
  } else if (icon === 'warning') {
    title = '警告';
  } else if (icon === 'error') {
    title = '错误';
  }
  return title || '通知';
}

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
        type={mapToIconType(icon)}
        className={className}
        size="sm"
        theme={mapToIconTheme(icon)}
      />
    )
    : null;
}

export default class Notification extends React.Component<NotificationItemProps, {}> {
  static defaultProps: NotificationItemProps = {
    prefixCls: 'zw-notification',
  };

  render() {
    const {
      style, className, prefixCls, title, icon, message, footer,
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
          <div className={`${prefixCls}__head`}>{title || getDefaultTitle(icon)}</div>
          {message && <div className={`${prefixCls}__body`}>{message}</div>}
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
