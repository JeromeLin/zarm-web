
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Progress extends Component {

  render() {
    const props = this.props;
    const { isRadius, isRound, percent, theme, size, className, ...others } = this.props;

    const classes = classnames({
      'ui-progress'      : true,
      'radius'           : ('radius' in props || isRadius),
      'round'            : ('round' in props || isRound),   
      [`theme-${theme}`] : !!theme,
      [`size-${size}`]   : !!size,
      [className]        : !!className,
    });

    return (
      <div className="ui-progress-line-wrap clearfix status-normal" {...others}>
        <div className="ui-progress-line-outer">
          <div className="ui-progress-line-inner">
            <div className={classes} style={{width: percent + '%'}}>
            </div>
          </div>
        </div>
        {this.textRender(percent)}
      </div>
    );
  }

  textRender(percent) {
    let render = ('render' in this.props) 
               ? this.props.render(percent)
               : <span className="ui-progress-line-text">{percent}%</span>;
    return render;
  }
}

Progress.propTypes = {
  type      : PropTypes.string,
  theme     : PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  size      : PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
  isBlock   : PropTypes.bool,
  isRadius  : PropTypes.bool,
  isRound   : PropTypes.bool,
  isCircle  : PropTypes.bool,
  isActive  : PropTypes.bool,
  isFocus   : PropTypes.bool,
  isDisabled: PropTypes.bool,
  className : PropTypes.string,
};

Progress.defaultProps = {
  type      : 'button',
  theme     : 'default',
  size      : null,
  isBlock   : false,
  isRadius  : false,
  isRound   : false,
  isCircle  : false,
  isActive  : false,
  isFocus   : false,
  isDisabled: false,
  className : null,
};

export default Progress;