import React from 'react';
import Dropdown from '../../components/dropdown';
import '../../components/dropdown/style';

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: '1',
      list: Array(3000).fill('').map((item, index) => `this is ${index}`),
    };
  }

  componentDidMount() {

  }

  render() {
    const dom = (<div style={{ width: 50 }}>
      123112
      <br />
      12311231
      <br />
      qweq
      123112
      <br />
      12311231
      <br />
      qweq
      123112
      <br />
      12311231
      <br />
      qweq
      123112
      <br />
      12311231
      <br />
      qweq
      </div>
    );
    return (
      <div style={{ width: 200, height: 100, overflow: 'auto' }}>
        <Dropdown
          onVisibleChange={(visible) => {
            this.setState({
              visible,
            });
          }}
          overlay={dom}
          visible={this.state.visible}
        >
          <div style={{ whiteSpace: 'nowrap' }}>点击这里点击这里点击这里点击这里点击这里点击这里点击这里点击这里点击这里点击这里点击这里点击这里点击这里点击这里</div>
        </Dropdown>
      </div >
    );
  }
}
