import React, { Component } from 'react';
import classnames from 'classnames';
import Select from '../select';
import Input from '../input';
import Icon from '../icon';
import PropsType from './PropsType';
import format from '../locale/format';
import LocaleReceiver from '../locale/LocaleReceiver';

const noop = () => { };
class Pagination extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-pagination',
    defaultValue: 1,
    isBordered: false,
    isRadius: false,
    total: 0,
    pageSize: 10,
    pageSizeSource: [10, 20, 30, 40, 50],
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
      addonBefore,
      addonAfter,
      pageSize,
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
    const { prefixCls, locale } = this.props;
    return (
      <li
        key={1}
        title={locale!.first_page}
        className={`${prefixCls}-item`}
        onClick={() => this._onPagerClick(1)}
      >
        1
      </li>
    );
  }

  lastPager = (pageCount) => {
    const { prefixCls, locale } = this.props;
    return (
      <li
        key={pageCount}
        title={locale!.last_page}
        className={`${prefixCls}-item`}
        onClick={() => this._onPagerClick(pageCount)}
      >
        {pageCount}
      </li>
    );
  }

  prevPager = (current) => {
    const { prefixCls, locale } = this.props;
    return (
      <li
        key="prev"
        title={locale!.prev_page}
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
    const { prefixCls, locale } = this.props;
    return (
      <li
        key="next"
        title={locale!.next_page}
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
    const { prefixCls, locale } = this.props;
    return (
      <li
        key="jump-prev"
        title={locale!.prev_5_page}
        className={`${prefixCls}-item ${prefixCls}-item-jump-prev`}
        onClick={() => this._onPagerClick(current - 5)}
      />
    );
  }

  jumpNext = (current) => {
    const { prefixCls, locale } = this.props;
    return (
      <li
        key="jump-next"
        title={locale!.next_5_page}
        className={`${prefixCls}-item ${prefixCls}-item-jump-next`}
        onClick={() => this._onPagerClick(current + 5)}
      />
    );
  }

  _onPagerClick(value) {
    const { onPageChange, onChange, pageSize } = this.props;

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
    const { total, prefixCls, locale, pageSize } = this.props;

    const { value } = this.state;
    return (
      <div className={`${prefixCls}-total`}>
        {format(locale!.total, {
          total,
        })}
        {format(locale!.current, {
          current: `${value} / ${Math.ceil(total / pageSize)}`,
        })}
      </div>
    );
  }

  renderPageSizeSelector = () => {
    const { radius, prefixCls, onPageSizeChange, onChange, locale, pageSize } = this.props;
    let { pageSizeSource } = this.props;
    let defaultPageSize = pageSizeSource && pageSizeSource.length > 0 && pageSizeSource[0];

    if (!pageSizeSource) {
      pageSizeSource = [10, 20, 30, 40, 50];
      defaultPageSize = 10;
    }
    return (
      <div className={`${prefixCls}-size`}>
        <Select
          isRadius={radius}
          defaultValue={defaultPageSize}
          size="sm"
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
          {
            pageSizeSource.map((value) => {
              return (
                <Select.Option value={value} key={value}>{format(locale!.pagesize, { value })}</Select.Option>
              );
            })
          }
        </Select>
      </div>
    );
  }

  renderJumper = () => {
    const { radius, total, prefixCls, locale, pageSize } = this.props;

    return (
      <div className={`${prefixCls}-jumper`}>
        {locale!.goto}
        <Input
          isRadius={radius}
          type="text"
          style={{ width: 50, textAlign: 'center', marginLeft: 5, marginRight: 5 }}
          size="sm"
          defaultValue=""
          // tslint:disable-next-line:jsx-no-multiline-js
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            let { value } = e.target as HTMLInputElement;
            if (e.keyCode === 13) {
              let sValue = parseInt(value, 10);
              // eslint-disable-next-line
              if (!sValue || isNaN(sValue)) { return; }

              if (sValue < 1) { sValue = 1; }
              const pageCount = Math.ceil(total / pageSize);
              if (sValue > pageCount) { sValue = pageCount; }

              this._onPagerClick(sValue);
            }
          }}
        />
        {locale!.pageClassifier}
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

export default LocaleReceiver(Pagination, 'Pagination');
