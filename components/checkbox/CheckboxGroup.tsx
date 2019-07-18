import React, { Component, ReactElement } from 'react';
import classnames from 'classnames';
import Checkbox from './Checkbox';
import { GroupProps } from './PropsType';

class CheckboxGroup extends Component<GroupProps, any> {
  static defaultProps = {
    prefixCls: 'zw-checkbox-group',
    onChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      value:
        props.value
        || props.defaultValue
        || CheckboxGroup.getCheckedValue(props.children),
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (
      'defaultValue' in nextProps
      || 'value' in nextProps
      || CheckboxGroup.getCheckedValue(nextProps.children)
    ) {
      this.setState({
        value:
          nextProps.defaultValue
          || nextProps.value
          || CheckboxGroup.getCheckedValue(nextProps.children),
      });
    }
  }

  onCheckboxChange(e) {
    const { value } = this.state;
    const { onChange } = this.props;
    const index = value.indexOf(e.target.value);

    if (index < 0) {
      value.push(e.target.value);
    } else {
      value.splice(index, 1);
    }

    console.log(value);

    this.setState({
      value,
    });
    onChange(value);
  }

  static getCheckedValue(children) {
    const checkedValue: ReactElement<any>[] = [];
    React.Children.forEach(children, (checkbox) => {
      if (
        (checkbox as ReactElement<any>).props
        && (checkbox as ReactElement<any>).props.checked
      ) {
        checkedValue.push((checkbox as ReactElement<any>).props.value);
      }
    });
    return checkedValue;
  }

  render() {
    const { value } = this.state;
    const { children, prefixCls, className, style, disabled } = this.props;
    const cls = classnames(prefixCls, className);

    const childrenNode = React.Children.map(children, checkbox => (
      <Checkbox
        disabled={disabled}
        {...(checkbox as ReactElement<any>).props}
        onChange={e => this.onCheckboxChange(e)}
        checked={
          !!(value.indexOf((checkbox as ReactElement<any>).props.value) > -1)
        }
      />
    ));

    return (
      <div className={cls} style={style}>
        {childrenNode}
      </div>
    );
  }
}

export default CheckboxGroup;
