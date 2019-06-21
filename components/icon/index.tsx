import React from 'react';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import IconProps from './PropsType';
import SVG from './component';

const LoadableComponent = (component) => {
  return Loadable({
    loader: component,
    loading: () => null,
  });
};


function Icon(props: IconProps) {
  const {
    prefixCls = 'za-icon', type = '', theme = 'default', size, className = '', style = {}, onClick = () => { },
  } = props;
  const needSizeClass = typeof size !== 'number';
  const cls = classnames({
    [prefixCls]: true,
    [`${prefixCls}-${type}`]: !!type,
    [`${prefixCls}--theme-${theme}`]: !!theme,
    [`${prefixCls}--size-${size}`]: needSizeClass && !!size,
    [className]: !!className,
  });

  if (!needSizeClass && size) {
    style.fontSize = size;
  }

  // type形式为allow-double-left，而svg组件名称为AllowDoubleLeft，需要将type名称转组件名称
  const svgNameArr = type.split('-').map((letter: string) => {
    return letter[0].toUpperCase() + letter.substring(1);
  });
  const svgNameStr = svgNameArr.join('');
  // const loader = () => import(`./component/${svgNameStr}`);
  const loader = SVG[svgNameStr];
  const SvgComponent = LoadableComponent(loader);
  return (
    <i className={cls} style={style} onClick={onClick}>
      <SvgComponent />
    </i>
  );
}

export default Icon;
