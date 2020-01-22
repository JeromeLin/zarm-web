import React from 'react';
import classnames from 'classnames';
import Icon from '../icon';
import Loading from '../loading';
import { ItemPropsType, IconType } from '../notification/PropsType';
import { mapToIconType, mapToIconTheme, getStyle } from '../notification/utils';

function getIcon(icon: IconType | React.ReactElement, className: string) {
  if (React.isValidElement(icon)) {
    return (
      <div className={className}>{icon}</div>
    );
  } if (icon === 'loading') {
    return (
      <Loading className={className} visible size="sm" />
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

export default class Message extends React.Component<ItemPropsType, {}> {
  static defaultProps: ItemPropsType = {
    prefixCls: 'zw-message',
  };

  render() {
    const {
      style, className, prefixCls, icon, message,
      top, bottom,
      onMouseEnter, onMouseLeave, onClick,
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
          <div>{message}</div>
        </div>
      </div>
    );
  }
}
