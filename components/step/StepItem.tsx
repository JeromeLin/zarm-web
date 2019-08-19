import React, { Component } from 'react';
import classnames from 'classnames';
import Icon from '../icon';
import { ItemProps } from './PropsType';

class StepItem extends Component<ItemProps, any> {
  static defaultProps = {
    prefixCls: 'ui-step',
  };

  render() {
    const {
      isFinished, isProcess, index, children, style, prefixCls,
    } = this.props;

    const cls = classnames({
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-finish`]: 'finished' in this.props || isFinished,
      [`${prefixCls}-item-process`]: 'process' in this.props || isProcess,
    });

    return (
      <div className={cls} style={style}>
        <div className={`${prefixCls}-item-line`} />
        <div className={`${prefixCls}-item-header`}>
          <div className={`${prefixCls}-item-header-inner`}>
            <span>
              {!('finished' in this.props || isFinished) ? (index) : (<Icon type="right" />)}
            </span>
          </div>
        </div>
        <div className={`${prefixCls}-item-body`}>{children}</div>
      </div>
    );
  }
}

export default StepItem;
