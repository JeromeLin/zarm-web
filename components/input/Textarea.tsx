import React, { Component } from 'react';
import classnames from 'classnames';
import { TextAreaProps } from './PropsType';

function fixControlledValue(value: string | number | null | undefined) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return String(value);
}

class Textarea extends Component<TextAreaProps, any> {
  textareaRef = React.createRef<HTMLTextAreaElement>();

  constructor(props) {
    super(props);
    const value = typeof props.value === 'undefined' ? props.defaultValue : props.value;
    this.state = {
      value,
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { onChange } = this.props;
    this.setState({ value: e.target.value });
    if (onChange) {
      onChange(e);
    }
  };

  focus = () => {
    if (this.textareaRef.current) {
      this.textareaRef.current.focus();
    }
  };

  blur = () => {
    if (this.textareaRef.current) {
      this.textareaRef.current.blur();
    }
  };

  render() {
    const {
      prefixCls,
      className,
      shape,
      disabled,
      defaultValue,
      showLength,
      bordered,
      maxLength,
      ...others
    } = this.props;
    const { value } = this.state;
    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--${shape}`]: shape,
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--without-bordered`]: !bordered,
    });

    return (
      <div className={`${prefixCls}-wrapper`}>
        <textarea
          {...others as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
          maxLength={maxLength}
          value={fixControlledValue(value)}
          ref={this.textareaRef}
          onChange={this.handleChange}
          className={cls}
        >
          {defaultValue}
        </textarea>
        {showLength && (
          <span className={`${prefixCls}__length-wrapper`}>
            <span className={`${prefixCls}__length-count`}>{(value || '').length}</span>
            /
            <span className={`${prefixCls}__length-max-count`}>{maxLength}</span>
          </span>
        )}
      </div>
    );
  }
}

export default Textarea;
