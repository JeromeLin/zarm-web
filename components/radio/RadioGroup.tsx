import React, { Component, ReactElement, ReactNode, isValidElement, cloneElement } from 'react';
import classnames from 'classnames';
import { RadioGroupProps } from './PropsType';

const getCheckedValue = (children: ReactNode) => {
  let val = null;
  React.Children.forEach(children, (element: ReactNode) => {
    if (isValidElement(element)
      && element.props
      && element.props.checked
    ) {
      const { props: { value } } = element;
      val = value;
    }
  });
  return val;
};

const getValue = (props: RadioGroup['props']) => {
  let val;
  const { value, defaultValue, children } = props;
  if ('value' in props) {
    val = value;
  } else if ('defaultValue' in props) {
    val = defaultValue;
  } else {
    val = getCheckedValue(children);
  }
  return val;
};

interface RadioGroupStates {
  value: string | number | null;
}

class RadioGroup extends Component<RadioGroupProps, RadioGroupStates> {
  static displayName = 'RadioGroup';

  static defaultProps = {
    prefixCls: 'zw-radio-group',
    size: 'md',
    type: 'button',
  };

  state: RadioGroupStates = {
    value: getValue(this.props),
  };

  static getDerivedStateFromProps(nextProps: RadioGroup['props']) {
    if ('value' in nextProps || getCheckedValue(nextProps.children)) {
      return {
        value: nextProps.value || getCheckedValue(nextProps.children),
      };
    }

    return null;
  }

  onRadioChange(e) {
    const { onChange } = this.props;
    this.setState({
      value: e.target.value,
    });
    onChange && onChange(e);
  }

  render() {
    const { prefixCls, size, children, block, ghost, type, shape, disabled, ...others } = this.props;
    const { value } = this.state;

    const cls = classnames(prefixCls, {
      [`${prefixCls}--${size}`]: size,
      [`${prefixCls}--block`]: !!block,
      [`${prefixCls}--ghost`]: !!ghost,
    });

    const childrenNode = React.Children.map(children, (element: ReactElement, index) => {
      return cloneElement(element, {
        ...others,
        key: index,
        type,
        shape,
        block: block || element.props.block,
        disabled: disabled || element.props.disabled,
        checked: value === element.props.value || Number(value) === Number(element.props.value),
        onChange: (e) => {
          this.onRadioChange(e);
        },
      });
    });

    return <div className={cls}>{childrenNode}</div>;
  }
}

export default RadioGroup;
