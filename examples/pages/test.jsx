import React from 'react';
import Select from '../../components/Select';
import '../../components/Select/style';

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Select search style={{ width: 300 }} value="">
          <Select.Option value="haha1">value1</Select.Option>
          <Select.Option value="haha2">value2</Select.Option>
          <Select.Option value="haha3">value3</Select.Option>
          <Select.Option value="haha4">111</Select.Option>
          <Select.Option value="haha5">value5</Select.Option>
          <Select.Option value="haha6">value6</Select.Option>
          <Select.Option value="haha7">value7</Select.Option>
          <Select.Option value="haha8">value8</Select.Option>
          <Select.Option value="haha9">value9</Select.Option>
          <Select.Option value="haha10">value10</Select.Option>
          <Select.Option value="haha11">value11</Select.Option>
        </Select>
      </div>
    );
  }
}
