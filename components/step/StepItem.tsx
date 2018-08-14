import React, { Component } from 'react';
import classnames from 'classnames';
import Icon from '../icon';
import { ItemProps } from './PropsType';

class StepItem extends Component<ItemProps, any> {
  static defaultProps = {
    prefixCls: 'ui-step',
  };

  render() {
    const { props } = this;
    const {
      isFinished, isProcess, index, children, style, prefixCls,
    } = props;

    const cls = classnames({
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-finish`]: 'finished' in props || isFinished,
      [`${prefixCls}-item-process`]: 'process' in props || isProcess,
    });

    return (
      <div className={cls} style={style}>
        <div className={`${prefixCls}-item-line`} />
        <div className={`${prefixCls}-item-header`}>
          <div className={`${prefixCls}-item-header-inner`}>
            <span>
              {!('finished' in props || isFinished) ? (index) : (<Icon type="right" />)}
            </span>
          </div>
        </div>
        <div className={`${prefixCls}-item-body`}>{children}</div>
      </div>
    );
  }
}

export default StepItem;
