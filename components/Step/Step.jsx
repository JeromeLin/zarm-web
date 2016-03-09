
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import StepItem from './StepItem';

class Step extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemWidth: 0,
    };
  }

  componentDidMount() {
    this._updateItemWidth();
    window.addEventListener("resize", () => this._updateItemWidth());
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this._updateItemWidth());
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
          style={{width: this.state.itemWidth}}
        />
      );
    });

    return (
      <div {...others} className={cls} ref="step">
        {children}
      </div>
    );
  }

  _updateItemWidth() {
    const step = this.refs.step,
          num = step.childNodes.length,
          itemWidth = Math.floor(step.offsetWidth / num);

    this.setState({itemWidth});
  }
}

export default Step;