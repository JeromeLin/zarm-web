import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { StepsItemProps } from './PropsType';
import Icon from '../icon';

export default class Step extends PureComponent<StepsItemProps & any> {
  renderIconNode = () => {
    const {
      current,
      stepIndex,
      status,
    } = this.props;
    let iconNode = stepIndex + 1;
    if (current > stepIndex || status === 'finish') {
      iconNode = <Icon type="right" theme="success" size="sm" />;
    }
    if (status === 'error') {
      iconNode = <Icon type="wrong" theme="danger" size="sm" />;
    }
    return iconNode;
  };

  handleClickItem = () => {
    const { onClick, stepIndex } = this.props;
    onClick && onClick(stepIndex);
  };

  render() {
    const {
      className,
      style,
      title,
      description,
      disabled,
      prefixCls,
      current,
      stepIndex,
      status,
      isLastStep,
      stepClick,
    } = this.props;

    const classStr = classnames(className, `${prefixCls}-item`, {
      [`${prefixCls}-item--finish`]: current > stepIndex && status !== 'error',
      [`${prefixCls}-item--active`]: current === stepIndex,
      [`${prefixCls}-item--${status || 'process'}`]: status,
      [`${prefixCls}-item--wait`]: current < stepIndex,
      [`${prefixCls}-item--disabled`]: disabled,
    });

    const stepItemProps: any = {};
    if (stepClick) {
      stepItemProps.role = 'button';
      if (!disabled) {
        stepItemProps.onClick = this.handleClickItem;
      }
    }

    return (
      <div className={classStr} style={style} {...stepItemProps}>
        <div className={`${prefixCls}-item--icon`}>{this.renderIconNode()}</div>
        {!isLastStep && <div className={`${prefixCls}-item--tail`} />}
        <div className={`${prefixCls}-item--content`}>
          <div className={`${prefixCls}-item--title`}>{title}</div>
          {description && <div className={`${prefixCls}-item--desc`}>{description}</div>}
        </div>
        {disabled}
      </div>
    );
  }
}
