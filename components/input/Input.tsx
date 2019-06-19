/* eslint-disable */
import React, { Component, TextareaHTMLAttributes, InputHTMLAttributes, ChangeEventHandler } from 'react';
import classnames from 'classnames';
// @ts-ignore
import PropsType from './PropsType';
import Addon from './cps/Addon';
import InputGroup from './input-group';
import Search from './input-search';

interface InputTypeIF {
  textarea: TextareaHTMLAttributes<HTMLTextAreaElement>;
  input: InputHTMLAttributes<HTMLInputElement>;
}
interface InputElemIF {
  textarea: HTMLTextAreaElement;
  input: HTMLInputElement;
}

interface StateIF {
  focused: boolean;
}

function fixControlledValue(value: string | number | null | undefined) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return String(value);
}

function isTextAreaProps(props: Merge<InputTypeIF['input'], PropsType> |
  Merge<InputTypeIF['textarea'], PropsType>):
  props is Merge<InputTypeIF['textarea'], PropsType> {
  return props.type === 'textarea';
}

function isInputProps(props: Merge<InputTypeIF['input'], PropsType> |
  Merge<InputTypeIF['textarea'], PropsType>):
  props is Merge<InputTypeIF['input'], PropsType> {
  return props.type !== 'textarea';
}

class Input<T extends 'input' | 'textarea' = 'input'> extends Component<Merge<InputTypeIF[T], PropsType>, StateIF> {
  static Group = InputGroup;

  static Search = Search;

  static defaultProps = {
    prefixCls: 'ui-input',
    type: 'text',
    size: null,
    shape: 'radius',
  };

  static getDerivedStateFromProps(props: Input['props']) {
    return {
      value: props.value,
    };
  }

  state: StateIF = {
    focused: false,
  };

  refMap: {
    input?: InputElemIF[T];
  } = {};

  inputElemRef = (elem: InputElemIF[T] | null) => {
    if (elem) {
      this.refMap.input = elem;
    }
  };

  onFocus = (event: any) => {
    const { props } = this;
    if (props.onFocus) {
      props.onFocus(event);
    }
    this.setState({
      focused: true,
    });
  };

  onBlur = (event: any) => {
    const { props } = this;
    if (props.onBlur) {
      props.onBlur(event);
    }
    this.setState({
      focused: false,
    });
  };

  onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const onChange = this.props.onChange as ChangeEventHandler<HTMLTextAreaElement> | undefined;
    if (onChange) {
      onChange(e);
    }
    if (this.props.showLength) {
      this.forceUpdate();
    }
  };

  getLength() {
    const { maxLength, showLength } = this.props;
    let length;
    if (showLength) {
      length = this.refMap.input ? this.refMap.input.value.length : 0 || 0;
    }

    if (maxLength) {
      if (length) {
        return (
          <span className="length-box">
            {length}
/
            {maxLength}
          </span>
        );
      }
      return <span className="length-box">{maxLength}</span>;
    }
    return null;
  }

  renderInput(
    props: Merge<InputTypeIF['input'], PropsType>,
    cls: string,
  ) {
    const {
      type, prefixCls, shape, size,
      className, addonPrefix, addonBefore,
      addonAfter, showLength, value, ...others
    } = props;
    return (
      <div className={cls}>
        {addonBefore && <Addon size={size} addon={addonBefore} />}
        <input
          {...others}
          className={prefixCls}
          ref={this.inputElemRef}
          type={type}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        {addonAfter && <Addon size={size} addon={addonAfter} />}
      </div>
    );
  }

  renderTextarea(
    props: Merge<InputTypeIF['textarea'], PropsType>,
    cls: string,
  ) {
    const {
      type, prefixCls, shape, size,
      className, addonPrefix, addonBefore,
      addonAfter, showLength, value, defaultValue,
      ...others
    } = props;
    return (
      <span className={`${prefixCls}-textarea-box`}>
        <textarea
          {...others}
          ref={this.inputElemRef}
          className={cls}
          onChange={this.onTextareaChange}
        >
          {defaultValue}
        </textarea>
        {this.getLength()}
      </span>
    );
  }

  render() {
    const { props } = this;
    const { disabled, defaultValue, shape, prefixCls, className, size } = props;
    const cls = classnames({
      [`${prefixCls}-box`]: true,
      disabled,
      [`shape-${shape}`]: true,
      [className!]: !!className,
      [`size-${size}`]: !!size,
      active: this.state.focused,
    });

    const valueObject = {
      value: defaultValue || '',
    };
    if ('value' in props) {
      valueObject.value = fixControlledValue(props.value);
    }
    if (isTextAreaProps(props)) {
      return this.renderTextarea(props, cls);
    }
    if (isInputProps(props)) {
      return this.renderInput(props, cls);
    }
  }
}

export default Input;
