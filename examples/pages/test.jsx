import React from 'react';
import Select from '../../components/select';
import '../../components/select/style';

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '1',
      list: Array(3000).fill('').map((item, index) => `this is ${index}`),
    };
  }

  componentDidMount() {
    setTimeout(() => {
      // this.setState({
      //   ss: "你大二",
      // })
    }, 2000);
  }

  render() {
    return (
      <div
        style={{ width: 200, cursor: 'pointer' }}
      >
        <Select
          search
          style={{ width: '100%' }}
          value={this.state.value}
          onChange={({ value }) => {
            this.setState({
              value,
            });
          }}
        >
          {this.state.list.map((item, index) => <Select.Option value={index}>{item}</Select.Option>)}
        </Select>
      </div >
    );
  }
}
