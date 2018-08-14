import React, { Component, ReactElement } from 'react';
import classnames from 'classnames';
import Option from './Option';
import Menu from '../menu';
import { MultipleProps } from './PropsType';

class SelectMultiple extends Component<MultipleProps, any> {
  static defaultProps = {
    prefixCls: 'ui-select',
    isRadius: false,
    isDisabled: false,
    onChange: () => {},
    onDoubleClick: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      value:
        props.value ||
        props.defaultValue ||
        this.getCheckedValue(props.children),
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps || this.getCheckedValue(nextProps.children)) {
      this.setState({
        value: nextProps.value || this.getCheckedValue(nextProps.children),
      });
    }
  }

  // eslint-disable-next-line
  getCheckedValue(children) {
    const checkedValue = [];
    React.Children.forEach(children, (option) => {
      if ((option as ReactElement<any>).props && (option as ReactElement<any>).props.checked) {
        checkedValue.push((option as ReactElement<any>).props.value as never);
      }
    });
    return checkedValue;
  }

  // eslint-disable-next-line
  onSelectClick(e) {
    e.preventDefault();
  }

  onOptionChange(_, props, rowIndex) {
    if ('disabled' in props) {
      return;
    }

    const { value } = this.state;
    const index = value.indexOf(props.value);
    const isSelected = index > -1;

    if (isSelected) {
      value.splice(index, 1);
    } else {
      value.push(props.value);
    }

    const row = {
      index: rowIndex,
      value: props.value,
      text: props.children,
      selected: !isSelected,
    };

    this.setState({ value }, () => this.props.onChange(value, row));
  }

  render() {
    const { props } = this;
    const {
      prefixCls, isRadius, isDisabled, size, style, onDoubleClick,
    } = props;
    const disabled = 'disabled' in props || isDisabled;
    const radius = 'radius' in props || isRadius;

    // eslint-disable-next-line
    let children = React.Children.map(props.children, (option, index) => {
      return (
        <Option
          {...(option as ReactElement<any>).props}
          onDoubleClick={onDoubleClick}
          onChange={e => this.onOptionChange(e, (option as ReactElement<any>).props, index)}
          checked={!!(this.state.value.indexOf((option as ReactElement<any>).props.value) > -1)}
        />
      );
    });

    const cls = classnames({
      [prefixCls!]: true,
      [`${prefixCls}-open`]: this.state.dropdown,
      disabled,
      radius,
      [`size-${size}`]: !!size,
    });

    return (
      <span className={cls} style={style}>
        <span
          className={`${prefixCls}-selection`}
          style={{ height: '100%', maxHeight: 250, overflow: 'auto' }}
          role="combobox"
          aria-autocomplete="list"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={e => !disabled && this.onSelectClick(e)}
        >
          <Menu size={size}>{children}</Menu>
        </span>
      </span>
    );
  }
}

export default SelectMultiple;
