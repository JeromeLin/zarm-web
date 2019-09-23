import React from 'react';
import classnames from 'classnames';
import { isAddon, AddonPropsIF } from '../PropsType';
import { handleFillType } from '../handler';

export default function Addon<T>(props: Readonly<AddonPropsIF>) {
  const { addon, size, param, shape, composePosition } = props;
  const cls = classnames({
    [`shape-${shape}`]: !!shape,
    'ui-addon': true,
    [`size-${size}`]: !!size,
    [`compose-position-${composePosition}`]: !!composePosition,
  });
  const params = Array.isArray(param) ? [param] : param;
  if (typeof addon === 'function') {
    // eslint-disable-next-line
    return addon.apply(undefined, params);
  } if (isAddon(addon)) {
    const { fillType } = addon;
    const addonElem = addon.addon;
    let childElem: React.ReactNode;
    if (typeof addonElem === 'function') {
      // eslint-disable-next-line
      childElem = addonElem.apply(undefined, params);
    } else {
      childElem = addonElem;
    }
    const bgColor = handleFillType(fillType);
    return <div className={cls} style={{ backgroundColor: bgColor }}>{childElem}</div>;
  }

  const bgColor = handleFillType('default');
  return <div className={cls} style={{ backgroundColor: bgColor }}>{addon}</div>;
}

Addon.defaultProps = {
  position: 'before',
  shape: 'radius',
};
