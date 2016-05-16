
import React, { Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';
import Progress from '../Progress';

class Upload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fileNumber: 0,
      uploading : false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('startUpload' in nextProps) {
      this.setState({
        startUpload: !!nextProps.startUpload
      }, () => {
        this.state.startUpload && this.onUploadClick();
      });
    }
  }

  render () { 
    const props = this.props;
    const { multiple, fileExt, className, ...others } = props;

    const cls = classnames({
      'ui-upload': true,
      [className]: !!className,
    });

    const children = React.Children.map(props.children, (element, index) => {
      if (index > 0) {
        return cloneElement(element, {
          isLoading: 'loading' in element.props || element.props.isLoading || this.state.uploading,
          isDisabled: 'disabled' in element.props || element.props.isDisabled || this.state.uploading,
        });
      } else {
        return cloneElement(element, {
          isLoading: 'loading' in element.props || element.props.isLoading || this.state.uploading,
          isDisabled: 'disabled' in element.props || element.props.isDisabled || this.state.uploading,
          onClick: () => {
            this.refs.upload.click();
          }
        });
      }
    });

    return (
      <div {...others} className={cls}>
        <input type="file" style={{display: 'none'}} multiple={multiple} accept={fileExt} ref="upload" onChange={(e) => this.onSelect(e)} />
        {children}
      </div>
    );
  }

  // 选择附件
  onSelect(e) {
    const files = this.refs.upload.files;
    const { autoUpload, onSelect } = this.props;

    if (files.length == 0 || onSelect(files) === false) {
      return;
    }

    // 自动上传处理
    autoUpload && this.onUploadClick();
  }

  // 点击上传按钮
  onUploadClick() {
    let files = this.refs.upload.files;

    if (files.length == 0 || this.state.uploading) {
      return;
    }

    this.setState({
      uploading : true,
      fileNumber: files.length
    });

    for (var i = 0; i < files.length; i++) {
      this.onUpload(files[i])
    }
  }

  // 上传附件
  onUpload(file) {
    const { url, data, onProgress, onComplete, onError } = this.props;

    let fd = new FormData(),
        xhr = new XMLHttpRequest(),
        loaded,
        total,
        percent;

    fd.append('files', file);
    Object.keys(data).forEach((key, index) => {
      fd.append(key, data[key]);
    })

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          onComplete(file, JSON.parse(xhr.responseText));

          let fileNumber = this.state.fileNumber,
              uploading = false;

          fileNumber--;

          if (fileNumber == 0) {
            this.setState({fileNumber, uploading});
            this.refs.upload.value = '';
          } else {
            this.setState({fileNumber});
          }
        } else {
          onError();
        }
      }
    }

    //侦查当前附件上传情况
    // xhr.upload.onprogress = e => {
    //   loaded = e.loaded;
    //   total = e.total;
    //   percent = Math.floor(100 * loaded / total); //已经上传的百分比
    //   onProgress(percent);
    // };

    xhr.open('post', url);
    xhr.send(fd);
  }
}

Upload.propTypes = {
  fileDesc   : PropTypes.string,
  startUpload: PropTypes.bool,
  autoUpload : PropTypes.bool,
  isRadius   : PropTypes.bool,
  url        : PropTypes.string,
  onSelect   : PropTypes.func,
  onProgress : PropTypes.func,
  onComplete : PropTypes.func,
  onError    : PropTypes.func,
};

Upload.defaultProps = {
  fileDesc   : '',
  startUpload: false,
  autoUpload : true,
  isRadius   : false,
  url        : '',
  onSelect   : () => {},
  onProgress : () => {},
  onComplete : () => {},
  onError    : () => {},
};

export default Upload;