import React, { Component, ReactElement } from 'react';
import Checkbox from './Checkbox';
import { GroupProps } from './PropsType';

class CheckboxGroup extends Component<GroupProps, any> {
  static defaultProps = {
    onChange: () => {},
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

  render() {
    const { props } = this;

    const children = React.Children.map(props.children, checkbox => (
      <Checkbox
        {...(checkbox as ReactElement<any>).props}
        onChange={e => this.onCheckboxChange(e)}
        checked={!!(this.state.value.indexOf((checkbox as ReactElement<any>).props.value) > -1)}
      />
    ));

    return <div className="ui-checkbox-group">{children}</div>;
  }

  // eslint-disable-next-line
  getCheckedValue(children) {
    const checkedValue: ReactElement<any>[] = [];
    React.Children.forEach(children, (checkbox) => {
      if ((checkbox as ReactElement<any>).props && (checkbox as ReactElement<any>).props.checked) {
        checkedValue.push((checkbox as ReactElement<any>).props.value);
      }
    });
    return checkedValue;
  }

  onCheckboxChange(e) {
    const { value } = this.state;
    const index = value.indexOf(e.target.value);

    if (index < 0) {
      value.push(e.target.value);
    } else {
      value.splice(index, 1);
    }

    this.setState({
      value,
    });
    this.props.onChange(value);
  }
}

export default CheckboxGroup;
