import React from 'react';
import { IconType, ItemPropsType, APIPropsType } from './PropsType';

export function mapToIconType(type: IconType) {
  switch (type) {
    case 'success':
      return 'right-round-fill';
    case 'error':
      return 'wrong-round-fill';
    case 'warning':
      return 'warning-round-fill';
    case 'info':
      return 'info-round-fill';
    default:
      return undefined;
  }
}

export function mapToIconTheme(type: IconType) {
  switch (type) {
    case 'error':
      return 'danger';
    case 'info':
      return 'primary'
    case 'loading':
      return 'default'
    default:
      return type
  }
}

export function handleOptions(options: APIPropsType): ItemPropsType {
  if (
    options
    && Object.prototype.toString.call(options) === '[object Object]'
    && !React.isValidElement(options)
  ) {
    return { ...options as {} }
  }
  return { message: options as Exclude<APIPropsType, ItemPropsType> }
}
