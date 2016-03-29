
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

class TabGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0
    }
  }

  getTitleItemCls(idx) {
    return idx === this.state.activeIndex ? 'ui-tab-hd-item active' : 'ui-tab-hd-item';
  }

  getContentItemCls(idx) {
    return idx === this.state.activeIndex ? 'ui-tab-bd-item active' : 'ui-tab-bd-item';
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
          children.map((item, idx) => <li className={this.getTitleItemCls(idx)} onClick={()=>{this.setState({activeIndex:idx})}} key={idx}>{item.props.title}</li>)
        }
      </ul>
      <div className="ui-tab-bd">
        {children.map((item, idx) => {
          return (<div className={this.getContentItemCls(idx)} key={idx}>
              {item}
            </div>)
        })}
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