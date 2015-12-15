
import React, { Component, PropTypes } from 'react';

class Cell extends Component {

  render () {
    const { title, description, ...others } = this.props;

    return (
      <a className="ui-cell" href="javascript:;" {...others}>
        <div className="title">{title}</div>
        <div className="description">{description}</div>
      </a>
    );
  }

}

Cell.propTypes = {
  title       : PropTypes.string,
  description : PropTypes.string,
};

Cell.defaultProps = {
  title : '标题',
};

export default Cell;

