import React from 'react';
import Transition from '../transition';
import { NotificationStackItemProps } from './PropsType';

export default class StackItem extends React.Component<NotificationStackItemProps, {}> {
  private timeout: number;

  static defaultProps = {
    stayTime: 5000,
  };

  state = { visible: false };

  componentDidMount() {
    this.setState({ visible: true });
    this.startTimer();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.stayTime !== this.props.stayTime) {
      this.stopTimer();
      this.startTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  close = () => {
    this.stopTimer();
    this.setState({ visible: false }, this.props.onClose);
  };

  startTimer = () => {
    const { stayTime } = this.props;
    if (stayTime) {
      this.timeout = setTimeout(this.close, stayTime);
    }
  };

  stopTimer = () => {
    clearInterval(this.timeout);
  };

  render() {
    const { Component, name, willUnmount, stayTime, onClose, ...rest } = this.props;
    const { visible } = this.state;
    return (
      <Transition
        visible={visible}
        name={name}
        duration={300}
        unmountOnHide
        onHide={willUnmount}
      >
        <Component
          {...rest}
          onMouseEnter={this.stopTimer}
          onMouseLeave={this.startTimer}
          onClose={this.close}
        />
      </Transition>
    );
  }
}
