import React, { PureComponent } from 'react';
import classnames from 'classnames';
import NumberInputProps from './PropsType';
import Input from '../input';
import Icon from '../icon';

export default class NumberInput extends PureComponent<NumberInputProps, any> {
  static defaultProps = {
    showStepper: false,
    decimal: 0,
    step: 1,
    onChange: () => {},
  };

  state = {
    value: this.props.value,
    addState: false,
    reduceState: false,
  };

  componentDidMount () {
    this.calculateNum();
  }

  onChange = e => {
    const { decimal } = this.props;
    let regex = decimal
      ? new RegExp('^\\d+(\\.[0-9]{0,' + decimal + '})?$', 'g')
      : new RegExp(/^\d+$/, 'g');
    let value = e.target.value;

    if (!value) {
      this.setState({ value });
    } else if (regex.test(value)) {
      this.props.onChange(e);
      this.setState({ value });
    }
  }

  calculateNum () {
    let { value } = this.state;
    const { min, max } = this.props;

    if (min !== undefined || max !== undefined) {
      parseInt(value, 10) < min ? value = min : value = value;
      parseInt(value, 10) > max ? value = max : value = value;
    }

    this.setState({ value });
  }

  onBlur = () => {
    const { onBlur } = this.props;
    this.calculateNum();
    if (onBlur) {
      onBlur();
    }
  }

  countField (type, step) {
    const { min, max, isDisabled } = this.props;
    let { value, addState, reduceState } = this.state;

    if (type === 'increase' && !addState && !isDisabled) {
      value += step;
      this.setState({ value });
    }

    if (type === 'decrease' && !reduceState && !isDisabled) {
      value -= step;
      this.setState({ value });
    }

    this.setState({
      addState: Number(value) >= max,
      reduceState: Number(value) <= min,
    });
    // this.calculateNum();
  }

  increase = () => {
    const { step } = this.props;
    this.countField('increase', step);
  }

  decrease = () => {
    const { step } = this.props;
    this.countField('decrease', step);
  }

  render() {
    const { className, style, isDisabled, placeholder, showStepper } = this.props;
    const { value, addState, reduceState } = this.state;
    const addCountClass = classnames({
      [`ui-number-input-count`]: true,
      [`ui-number-input-countadd`]: true,
      [`ui-number-input-count-disable`]: isDisabled || addState,
    });
    const reduceCountClass = classnames({
      [`ui-number-input-count`]: true,
      [`ui-number-input-countreduce`]: true,
      [`ui-number-input-count-disable`]: isDisabled || reduceState,
    });

    return (
      <div className="ui-number-input-wrapper">
        {showStepper && <span className={addCountClass} onClick={this.increase}><Icon type="add" /></span>}
        <Input
          className={className}
          style={style}
          value={value}
          onChange={this.onChange}
          onBlur={this.onBlur}
          isDisabled={isDisabled}
          placeholder={placeholder}
        />
        {showStepper && <span className={reduceCountClass} onClick={this.decrease}><Icon type="minus" /></span>}
      </div>
    );
  }
}
