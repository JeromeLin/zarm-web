import React from 'react';
import classnames from 'classnames';
import Icon from '../icon';
import { NotificationItemProps, NotificationIcon } from './PropsType';
import { mapToIconType, mapToIconTheme, getStyle } from './utils';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import Lang from '../locale-provider/lang/zh-cn';

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

export class Notification extends React.Component<NotificationItemProps, {}> {
  static defaultProps: NotificationItemProps = {
    prefixCls: 'zw-notification',
    locale: Lang.Notification,
  };

  render() {
    const {
      style, className, prefixCls, title, icon, content, footer,
      top, bottom,
      onMouseEnter, onMouseLeave, onClose, onClick,
      locale,
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
          <div className={`${prefixCls}__head`}>
            {title || locale!.defaultTitles[icon as string] || locale!.defaultTitles.default}
          </div>
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

const NotificationLocalized = LocaleReceiver('Notification')(Notification);
// eslint-disable-next-line
NotificationLocalized.defaultProps = Notification.defaultProps;

export default NotificationLocalized;
