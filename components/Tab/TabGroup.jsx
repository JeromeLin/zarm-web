
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

class TabGroup extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const props = this.props;
    const {isRadius, theme, className, children, ...others} = props;

    const cls = classnames({
      'ui-tab' : true,
      'radius' : ('radius' in props || isRadius),
      [`theme-${theme}`]: !!theme,
      [className] : !!className
    });

    return (<div {...others} className={cls}>
      <ul className="ui-tab-hd">
        {
          children.map(item => <li className={'isActive' in item.props ? 'active' : ''}>{item.props.title}</li>)
        }
      </ul>
      <div className="ui-tab-bd">
        {children}
      </div>
    </div>);
  }
}

TabGroup.propTypes = {
  theme     : PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  isRadius  : PropTypes.bool,
  activeKey : PropTypes.number
};

TabGroup.defaultProps = {
  theme     : 'default',
  isRadius  : false,
  activeKey : 0
};

export default TabGroup;