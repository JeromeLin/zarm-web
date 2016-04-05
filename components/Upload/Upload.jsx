
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
    const { url, onSelect, onProgress, onComplete } = this.props;
    let fd = new FormData(),
        file = this.refs.upload.files[0],
        xhr = new XMLHttpRequest(),
        loaded,
        total,
        percent;

    if (onSelect(file) === false) {
      return false;
    }
     
    fd.append("files", file);

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        onComplete(xhr.responseText);
      }
    }

    //侦查当前附件上传情况
    xhr.upload.onprogress = (e) => {
      loaded = e.loaded;
      total = e.total;
      percent = Math.floor(100 * loaded / total); //已经上传的百分比
      onProgress(percent);
    };

    xhr.open("post", url);
    xhr.send(fd);
  }
}

Upload.propTypes = {
  url       : PropTypes.string,
  onSelect  : PropTypes.func,
  onProgress: PropTypes.func,
  onComplete: PropTypes.func,
};

Upload.defaultProps = {
  url       : '',
  onSelect  : () => {},
  onProgress: () => {},
  onComplete: () => {},
};

export default Upload;