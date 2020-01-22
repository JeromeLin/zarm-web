import React from "react";
import classnames from 'classnames';
import Icon from '../icon';
import { ItemPropsType, IconType } from './PropsType';
import { mapToIconType, mapToIconTheme } from './utils';

export default class Notification extends React.Component<ItemPropsType, {}> {
  static defaultProps: ItemPropsType = {
    prefixCls: 'zw-notification'
  }
  render() {
    const {
      className, prefixCls, title, icon, message, footer,
      top, bottom,
      onMouseEnter, onMouseLeave, onClose, onClick
    } = this.props;
    let iconToRender = icon ? getIcon(icon, `${prefixCls}__icon`) : null;
    let cls = classnames(`${prefixCls}__content`, { "has-icon": iconToRender });
    return (
      <div className={classnames(prefixCls, className)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ top, bottom }}
      >
        <div className={cls} onClick={onClick}>
          {iconToRender}
          <div className={`${prefixCls}__head`}>{title || getDefaultTitle(icon)}</div>
          {message && <div className={`${prefixCls}__body`}>{message}</div>}
          {footer && <div className={`${prefixCls}__foot`}>{footer}</div>}
        </div>
        <Icon className={`${prefixCls}__close`}
          type="wrong"
          size="sm"
          onClick={onClose}
        />
      </div>
    )
  }
}

function getDefaultTitle(icon?: IconType | React.ReactElement) {
  let title;
  if (icon === 'success') {
    title = '成功'
  } else if (icon === 'warning') {
    title = '警告'
  } else if (icon === 'error') {
    title = '错误'
  }
  return title || '通知';
}

function getIcon(icon: IconType | React.ReactElement, className: string) {
  if (React.isValidElement(icon)) {
    return (
      <div className={className}>{icon}</div>
    )
  }
  const iconType = mapToIconType(icon);
  return iconType ?
    <Icon type={mapToIconType(icon)}
      className={className}
      size="sm"
      theme={mapToIconTheme(icon)} />
    : null
}
