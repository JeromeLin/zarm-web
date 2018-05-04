import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Tab from './Tab';

class TabGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:
        props.value ||
        props.defaultValue ||
        this.getSelectIndex(props.children) ||
        0
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps || this.getSelectIndex(nextProps.children)) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  // eslint-disable-next-line
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
    return idx === this.state.value
      ? 'ui-tab-header-item active'
      : 'ui-tab-header-item';
  }

  getContentItemCls(idx) {
    return idx === this.state.value
      ? 'ui-tab-body-item active'
      : 'ui-tab-body-item';
  }

  render() {
    const { props } = this;
    const {
      isRadius, theme, className, children, onChange, style
    } = props;

    const cls = classnames({
      'ui-tab': true,
      radius: 'radius' in props || isRadius,
      [`theme-${theme}`]: !!theme,
      [className]: !!className
    });

    // eslint-disable-next-line
    const items = React.Children.map(children, (item, $index) => {
      return (
        <li
          key={$index}
          className={this.getTitleItemCls($index)}
          onClick={() => {
            this.setState({ value: $index }, onChange($index));
          }}
        >
          {item.props.title}
        </li>
      );
    });

    // eslint-disable-next-line
    const content = React.Children.map(children, (item, $index) => {
      return (
        <Tab {...item.props} selected={!!(this.state.value === $index)}>
          {item.props.children}
        </Tab>
      );
    });

    return (
      <div className={cls} style={style}>
        <ul className="ui-tab-header">{items}</ul>
        <div className="ui-tab-body">{content}</div>
      </div>
    );
  }
}

TabGroup.propTypes = {
  theme: PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  isRadius: PropTypes.bool,
  onChange: PropTypes.func
};

TabGroup.defaultProps = {
  theme: 'default',
  isRadius: false,
  onChange: () => {}
};

export default TabGroup;
