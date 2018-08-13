import React, { Component } from 'react';
import classnames from 'classnames';
import Icon from '../icon';
import Progress from '../progress';
import { ListProps } from './PropsType';

class UploadList extends Component<ListProps, any> {
  static defaultProps = {
    prefixCls: 'ui-upload',
    type: 'text',
    isRadius: false,
    dataSource: [],
    onRemove: () => {},
  };

  render() {
    const { props } = this;
    const {
      className, type, dataSource, isRadius, onDelete, prefixCls,
    } = props;

    const listCls = classnames({
      [`${prefixCls}-list`]: true,
      [`${prefixCls}-list-inline`]: 'inline' in props,
      [`${prefixCls}-list-${type}`]: 'type' in props,
      [className!]: !!className,
    });

    const itemCls = classnames({
      [`${prefixCls}-list-item`]: true,
      radius: 'radius' in props || isRadius,
    });

    return (
      <div className={prefixCls}>
        <div className={listCls}>
          {// tslint:disable-next-line:jsx-no-multiline-js
            dataSource.map((item, index) => {
            const progress = item.percent ? (
              <Progress
                className={`${prefixCls}-list-item-progress`}
                percent={item.percent}
                theme="info"
                size="sm"
              />
            ) : null;

            return (
              // eslint-disable-next-line
              <div key={`upload-list-item-${index}`} className={itemCls}>
                <a
                  className={`${prefixCls}-list-item-thumbnail`}
                  href={item.url || item.thumbUrl}
                  target="_blank"
                >
                  <img src={item.thumbUrl || item.url} alt={item.name} />
                </a>
                <span className={`${prefixCls}-list-item-name`}>
                  <a
                    href={item.url || item.thumbUrl}
                    title={item.name}
                    target="_blank"
                  >
                    {item.name}
                  </a>
                </span>
                <Icon
                  type="wrong"
                  // title="删除"
                  className={`${prefixCls}-list-item-icon`}
                  onClick={() => onDelete(item)}
                />
                {progress}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default UploadList;
