
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Progress extends Component {


    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps);
    //     if ('percent' in nextProps) {
    //         this.setState({
    //             percent  : nextProps.percent
    //         });
    //     }
    // }

    render() {
        const props = this.props;
        const { isRadius, isRound, percent, theme, size, className, ...others } = this.props;

        const classes = classnames({
          'radius'           : ('radius' in props || isRadius),
          'round'            : ('round' in props || isRound),   
          [`theme-${theme}`] : !!theme,
          [`size-${size}`]   : !!size,
          [className]        : !!className,
          'ui-progress ': true

        });

        if (this.props.render) {
            return (<div className="ant-progress-line-wrap clearfix status-normal" {...others}>
                <div className="ant-progress-line-outer">
                    <div className="ant-progress-line-inner">
                        <div className={classes} style={{width: percent + '%'}}>
                        </div>
                    </div>
                </div>
                {this.props.render(percent)}
            </div>)
        } else {
            return (<div className="ant-progress-line-wrap clearfix status-normal" {...others}>
                <div className="ant-progress-line-outer">
                    <div className="ant-progress-line-inner">
                        <div className={classes} style={{width: percent + '%'}}>
                        </div>
                    </div>
                </div>
                <span className="ant-progress-line-text">{percent}%</span>
            </div>)
        }
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