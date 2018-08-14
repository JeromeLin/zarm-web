import React, { Component, ReactElement } from 'react';
import classnames from 'classnames';
import Events from '../utils/events';
import StepItem from './StepItem';
import PropsType from './PropsType';

class Step extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-step',
    current: 1,
  };

  static Item;

  private unmounted;

  constructor(props) {
    super(props);
    this.unmounted = false;
    this.state = {
      itemWidth: '100%',
    };
  }

  componentDidMount() {
    this.unmounted = true;
    this.handleUpdate();
    this.bindHandlers();
  }

  componentWillUnmount() {
    this.unmounted = false;
    this.unbindHandlers();
  }

  handleUpdate() {
    if (!this.unmounted) {
      return;
    }

    const num = React.Children.count(this.props.children);
    const itemWidth = `${100 / num}%`;

    this.setState({ itemWidth });
  }

  bindHandlers() {
    Events.on(window, 'resize', _ => this.handleUpdate());
  }

  unbindHandlers() {
    Events.off(window, 'resize', _ => this.handleUpdate());
  }

  render() {
    const { props } = this;
    const { className, current, style, prefixCls } = props;

    const cls = classnames({
      [prefixCls!]: true,
      [className!]: !!className,
    });

    const children = React.Children.map(props.children, (item, index) => (
      <StepItem
        {...(item as ReactElement<any>).props}
        isFinished={index + 1 < current}
        isProcess={index + 1 === Number(current)}
        index={index + 1}
        style={{ width: `${this.state.itemWidth}` }}
      />
    ));

    return (
      <div className={cls} style={style}>
        {children}
      </div>
    );
  }
}

export default Step;
