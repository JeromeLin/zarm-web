
import React, {Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Tooltip extends Component {
  render () {
    const props = this.props;
    const {title, direction, className, children, tipStyle, style, ...others} = props;

    const cls = classnames({
      'ui-tooltip' : true,
      [`ui-tooltip-${direction}`] : !!direction,
      [className]: !!className
    });
    return (
      <div className={cls} style={style}>
        <div {...others} className="ui-tooltip-inner" style={tipStyle}>{title}</div>
        {children}
      </div>
    );
  }
}

Tooltip.propTypes = {
  direction   : PropTypes.oneOf(['top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom'])
};

Tooltip.defaultProps = {
  direction   : 'bottom'
};

export default Tooltip;