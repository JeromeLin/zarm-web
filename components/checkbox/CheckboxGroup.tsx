import React, { Component, ReactElement } from 'react';
import Checkbox from './Checkbox';
import { GroupProps } from './PropsType';

class CheckboxGroup extends Component<GroupProps, any> {
  static defaultProps = {
    prefixCls: 'za-checkbox-group',
    onChange: () => {},
    disabled: false,
  };

  static getCheckedValue(children) {
    const checkedValue: ReactElement<any>[] = [];
    React.Children.forEach(children, (checkbox) => {
      if ((checkbox as ReactElement<any>).props && (checkbox as ReactElement<any>).props.checked) {
        checkedValue.push((checkbox as ReactElement<any>).props.value);
      }
    });
    return checkedValue;
  }

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
    if ('value' in nextProps || CheckboxGroup.getCheckedValue(nextProps.children)) {
      this.setState({
        value: nextProps.value || CheckboxGroup.getCheckedValue(nextProps.children),
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

    this.setState({
      value,
    });
    onChange(value);
  }


  render() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const { props, props: { disabled }, state: { value } } = this;
    const children = React.Children.map(props.children, checkbox => (
      <Checkbox
        {...(checkbox as ReactElement<any>).props}
        disabled={disabled}
        onChange={e => this.onCheckboxChange(e)}
        checked={!!(value.indexOf((checkbox as ReactElement<any>).props.value) > -1)}
      />
    ));
    return <div className={props.prefixCls}>{children}</div>;
  }
}

export default CheckboxGroup;
