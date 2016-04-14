
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import Tab from './Tab';

class TabGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('activeIndex' in nextProps || this.getSelectIndex(nextProps.children)) {
      this.setState({
        activeIndex: nextProps.activeIndex || this.getSelectIndex(nextProps.children)
      });
    }
  }

  getSelectIndex(children) {
    let selectIndex;
     React.Children.forEach(children, (item, $index) => {
      if (item.props && item.props.selected) {
        selectIndex = $index;
      }
    });
    return selectIndex;
  }

  getTitleItemCls(idx) {
    return idx === this.state.activeIndex
                 ? 'ui-tab-header-item active'
                 : 'ui-tab-header-item';
  }

  getContentItemCls(idx) {
    return idx === this.state.activeIndex
                  ? 'ui-tab-body-item active'
                  : 'ui-tab-body-item';
  }

  render () {
    const props = this.props;
    const {isRadius, theme, className, children, onChange, ...others} = props;

    const cls = classnames({
      'ui-tab'          : true,
      'radius'          : ('radius' in props || isRadius),
      [`theme-${theme}`]: !!theme,
      [className]       : !!className
    });

    let content = React.Children.map(children, (item, $index) => {
      return (
        <Tab {...item.props} selected={!!(this.state.activeIndex === $index)}>
          {item.props.children}
        </Tab>
      );
    });

    let items = React.Children.map(children, (item, $index) => {
      return (
        <li key={$index} className={this.getTitleItemCls($index)} onClick={() => {
          this.setState(
            { activeIndex: $index },
            onChange($index)
          );
        }}>{item.props.title}</li>
      );
    });

    return (
      <div {...others} className={cls}>
        <ul className="ui-tab-header">
          {items}
        </ul>
        <div className="ui-tab-body">
          {content}
        </div>
      </div>
    );
  }
}

TabGroup.propTypes = {
  theme     : PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  isRadius  : PropTypes.bool,
  onChange  : PropTypes.func,
};

TabGroup.defaultProps = {
  theme     : 'default',
  isRadius  : false,
  onChange  : () => {},
};

export default TabGroup;