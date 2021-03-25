import React from 'react';
import { mapToIconType, mapToIconTheme, handleOptions, getStyle } from '../utils';

describe('NotificationUtils', () => {
  it('map to icon type correctly', () => {
    expect(mapToIconType('success')).toBe('right-round-fill');
    expect(mapToIconType('error')).toBe('wrong-round-fill');
    expect(mapToIconType('warning')).toBe('warning-round-fill');
    expect(mapToIconType('info')).toBe('info-round-fill');
    expect(mapToIconType('others')).toBe(undefined);
  });

  it('map to icon theme correctly', () => {
    expect(mapToIconTheme('error')).toBe('danger');
    expect(mapToIconTheme('info')).toBe('primary');
    expect(mapToIconTheme('loading')).toBe('default');
    expect(mapToIconTheme('warning')).toBe('warning');
  });

  it('handle options correctly', () => {
    const content = 'test content';
    const reactNode = <p>sss</p>;
    const options = { content };
    expect(handleOptions()).not.toBe(undefined);
    expect(handleOptions().content).toBe(undefined);
    expect(handleOptions(content).content).toBe(content);
    expect(handleOptions(reactNode).content).toBe(reactNode);
    expect(JSON.stringify(handleOptions(options))).toBe(JSON.stringify(options));
  });

  it('get style correctly', () => {
    expect(getStyle({ fontSize: '12px' }, '20px')).toEqual({
      fontSize: '12px',
      top: '20px',
    });
    expect(getStyle({}, '20px', '100px')).toEqual({ top: '20px' });
    expect(getStyle({}, null, '100px')).toMatchSnapshot();
  });
});
