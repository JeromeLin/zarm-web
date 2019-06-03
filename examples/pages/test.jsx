import React from 'react';
import Select from '../../components/select';
import '../../components/select/style';

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '1',
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
          <Select.Option value="1">1234我是一个很长的代码11edasdasdcertwgtstyhbd</Select.Option>
          <Select.Option value="2">13</Select.Option>
          <Select.Option value="3">14</Select.Option>
          <Select.Option value="4">15</Select.Option>
          <Select.Option value="5">16</Select.Option>
          <Select.Option value="6">16</Select.Option>
          <Select.Option value="7">16</Select.Option>
          <Select.Option value="8">16</Select.Option>
          <Select.Option value="9">16</Select.Option>
          <Select.Option value="10">16</Select.Option>
          <Select.Option value="11">16</Select.Option>
          <Select.Option value="12">16</Select.Option>
          <Select.Option value="13">16</Select.Option>
          <Select.Option value="14">16</Select.Option>
          <Select.Option value="15">16</Select.Option>
        </Select>
      </div >
    );
  }
}
