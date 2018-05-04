import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileNumber: 0,
      uploading: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('startUpload' in nextProps) {
      this.setState(
        {
          startUpload: !!nextProps.startUpload
        },
        () => {
          this.state.startUpload && this.onUploadClick();
        }
      );
    }
  }

  render() {
    const { props } = this;
    const {
      multiple, fileExt, className, style
    } = props;

    const cls = classnames({
      'ui-upload': true,
      [className]: !!className
    });

    const children = React.Children.map(props.children, (element, index) => {
      let extendProps = {};
      if (typeof element.type !== 'string') {
        // 不是原生dom
        extendProps = {
          isLoading:
            'loading' in element.props ||
            element.props.isLoading ||
            this.state.uploading,
          isDisabled:
            'disabled' in element.props ||
            element.props.isDisabled ||
            this.state.uploading
        };
      }
      if (index > 0) {
        return cloneElement(element, {
          ...extendProps
        });
      } else {
        return cloneElement(element, {
          ...extendProps,
          onClick: () => {
            this.upload.click();
          }
        });
      }
    });

    return (
      <div className={cls} style={style}>
        <input
          type="file"
          style={{ display: 'none' }}
          multiple={multiple}
          accept={fileExt}
          ref={(upload) => { this.upload = upload; }}
          onChange={e => this.onSelect(e)}
        />
        {children}
      </div>
    );
  }

  // 选择附件
  onSelect(e) {
    const { files } = this.upload;
    const { autoUpload, onSelect } = this.props;

    if (files.length === 0 || onSelect(files) === false) {
      return;
    }

    // 自动上传处理
    autoUpload && this.onUploadClick();
  }

  // 点击上传按钮
  onUploadClick() {
    let { files } = this.upload;

    if (files.length === 0 || this.state.uploading) {
      return;
    }

    this.setState({
      uploading: true,
      fileNumber: files.length
    });

    for (let i = 0; i < files.length; i++) {
      this.onUpload(files[i]);
    }
  }

  // 上传附件
  onUpload(file) {
    const {
      url, fileName, data, onComplete, onError
    } = this.props;
    const URL = /^(http:\/\/|https:\/\/|\/\/)/;
    const { origin } = window.location;

    let fd = new FormData();
    let xhr = new XMLHttpRequest();

    fd.append(fileName, file);
    Object.keys(data).forEach((key, index) => {
      fd.append(key, data[key]);
    });

    // eslint-disable-next-line
    if (URL.test(url) && !~url.indexOf(origin)) {
      return onComplete(file);
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          onComplete(file, JSON.parse(xhr.responseText));

          let { fileNumber } = this.state;
          let uploading = false;

          fileNumber--;

          if (fileNumber === 0) {
            this.setState({ fileNumber, uploading });
            this.upload.value = '';
          } else {
            this.setState({ fileNumber });
          }
        } else {
          this.setState({ uploading: false });
          onError();
        }
      }
    };

    //侦查当前附件上传情况
    // xhr.upload.onprogress = e => {
    //   loaded = e.loaded;
    //   total = e.total;
    //   percent = Math.floor(100 * loaded / total); //已经上传的百分比
    //   onProgress(percent);
    // };

    xhr.open('post', url);
    xhr.send(fd);
    return true;
  }
}

Upload.propTypes = {
  fileName: PropTypes.string,
  startUpload: PropTypes.bool,
  autoUpload: PropTypes.bool,
  isRadius: PropTypes.bool,
  url: PropTypes.string,
  onSelect: PropTypes.func,
  onProgress: PropTypes.func,
  onComplete: PropTypes.func,
  onError: PropTypes.func
};

Upload.defaultProps = {
  fileName: 'files',
  startUpload: false,
  autoUpload: true,
  isRadius: false,
  url: '',
  onSelect: () => {},
  onProgress: () => {},
  onComplete: () => {},
  onError: () => {}
};

export default Upload;
