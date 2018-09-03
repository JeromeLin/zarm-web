import React, { Component, ReactElement } from 'react';
import classnames from 'classnames';
import Icon from '../icon';
import { ItemProps } from './PropsType';

class FormItem extends Component<ItemProps, any> {
  static defaultProps = {
    prefixCls: 'ui-form',
    theme: 'default',
  };

  _getId() {
    const { children } = this.props;
    if ((children as ReactElement<any>).props) {
      return (children as ReactElement<any>).props.id;
    }
  }

  _renderLabel() {
    const { props } = this;
    const {
      id, label, labelCol, isRequired, prefixCls,
    } = props;

    const labelCls = classnames({
      [labelCol!]: !!labelCol,
    });

    const star =
      'required' in props || isRequired ? (
        <span className={`${prefixCls}-item-required`}>
          <Icon type="required" />
        </span>
      ) : null;

    return 'label' in props ? (
      <label className={labelCls} htmlFor={id || this._getId()}>
        {star}
        {label}
      </label>
    ) : null;
  }

  _renderExplain() {
    const { help, prefixCls } = this.props;

    return 'help' in this.props ? (
      <div className={`${prefixCls}-explain`}>{help}</div>
    ) : null;
  }

  render() {
    const { props } = this;
    const {
      theme, className, controlCol, children, style, prefixCls,
    } = props;

    const cls = classnames({
      [`${prefixCls}-item`]: true,
      [className!]: !!className,
    });

    const controlCls = classnames({
      [`${prefixCls}-item-control`]: true,
      [`${prefixCls}-item-control-help`]: 'help' in props,
      [controlCol!]: !!controlCol,
      [`theme-${theme}`]: !!theme,
    });

    return (
      <div className={cls} style={style}>
        {this._renderLabel()}
        <div className={controlCls}>
          {children}
          {this._renderExplain()}
        </div>
      </div>
    );
  }
}

export default FormItem;
