import React, { Component, ReactElement } from 'react';
import classnames from 'classnames';
import Radio from './Radio';
import { GroupProps } from './PropsType';

class RadioGroup extends Component<GroupProps> {
  static defaultProps = {
    prefixCls: 'za-radio-group',
    onChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      value:
        props.value
        || props.defaultValue
        || RadioGroup.getCheckedValue(props.children),
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps || RadioGroup.getCheckedValue(nextProps.children)) {
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        value: nextProps.value || RadioGroup.getCheckedValue(nextProps.children),
      });
    }
  }

  onRadioChange(e) {
    const { onChange } = this.props;
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      value: e.target.value,
    });
    onChange(e);
  }

  static getCheckedValue(children) {
    let checkedValue = null;
    React.Children.forEach(children, (radio) => {
      if ((radio as ReactElement<any>).props && (radio as ReactElement<any>).props.checked) {
        checkedValue = (radio as ReactElement<any>).props.value;
      }
    });
    return checkedValue;
  }

  render() {
    const { prefixCls, size, children } = this.props;
    const { value } = this.state as { value?: string };
    const cls = classnames(prefixCls, {
      [`${prefixCls}--${size}`]: size,
    });

    const childrenNode = React.Children.map(children, (radio) => (
      <Radio
        {...(radio as ReactElement<any>).props}
        onChange={(e) => this.onRadioChange(e)}
        checked={value === (radio as ReactElement<any>).props.value}
      />
    ));

    return <div className={cls}>{childrenNode}</div>;
  }
}

export default RadioGroup;
