import React, { PureComponent } from 'react';
import Button from '../../components/button';
import Modal from '../../components/modal';

class Page extends PureComponent {
  state = {
    visible: false,
  };

  onClick = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button onClick={this.onClick}>点击我</Button>
        <Modal
          onCancel={() => {
            this.setState({
              visible: false,
            });
          }}
          title="不愿爱的没有答案结局"
          direction="center"
          visible={visible}
        >
          hello world
        </Modal>
      </div>
    );
  }
}

export default Page;
