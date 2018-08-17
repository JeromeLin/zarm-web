import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import rafObj from '../utils/rAF';
import Select from '../select';
import TimeSelectProps from './PropsType';

const scrollTo = (element, to, duration) => {
  if (duration <= 0) {
    element.scrollTop = to;
    return;
  }

  const difference = to - element.scrollTop;
  const perTick = (difference / duration) * 10;

  rafObj.rAF(() => {
    element.scrollTop += perTick;

    if (element.scrollTop === to) { return; }
    scrollTo(element, to, duration - 10);
  });
};

class TimeSelect extends Component<TimeSelectProps, any> {
  private hourDom: string;
  private minuteDom: string;
  private secondDom: string;

  constructor (props) {
    super(props);
    this.state = {
      selectH: [],
      selectedH: [],

      selectM: [],
      selectedM: [],

      selectS: [],
      selectedS: [],
    };
  }

  componentDidMount () {
    this.selectInit();
    this.setDataFromValue(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.setDataFromValue(nextProps);
  }

  setDataFromValue (props) {
    const arrTime = props.value.split(':');

    this.setState({
      selectedH: [arrTime[0]],
      selectedM: [arrTime[1]],
      selectedS: [arrTime[2]],
    });
  }

  scrollToSelected (element, selectIndex, duration) {
    // @ts-ignore
    const selectDom: any = ReactDOM.findDOMNode(element).children[0];
    const list = selectDom.querySelector('ul');
    const topOption = list.children[selectIndex];
    const to = topOption.offsetTop;

    if (!list) { return; }
    scrollTo(selectDom, to, duration);
  }

  selectInit () {
    const { selectH, selectM, selectS } = this.state;

    for (let i = 0; i < 60; i++) {
      const num = i < 10 ? '0' + i : i + '';
      if (i < 24) { selectH.push(num); }
      selectM.push(num);
      selectS.push(num);
    }
    this.setState({ selectH, selectM, selectS });
  }

  onSelect (type, element, arr, selectIndex) {
    let { selectedH, selectedM, selectedS } = this.state;
    if (type === 'H') { selectedH = arr; }
    if (type === 'M') { selectedM = arr; }
    if (type === 'S') { selectedS = arr; }
    this.setState({ selectedH, selectedM, selectedS });
    const rVal = selectedH[0] + ':' + selectedM[0] + ':' + selectedS[0];
    this.scrollToSelected(element, selectIndex, 120);
    this.props.onChange(rVal);
  }

  render () {
    const { selectH, selectM, selectS } = this.state;

    return (
      <div className="ui-time-select">
        <Select.Multiple
          value={this.state.selectedH}
          ref={el => this.hourDom = el}
          onChange={(_, row) => this.onSelect('H', this.hourDom, [row.value], row.index)}
        >
          {
            selectH && selectH.map((option, index) => {
              return <Select.Option key={index} value={option}>{option}</Select.Option>;
            })
          }
        </Select.Multiple>
        <Select.Multiple
          value={this.state.selectedM}
          ref={el => this.minuteDom = el}
          onChange={(_, row) => this.onSelect('M', this.minuteDom, [row.value], row.index)}
        >
          {
            selectM && selectM.map((option, index) => {
              return <Select.Option key={index} value={option}>{option}</Select.Option>;
            })
          }
        </Select.Multiple>
        <Select.Multiple
          value={this.state.selectedS}
          ref={el => this.secondDom = el}
          onChange={(_, row) => this.onSelect('S', this.secondDom, [row.value], row.index)}
        >
          {
            selectS && selectS.map((option, index) => {
              return <Select.Option key={index} value={option}>{option}</Select.Option>;
            })
          }
        </Select.Multiple>
      </div>
    );
  }
}

export default TimeSelect;
