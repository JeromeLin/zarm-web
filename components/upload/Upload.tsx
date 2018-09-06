import React, { Component, cloneElement, ReactElement } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

class Upload extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-upload',
    fileName: 'files',
    startUpload: false,
    autoUpload: true,
    isRadius: false,
    data: {},
    url: '',
    onSelect: () => {},
    onProgress: () => {},
    onComplete: () => {},
    onError: () => {},
  };

  static List;
  private upload;

  constructor(props) {
    super(props);
    this.state = {
      fileNumber: 0,
      uploading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('startUpload' in nextProps) {
      this.setState(
        {
          startUpload: !!nextProps.startUpload,
        },
        () => {
          if (this.state.startUpload) {
            this.onUploadClick();
          }
        },
      );
    }
  }

  // 选择附件
  onSelect() {
    const { files } = this.upload;
    const { autoUpload, onSelect } = this.props;

    if (files.length === 0 || onSelect(files) === false) {
      return;
    }

    // 自动上传处理
    if (autoUpload) {
      this.onUploadClick();
    }
  }

  // 点击上传按钮
  onUploadClick() {
    const { files } = this.upload;

    if (files.length === 0 || this.state.uploading) {
      return;
    }

    this.setState({
      uploading: true,
      fileNumber: files.length,
    });

    for (let i = 0; i < files.length; i++) {
      this.onUpload(files[i]);
    }
  }

  // 上传附件
  onUpload(file) {
    const {
      url, fileName, data, onComplete, onError,
    } = this.props;
    const URL = /^(http:\/\/|https:\/\/|\/\/)/;
    const { origin } = window.location;

    const fd = new FormData();
    const xhr = new XMLHttpRequest();

    fd.append(fileName, file);
    Object.keys(data).forEach((key) => {
      fd.append(key, data[key]);
    });

    // eslint-disable-next-line
    // tslint:disable-next-line:no-bitwise
    if (URL.test(url) && !~url.indexOf(origin)) {
      return onComplete(file);
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          onComplete(file, JSON.parse(xhr.responseText));

          let { fileNumber } = this.state;
          const uploading = false;

          fileNumber--;

          if (fileNumber === 0) {
            this.setState({ fileNumber, uploading });
            this.upload.value = '';
          } else {
            this.setState({ fileNumber });
          }
        } else {
          this.setState({ uploading: false });
          this.upload.value = '';
          onError();
        }
      }
    };

    // 侦查当前附件上传情况
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

  render() {
    const { props } = this;
    const {
      multiple, fileExt, className, style, prefixCls,
    } = props;

    const cls = classnames({
      [prefixCls!]: true,
      [className!]: !!className,
    });

    const children = React.Children.map(props.children, (element, index) => {
      let extendProps = {};
      if (typeof (element as ReactElement<any>).type !== 'string') {
        // 不是原生dom
        extendProps = {
          isLoading:
            'loading' in (element as ReactElement<any>).props ||
            (element as ReactElement<any>).props.isLoading ||
            this.state.uploading,
          isDisabled:
            'disabled' in (element as ReactElement<any>).props ||
            (element as ReactElement<any>).props.isDisabled ||
            this.state.uploading,
        };
      }
      if (index > 0) {
        return cloneElement((element as ReactElement<any>), {
          ...extendProps,
        });
      }
      return cloneElement((element as ReactElement<any>), {
        ...extendProps,
        onClick: () => {
          this.upload.click();
        },
      });
    });

    return (
      <div className={cls} style={style}>
        <input
          type="file"
          style={{ display: 'none' }}
          multiple={multiple}
          accept={fileExt}
          ref={(upload) => { this.upload = upload; }}
          onChange={_ => this.onSelect()}
        />
        {children}
      </div>
    );
  }
}

export default Upload;
