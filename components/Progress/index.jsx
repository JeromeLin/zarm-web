
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Progress extends Component {

  render() {
    const props = this.props;
    const { isRadius, isRound, percent, theme, size, className, ...others } = this.props;

    const cls = classnames({
      'ui-progress'  : true,
      'radius'          : ('radius' in props || isRadius),
      'round'           : ('round' in props || isRound),   
      [`theme-${theme}`]: !!theme,
      [`size-${size}`]  : !!size,
      [className]       : !!className,
    });

    return (
      <div className={cls} {...others}>
        <div className="ui-progress-line-outer">
          <div className="ui-progress-line-inner">
            <div className="ui-progress-bg" style={{width: percent + '%'}}></div>
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
  theme     : PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  size      : PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
  isBlock   : PropTypes.bool,
  isRadius  : PropTypes.bool,
  isRound   : PropTypes.bool,
  className : PropTypes.string,
};

Progress.defaultProps = {
  theme     : 'default',
  size      : null,
  isBlock   : false,
  isRadius  : false,
  isRound   : false,
  className : null,
};

export default Progress;