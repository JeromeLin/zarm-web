
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';
import Progress from '../Progress';

class UploadList extends Component {

  render() {
    const props = this.props;
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
      <div className="ui-upload">
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
      </div>
    );
  }
}

UploadList.propTypes = {
  type      : PropTypes.oneOf(['text', 'picture']),
  isRadius  : PropTypes.bool,
  dataSource: PropTypes.array,
  onRemove  : PropTypes.func,
};

UploadList.defaultProps = {
  type      : 'text',
  isRadius  : false,
  dataSource: [],
  onRemove  : () => {},
};

export default UploadList;