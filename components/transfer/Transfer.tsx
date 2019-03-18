import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import Select from '../select';
import Button from '../button';
import Icon from '../icon';

class Transfer extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-transfer',
    size: null,
    isDisabled: false,
    isRadius: false,

    initialPanelTitle: '',
    selectedPanelTitle: '',

    initialValue: [],
    selectedValue: [],

    keyOfItem: '',
    displayNameOfItem: '',

    onAdd: () => {},
    onDoubleAdd: () => {},
    onMinus: () => {},
    onDoubleMinus: () => {},

  };

  constructor(props) {
    super(props);
    this.state = {
      initialValue: props.initialValue || [],
      selectedValue: props.selectedValue || [],
      selectedLeft: [],
      selectedRight: [],
    };
  }

  _onAdd() {
    let initialValue = [...this.state.initialValue].filter(
      item => (this.state.selectedLeft.indexOf(item[this.props.keyOfItem]) < 0) && item);
    let selected = [...this.state.initialValue].filter(
      item => (this.state.selectedLeft.indexOf(item[this.props.keyOfItem]) > -1) && item);
    let selectedValue = this.state.selectedValue.concat(selected);
    this.setState({
      initialValue,
      selectedValue,
      selectedLeft:  [],
      selectedRight: [],
    });
    this.props.onAdd(selectedValue);
  }

  _onMinus() {
    let selectedValue = [...this.state.selectedValue].filter(
      item => (this.state.selectedRight.indexOf(item[this.props.keyOfItem]) < 0) && item);
    let selected = [...this.state.selectedValue].filter(
      item => (this.state.selectedRight.indexOf(item[this.props.keyOfItem]) > -1) && item);
    let initialValue = this.state.initialValue.concat(selected);
    this.setState({
      initialValue,
      selectedValue,
      selectedLeft:  [],
      selectedRight: [],
    });
    this.props.onMinus(selectedValue);
  }

  _onDoubleAdd(e) {
    let initialValue = [...this.state.initialValue].filter(
      item => (e.target.textContent !== item[this.props.displayNameOfItem]) && item);
    let selected = [...this.state.initialValue].filter(
      item => (e.target.textContent === item[this.props.displayNameOfItem]) && item);
    let selectedValue = this.state.selectedValue.concat(selected);
    this.setState({
      initialValue,
      selectedValue,
    });
    this.props.onDoubleAdd(selectedValue);
  }

  _onDoubleMinus(e) {
    let selectedValue = [...this.state.selectedValue].filter(
      item => (e.target.textContent !== item[this.props.displayNameOfItem]) && item);
    let selected = [...this.state.selectedValue].filter(
      item => (e.target.textContent === item[this.props.displayNameOfItem]) && item);
    let initialValue = this.state.initialValue.concat(selected);
    this.setState({
      initialValue,
      selectedValue,
    });
    this.props.onDoubleMinus(selectedValue);
  }

  handleMultipleSelection(selectedRows, { index: currentIndex, value: currentValue }, operType) {
    const len = selectedRows.length;
    const { keyOfItem } = this.props;
    const { initialValue, selectedValue } = this.state;
    const values = operType === 'add' ? initialValue : selectedValue;
    const selectedName = operType === 'add' ? 'selectedLeft' : 'selectedRight';
    if (len >= 2) {
      // 有上一次选择
      let lastSelectedValue = selectedRows[len - 1];
      if (lastSelectedValue === currentValue) {
        if (len > 2) {
          return;
        } else {
          lastSelectedValue = selectedRows[len - 2];
        }
      }
      let lastIndex;

      values.forEach((item, index) => {
        if (item[keyOfItem] === lastSelectedValue) {
          lastIndex = index;
        }
      });

      const selected = [...values].splice(
        Math.min(lastIndex, currentIndex),
        Math.abs(lastIndex - currentIndex) + 1,
      ).map(item => item[keyOfItem]);

      if (currentIndex < lastIndex) {
        selected.shift();
        selected.push(currentValue);
      }

      this.setState({
        [selectedName]: selected,
      });
    }
  }

  render() {
    const {
      prefixCls,
      size,
      isDisabled,
      isRadius,
      style,
      width,
      initialPanelTitle,
      selectedPanelTitle,
      keyOfItem,
      displayNameOfItem,
    } = this.props;

    const disabled = 'disabled' in this.props || isDisabled;
    const radius =  'radius' in this.props || isRadius;

    const cls = classnames({
      [prefixCls!]: true,
      [`size-${size}`]: !!size,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-radius`]: radius,
    });

    return (
      <div
        style={{ ...style, width }}
        className={cls}
      >
        <div className={prefixCls + '-panel'}>
          <h4 className={prefixCls + '-panel-title'}>{initialPanelTitle}</h4>
          <Select.Multiple
            isDisabled={disabled}
            isRadius={radius}
            value={this.state.selectedLeft}
            onChange={(selectedRows, row, shiftKey) => {
              if (shiftKey) {
                this.handleMultipleSelection(selectedRows, row, 'add');
                return;
              }
              this.setState({ selectedLeft: selectedRows });
            }}
            onDoubleClick={(e) => !disabled && this._onDoubleAdd(e)}
          >
            {
            this.state.initialValue.map((option, index) => {
                return (
                <Select.Option key={index} value={option[keyOfItem]} >
                      {option[displayNameOfItem]}
                </Select.Option>
                );
            })
            }
          </Select.Multiple>
        </div>
        <div className={prefixCls + '-action-bar'}>
          <div className="button-wrapper">
          <Button disabled={this.state.selectedLeft.length === 0} onClick={() => !disabled && this._onAdd()}>
          <Icon type="add"/>
          </Button>
          <Button disabled={this.state.selectedRight.length === 0} onClick={() => !disabled && this._onMinus()}>
            <Icon type="minus" />
          </Button>
          </div>
        </div>
        <div className={prefixCls + '-panel'}>
          <h4 className={prefixCls + '-panel-title'}>{selectedPanelTitle}</h4>
          <Select.Multiple
            isDisabled={disabled}
            isRadius={radius}
            value={this.state.selectedRight}
            onChange={(selectedRows, row, shiftKey) => {
              if (shiftKey) {
                this.handleMultipleSelection(selectedRows, row, 'minus');
                return;
              }
              this.setState({ selectedRight: selectedRows });
            }}
            onDoubleClick={(e) => !disabled && this._onDoubleMinus(e)}
          >
            {
            this.state.selectedValue.map((option, index) => {
            return (<Select.Option key={index} value={option[keyOfItem]}>{option[displayNameOfItem]}</Select.Option>);
            })
            }
          </Select.Multiple>
        </div>
      </div>
    );
  }
}

export default Transfer;
