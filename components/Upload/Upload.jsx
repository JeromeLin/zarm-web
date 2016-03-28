
import React, { Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';

class Upload extends Component {

  render () { 
    const props = this.props;
    const { multiple, className, ...others } = this.props;

    const cls = classnames({
      'ui-upload'       : true,
      [className]     : !!className,
    });

    const children = React.Children.map(props.children, (element, index) => {
      return cloneElement(element, {
        onClick: () => {
          this.refs.upload.click();
        }
      });
    });

    return (
      <div {...others} className={cls}>
        <input type="file" style={{display: 'none'}} multiple={multiple} ref="upload" onChange={(e) => this.onFileChange(e)} />
        {children}
      </div>
    );
  }

  onFileChange(e) {
    const files = this.refs.upload.files;
    this.props.onChange(files);
  }
}

Upload.propTypes = {
  onChange: PropTypes.func,
};

Upload.defaultProps = {
  onChange: function () {},
};

export default Upload;