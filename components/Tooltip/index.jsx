
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

class Tooltip extends Component {
  render () {
    const props = this.props;
    const {title, direction, className, children, ...others} = props;

    const cls = classnames({
      'ui-tooltip' : true,
      [`ui-tooltip-${direction}`] : !!direction,
      [className]: !!className
    });
    return (<div {...others} className={cls}>
      <div className="ui-tooltip-inner">{title}</div>
      {children}
    </div>);
  }
}

Tooltip.propTypes = {
  direction   : PropTypes.oneOf(['top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom'])
};

Tooltip.defaultProps = {
  direction   : 'bottom'
};

export default Tooltip;