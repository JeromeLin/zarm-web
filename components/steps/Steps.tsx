import React, { PureComponent, Children, cloneElement } from 'react';
import classnames from 'classnames';
import Step from './Step';
import { StepsProps } from './PropsType';

export default class Steps extends PureComponent<StepsProps> {
  static Step: typeof Step;

  static defaultProps = {
    prefixCls: 'zw-steps',
    direction: 'horizontal',
    current: 0,
    status: 'process',
  };

  render() {
    const {
      prefixCls,
      className,
      style,
      direction,
      children,
      current,
      onChange,
      status,
    } = this.props;

    const classStr = classnames(
      prefixCls,
      className,
      `${prefixCls}-${direction}`,
    );

    const filteredChildren = Children.toArray(children).filter(c => !!c);
    const lastIndex = filteredChildren.length - 1;

    return (
      <div className={classStr} style={style}>
        {Children.map(filteredChildren, (child: React.ReactElement, index: number) => {
          if (!child) {
            return null;
          }
          const childProps = {
            prefixCls,
            disabled: false,
            stepIndex: index,
            current,
            isLastStep: lastIndex === index,
            status: current === index ? status : 'wait',
            onClick(currentIndex: number) {
              onChange && onChange(currentIndex);
            },
            stepClick: typeof onChange === 'function',
            ...child.props,
          };
          return cloneElement(child, childProps);
        })}
      </div>
    );
  }
}
