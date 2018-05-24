import React, { Component } from 'react';
import classnames from 'classnames';

class PanelTitle extends Component {
  render() {
    const { className, children, style } = this.props;

    const cls = classnames({
      'ui-panel-title': true,
      [className]: !!className
    });

    return (
      <div className={cls} style={style}>
        {children}
      </div>
    );
  }
}

export default PanelTitle;
