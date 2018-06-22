import React, { Component, ReactElement } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';
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
      id, label, labelCol, isRequired,
    } = props;

    const labelCls = classnames({
      [labelCol!]: !!labelCol,
    });

    const star =
      'required' in props || isRequired ? (
        <span className="ui-form-item-required">
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
    const { help } = this.props;

    return 'help' in this.props ? (
      <div className="ui-form-explain">{help}</div>
    ) : null;
  }

  render() {
    const { props } = this;
    const {
      theme, className, controlCol, children, style,
    } = props;

    const cls = classnames({
      'ui-form-item': true,
      [className!]: !!className,
    });

    const controlCls = classnames({
      'ui-form-item-control': true,
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
