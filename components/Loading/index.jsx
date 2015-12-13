
import React, { Component, PropTypes } from 'react';
import Mask from '../Mask';

class Loading extends Component {

  render () {
    const { width, height, message } = this.props;
    const bodyStyle = {
      'position'   : 'absolute',
      'left'       : '50%',
      'top'        : '50%',
      'marginLeft' : - width / 2,
      'marginTop'  : - height / 2,
      'width'      : width,
      'height'     : height,
    };

    return (
      <div className="ui-loading">
        <div className="ui-loading-body" style={bodyStyle}>
          <br />
          {message}
        </div>
        <Mask type="light" />
      </div>
    );
  }

}

Loading.propTypes = {
  message : PropTypes.string,
  width   : PropTypes.number,
  height  : PropTypes.number,
};

Loading.defaultProps = {
  message : '加载中',
  width   : 80,
  height  : 80,
};

export default Loading;

