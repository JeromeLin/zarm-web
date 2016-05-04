
import React, { Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';
import Progress from '../Progress';

class Upload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uploading: false
    }
  }

  render () { 
    const props = this.props;
    const { multiple, fileExt, className } = this.props;

    const cls = classnames({
      'ui-upload': true,
      [className]: !!className,
    });

    const children = React.Children.map(props.children, (element, index) => {
      return cloneElement(element, {
        isLoading: 'loading' in element.props || element.props.isLoading || this.state.uploading,
        isDisabled: 'disabled' in element.props || element.props.isDisabled || this.state.uploading,
        onClick: () => {
          this.refs.upload.click();
        }
      });
    });

    return (
      <div className={cls}>
        <input type="file" style={{display: 'none'}} multiple={multiple} accept={fileExt} ref="upload" onChange={(e) => this.onUpload(e)} />
        {children}
        {this.renderList()}
      </div>
    );
  }

  // 渲染列表
  renderList() {
    const props = this.props.list;
    if (!props) return;

    const { className, type, dataSource, isRadius, onDelete } = props;
    const listCls = classnames({
      'ui-upload-list'          : true,
      'ui-upload-list-inline'   : ('inline' in props),
      [`ui-upload-list-${type}`]: ('type' in props),
      [className]               : !!className,
    });

    const itemCls = classnames({
      'ui-upload-list-item': true,
      'radius'             : ('radius' in props || isRadius),
    });

    return (
      <div className={listCls}>
      {
        dataSource.map((item, index) => {
          const progress = item.percent
                         ? <Progress className="ui-upload-list-item-progress" percent={item.percent} theme="info" size="sm" />
                         : null;

          return (
            <div key={`upload-list-item-${index}`} className={itemCls}>
              <a className="ui-upload-list-item-thumbnail" href={item.url || item.thumbUrl} target="_blank">
                <img src={item.thumbUrl || item.url} alt={item.name} />
              </a>
              <span className="ui-upload-list-item-name">
                <a href={item.url || item.thumbUrl} title={item.name} target="_blank">{item.name}</a>
              </span>
              {
                // <div className="ui-upload-list-item-size">{item.size}</div>
              }
              <Icon type="close" title="删除" className="ui-upload-list-item-icon" onClick={() => onDelete(item)} />
              {progress}
            </div>
          );

        })
      }
      </div>
    );
  }

  // 上传
  onUpload(e) {
    const { url, data, onSelect, onProgress, onComplete, onError } = this.props;
    let fd = new FormData(),
        files = this.refs.upload.files[0],
        xhr = new XMLHttpRequest(),
        loaded,
        total,
        percent;

    if (!files || onSelect(files) === false) {
      return false;
    }
    
    fd.append('files', files);
    Object.keys(data).forEach((key, index) => {
      fd.append(key, data[key]);
    })

    this.setState({
      uploading: true
    });

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          onComplete(files, JSON.parse(xhr.responseText));
          this.setState({
            uploading: false
          });
        } else {
          onError();
        }
      }
    }

    //侦查当前附件上传情况
    xhr.upload.onprogress = e => {
      loaded = e.loaded;
      total = e.total;
      percent = Math.floor(100 * loaded / total); //已经上传的百分比
      onProgress(percent);
    };

    xhr.open('post', url);
    xhr.send(fd);
  }
}

Upload.propTypes = {
  fileDesc  : PropTypes.string,
  isRadius  : PropTypes.bool,
  url       : PropTypes.string,
  onSelect  : PropTypes.func,
  onProgress: PropTypes.func,
  onComplete: PropTypes.func,
  onError   : PropTypes.func,
};

Upload.defaultProps = {
  fileDesc  : '',
  isRadius  : false,
  url       : '',
  onSelect  : () => {},
  onProgress: () => {},
  onComplete: () => {},
  onError   : () => {},
};

export default Upload;