import React, { Component, Children, ReactElement } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

const defaultPrefixCls = 'ui-layout';
class Layout extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: defaultPrefixCls,
    hasSider: false,
  };

  static Header: any;
  static Sider: any;
  static Footer: any;
  static Content: any;

  render() {
    const { prefixCls, className, children, style } = this.props;

    let hasSider = this.props.hasSider;
    if (!hasSider && prefixCls === defaultPrefixCls) {
      Children.forEach(children, (child) => {
        if ('collapsible' in (child as ReactElement<any>).props) {
          hasSider = true;
        }
      });
    }
    const cls = classnames(prefixCls, {
      [className!]: !!className,
      [`${prefixCls}-has-sider`]: hasSider,
    });

    return (
      <div className={cls} style={style}>
        {children}
      </div>
    );
  }
}

const genSubComponent = (props: PropsType) => {
  return class SubComponent extends Component<PropsType, any> {
    render() {
      const { prefixCls } = props;
      return <Layout prefixCls={prefixCls} {...this.props} />;
    }
  };
};

const Header = genSubComponent({ prefixCls: 'ui-layout-header' });
const Content = genSubComponent({ prefixCls: 'ui-layout-content' });
const Footer = genSubComponent({ prefixCls: 'ui-layout-footer' });

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;

export default Layout;
