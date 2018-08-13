import React, { Component, ReactElement } from 'react';
import Radio from './Radio';
import { GroupProps } from './PropsType';

class RadioGroup extends Component<GroupProps, any> {
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
    const { value } = this.state as { value?: string };

    const children = React.Children.map(props.children, radio => (
      <Radio
        {...(radio as ReactElement<any>).props}
        onChange={e => this.onRadioChange(e)}
        // tslint:disable-next-line:triple-equals
        checked={value == (radio as ReactElement<any>).props.value} // eslint-disable-line
      />
    ));

    return <div className="ui-radio-group">{children}</div>;
  }

  // eslint-disable-next-line
  getCheckedValue(children) {
    let checkedValue = null;
    React.Children.forEach(children, (radio) => {
      if ((radio as ReactElement<any>).props && (radio as ReactElement<any>).props.checked) {
        checkedValue = (radio as ReactElement<any>).props.value;
      }
    });
    return checkedValue;
  }

  onRadioChange(e) {
    this.setState({
      value: e.target.value,
    });
    this.props.onChange(e);
  }
}

export default RadioGroup;
