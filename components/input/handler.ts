import { ReactNode } from 'react';
import { AddonIF, ReactNodeFn, isAddon } from './PropsType';

const DEFAULT_THEME_COLOR = '#F2F2F2';
const DEFAULT_FILL_COLOR = '#00BC70';

const colorTheme: { [x: string]: string } = {
  fill: DEFAULT_FILL_COLOR,
  default: DEFAULT_THEME_COLOR,
};

export function handleFillType(fillType: AddonIF['fillType']) {
  if (!fillType) {
    return DEFAULT_THEME_COLOR;
  }
  const color = colorTheme[fillType];
  return color || fillType;
}

export function handlAddonProps(addon: ReactNode | ReactNodeFn | AddonIF) {
  if (typeof addon === 'function') {
    return {
      fillType: 'default',
      addon: addon(),
    };
  }
  if (isAddon(addon)) {
    if (!addon.fillType) {
      addon.fillType = 'default';
    }
    return addon;
  }

  return {
    fillType: 'default',
    addon,
  };
}
