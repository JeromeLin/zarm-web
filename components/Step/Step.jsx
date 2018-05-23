import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  handleUpdate() {
    if (!this.unmounted) {
      return;
    }

    const num = React.Children.count(this.props.children);
    const itemWidth = `${100 / num}%`;

    this.setState({ itemWidth });
  }

  bindHandlers() {
    Events.on(window, 'resize', e => this.handleUpdate(e));
  }

  unbindHandlers() {
    Events.off(window, 'resize', e => this.handleUpdate(e));
  }

  render() {
    const { props } = this;
    const { className, current, style } = props;

    const cls = classnames({
      'ui-step': true,
      [className]: !!className,
    });

    const children = React.Children.map(props.children, (item, index) => (
      <StepItem
        {...item.props}
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

Step.propTypes = {
  current: PropTypes.number,
};

Step.defaultProps = {
  current: 1,
};

export default Step;
