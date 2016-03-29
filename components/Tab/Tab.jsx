import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import Loading from '../Loading';

class Tab extends Component{
  render () {
    const props = this.props;
    const {isActive, className, children, ...others} = props;
    const cls = classnames({
      'ui-tab-active' : ('active' in props || isActive),
      [className]: !!className
    });
    return (<div {...others} className={cls}>
      {children}
    </div>);
  }
}


Tab.propTypes = {

};

Tab.defaultProps ={

};

export default Tab;