import React from "react";
import classnames from 'classnames';
import Icon from '../icon';
import Loading from '../loading';
import { ItemPropsType, IconType } from '../notification/PropsType';
import { mapToIconType, mapToIconTheme } from '../notification/utils';

export default class Message extends React.Component<ItemPropsType, {}> {
  public static defaultProps: ItemPropsType = {
    prefixCls: 'zw-message'
  }
  render() {
    const {
      style, className, prefixCls, icon, message,
      onMouseEnter, onMouseLeave, onClick
    } = this.props;
    let iconToRender = icon ? getIcon(icon, `${prefixCls}__icon`) : null;
    let cls = classnames(`${prefixCls}__content`, { "has-icon": iconToRender });
    return (
      <div className={classnames(prefixCls, className)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={style}
      >
        <div className={cls} onClick={onClick}>
          {iconToRender}
          <div>{message}</div>
        </div>
      </div>
    )
  }
}

function getIcon(icon: IconType | React.ReactElement, className: string) {
  if (React.isValidElement(icon)) {
    return (
      <div className={className}>{icon}</div>
    )
  }
  else if (icon === 'loading') {
    return (
      <Loading className={className} visible size="sm" />
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
