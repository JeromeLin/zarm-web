import React, { Component } from 'react';
import classnames from 'classnames';
import Select from '../Select';
import Input from '../Input';
import Icon from '../Icon';
import PropsType from './PropsType';

const noop = () => {};
class Pagination extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-pagination',
    defaultValue: 1,
    isBordered: false,
    isRadius: false,
    total: 0,
    pageSize: 10,
    showTotal: false,
    showJumper: false,
    showPageSizeSelector: false,
    onPageChange: noop,
    onPageSizeChange: noop,
    onChange: noop,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  getPagerList = () => {
    const {
      total,
      pageSize,
      addonBefore,
      addonAfter,
    } = this.props;

    const pageCount = Math.ceil(total / pageSize);
    const pagerList: JSX.Element[] = [];
    let { value } = this.state;
    value = value < 1 ? 1 : value;
    value = value > pageCount ? pageCount : value;

    if (pageCount <= 9) {
      for (let i = 1; i <= pageCount; i++) {
        pagerList.push(this.renderPager(i, value));
      }
    } else {
      let left = Math.max(1, value - 2);
      let right = Math.min(value + 2, pageCount);
      if (value - 1 <= 2) {
        right = 1 + 4;
      }
      if (pageCount - value <= 2) {
        left = pageCount - 4;
      }

      for (let i = left; i <= right; i++) {
        pagerList.push(this.renderPager(i, value));
      }
      if (value - 1 >= 4) {
        pagerList.unshift(this.jumpPrev(value));
      }
      if (pageCount - value >= 4) {
        pagerList.push(this.jumpNext(value));
      }
      if (left !== 1) {
        pagerList.unshift(this.firstPager());
      }
      if (right !== pageCount) {
        pagerList.push(this.lastPager(pageCount));
      }
      pagerList.unshift(this.prevPager(value));
      pagerList.push(this.nextPager(value, pageCount));
    }

    if (addonBefore) {
      pagerList.unshift(this.renderAddonBefore(addonBefore));
    }
    if (addonAfter) {
      pagerList.push(this.renderAddonAfter(addonAfter));
    }

    return pagerList;
  }

  firstPager = () => {
    const { prefixCls } = this.props;
    return (
      <li
        key={1}
        title="第-页"
        className={`${prefixCls}-item`}
        onClick={() => this._onPagerClick(1)}
      >
        1
      </li>
    );
  }

  lastPager = (pageCount) => {
    const { prefixCls } = this.props;
    return (
      <li
        key={pageCount}
        title="最后一页"
        className={`${prefixCls}-item`}
        onClick={() => this._onPagerClick(pageCount)}
      >
        {pageCount}
      </li>
    );
  }

  prevPager = (current) => {
    const { prefixCls } = this.props;
    return (
      <li
        key="prev"
        title="上一页"
        // tslint:disable-next-line:jsx-no-multiline-js
        className={classnames({
          [`${prefixCls}-item`]: true,
          [`${prefixCls}-item-prev`]: true,
          [`${prefixCls}-item-disabled`]: Number(current) === 1,
        })}
        onClick={() => current > 1 && this._onPagerClick(current - 1)}
      >
        <Icon type="arrow-left" />
      </li>
    );
  }

  nextPager = (current, pageCount) => {
    const { prefixCls } = this.props;
    return (
      <li
        key="next"
        title="下一页"
        // tslint:disable-next-line:jsx-no-multiline-js
        className={classnames({
          [`${prefixCls}-item`]: true,
          [`${prefixCls}-item-next`]: true,
          [`${prefixCls}-item-disabled`]: Number(current) === pageCount,
        })}
        onClick={() => current < pageCount && this._onPagerClick(current + 1)}
      >
        <Icon type="arrow-right" />
      </li>
    );
  }

  jumpPrev = (current) => {
    const { prefixCls } = this.props;
    return (
      <li
        key="jump-prev"
        title="向前 5 页"
        className={`${prefixCls}-item ${prefixCls}-item-jump-prev`}
        onClick={() => this._onPagerClick(current - 5)}
      />
    );
  }

  jumpNext = (current) => {
    const { prefixCls } = this.props;
    return (
      <li
        key="jump-next"
        title="向后 5 页"
        className={`${prefixCls}-item ${prefixCls}-item-jump-next`}
        onClick={() => this._onPagerClick(current + 5)}
      />
    );
  }

  _onPagerClick(value) {
    const { pageSize, onPageChange, onChange } = this.props;
    this.setState({
      value,
    });
    if (onPageChange !== noop) {
      onPageChange(value);
      return;
    }
    onChange({
      pageSize,
      currentPage: value,
    });
  }

  renderPager = (i, current) => {
    const { prefixCls } = this.props;
    return (
      <li
        key={i}
        title={i}
        // tslint:disable-next-line:jsx-no-multiline-js
        className={classnames({
          [`${prefixCls}-item`]: true,
          [`${prefixCls}-item-active`]: current === i,
        })}
        onClick={() => this._onPagerClick(i)}
      >
        {i}
      </li>
    );
  }

  renderAddonBefore = (addonBefore) => {
    const { prefixCls } = this.props;
    return (
      <div key="addon-before" className={`${prefixCls}-addon-before`}>
        {addonBefore}
      </div>
    );
  }

  renderAddonAfter = (addonAfter) => {
    const { prefixCls } = this.props;
    return (
      <div key="addon-after" className={`${prefixCls}-addon-after`}>
        {addonAfter}
      </div>
    );
  }

  renderTotal = () => {
    const { total, pageSize, prefixCls } = this.props;
    const { value } = this.state;
    return (
      <div className={`${prefixCls}-total`}>
        共有条 {total} 记录 第 {value} / {Math.ceil(total / pageSize)} 页
      </div>
    );
  }

  renderPageSizeSelector = () => {
    const { radius, prefixCls, pageSize, onPageSizeChange, onChange } = this.props;
    return (
      <div className={`${prefixCls}-size`}>
        <Select
          isRadius={radius}
          size="sm"
          defaultValue={10}
          // tslint:disable-next-line:jsx-no-multiline-js
          onChange={({ value }) => {
            if (value === pageSize) {
              return;
            }
            if (onPageSizeChange !== noop) {
              onPageSizeChange(value);
              return;
            }
            onChange({
              currentPage: 1,
              pageSize: value,
            });
          }}
        >
          <Select.Option value={10}>每页 10 条</Select.Option>
          <Select.Option value={20}>每页 20 条</Select.Option>
          <Select.Option value={30}>每页 30 条</Select.Option>
          <Select.Option value={40}>每页 40 条</Select.Option>
          <Select.Option value={50}>每页 50 条</Select.Option>
        </Select>
      </div>
    );
  }

  renderJumper = () => {
    const { radius, total, pageSize, prefixCls } = this.props;
    return (
      <div className={`${prefixCls}-jumper`}>
        跳至
        <Input
          isRadius={radius}
          style={{ width: 50, marginLeft: 5, marginRight: 5 }}
          size="sm"
          defaultValue=""
          // tslint:disable-next-line:jsx-no-multiline-js
          onKeyDown={(e) => {
            let { value } = e.target;
            if (e.keyCode === 13) {
              value = parseInt(value, 10);
              // eslint-disable-next-line
              if (!value || isNaN(value)) { return; }

              if (value < 1) { value = 1; }
              const pageCount = Math.ceil(total / pageSize);
              if (value > pageCount) { value = pageCount; }

              this._onPagerClick(value);
            }
          }}
        />
        页
      </div>
    );
  }

  render() {
    const { props } = this;
    const {
      prefixCls,
      isBordered,
      isRadius,
      className,
      showTotal,
      showJumper,
      showPageSizeSelector,
      style,
    } = props;

    const cls = classnames({
      [prefixCls!]: true,
      bordered: 'bordered' in props || isBordered,
      radius: 'radius' in props || isRadius,
      [className!]: !!className,
    });

    return (
      <div className={cls} style={style}>
        {showTotal && this.renderTotal()}
        <div className={`${prefixCls}-pagers`}>
          <ul>
            {this.getPagerList()}
          </ul>
          {showPageSizeSelector && this.renderPageSizeSelector()}
          {showJumper && this.renderJumper()}
        </div>
      </div>
    );
  }
}

export default Pagination;
