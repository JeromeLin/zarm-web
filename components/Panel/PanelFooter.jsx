import React, { Component } from 'react';
import classnames from 'classnames';

class PanelFooter extends Component {
  render() {
    const { className, children, style } = this.props;

    const cls = classnames({
      'ui-panel-footer': true,
      [className]: !!className,
    });

    return (
      <div className={cls} style={style}>
        {children}
      </div>
    );
  }
}

export default PanelFooter;
