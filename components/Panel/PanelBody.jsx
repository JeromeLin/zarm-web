import React, { Component } from 'react';
import classnames from 'classnames';

class PanelBody extends Component {
  render() {
    const { className, children, style } = this.props;

    const cls = classnames({
      'ui-panel-body': true,
      [className]: !!className,
    });

    return (
      <div className={cls} style={style}>
        {children}
      </div>
    );
  }
}

export default PanelBody;
