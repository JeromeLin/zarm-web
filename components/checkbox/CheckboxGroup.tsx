import React, { Component, ReactElement } from 'react';
import Checkbox from './Checkbox';
import { GroupProps } from './PropsType';

class CheckboxGroup extends Component<GroupProps, any> {
  static defaultProps = {
    prefixCls: 'za-checkbox-group',
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

  static getCheckedValue(children) {
    const checkedValue: ReactElement<any>[] = [];
    React.Children.forEach(children, (checkbox) => {
      if ((checkbox as ReactElement<any>).props && (checkbox as ReactElement<any>).props.checked) {
        checkedValue.push((checkbox as ReactElement<any>).props.value);
      }
    });
    return checkedValue;
  }

  render() {
    const { value } = this.state;
    const { children, prefixCls } = this.props;

    const childrenNode = React.Children.map(children, checkbox => (
      <Checkbox
        {...(checkbox as ReactElement<any>).props}
        onChange={e => this.onCheckboxChange(e)}
        checked={!!(value.indexOf((checkbox as ReactElement<any>).props.value) > -1)}
      />
    ));

    return <div className={prefixCls}>{childrenNode}</div>;
  }
}

export default CheckboxGroup;
