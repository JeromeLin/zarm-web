
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Events from '../utils/events';
import StepItem from './StepItem';

class Step extends Component {

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

  render() { 
    const props = this.props;
    const { className, current, ...others } = props;

    const cls = classnames({
      'ui-step'  : true,
      [className]: !!className,
    });

    let children = React.Children.map(props.children, (item, index) => {
      return (
        <StepItem
          {...item.props}
          isFinished={index + 1 < current}
          isProcess={index + 1 == current}
          index={index + 1}
          style={{width: `${this.state.itemWidth}`}}
        />
      );
    });

    return (
      <div {...others} className={cls} ref="step">
        {children}
      </div>
    );
  }

  handleUpdate(e) {
    if (!this.unmounted) {
      return;
    }

    const step = this.refs.step,
          num = React.Children.count(this.props.children),
          itemWidth = 100 / num + '%';

    this.setState({itemWidth});
  }

  bindHandlers() {
    Events.on(window, 'resize', (e) => this.handleUpdate(e));
  }

  unbindHandlers() {
    Events.off(window, 'resize', (e) => this.handleUpdate(e));
  }
}

export default Step;