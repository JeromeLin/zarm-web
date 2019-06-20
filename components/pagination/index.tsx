import React, { Component } from 'react';
import classnames from 'classnames';
import Select from '../select';
import Input from '../input';
import Icon from '../icon';
import PropsType from './PropsType';
import format from '../locale/format';
import LocaleReceiver from '../locale/LocaleReceiver';

const inputStyle: React.CSSProperties = {
  width: 50,
  textAlign: 'center',
  marginLeft: 5,
  marginRight: 5,
};
const noop = () => {};
class Pagination extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'za-pagination',
    defaultValue: 1,
    isBordered: false,
    isRadius: false,
    total: 0,
    size: 'md',
    simple: false,
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
    const value = props.value || props.defaultValue;
    this.state = {
      // value: props.value || props.defaultValue,
      value,
      currentInputValue: value,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  /**
   * @description 简洁分页
   */
  simpleRender = () => {
    const { total, pageSize, prefixCls } = this.props;
    const pageCount = Math.ceil(total / pageSize);
    const { value } = this.state;
    return (
      <ul>
        {this.prevPager(value)}
        <li
          className={classnames({
            [`${prefixCls}__item`]: true,
            [`${prefixCls}__item-simple`]: true,
          })}
        >
          {this.simpleItem()}
          <span>/</span>
          {pageCount}
        </li>
        {this.nextPager(value, pageCount)}
      </ul>
    );
  };

  /**
   * @description 获取分页列表
   */
  getPagerList = () => {
    const { total, addonBefore, addonAfter, pageSize } = this.props;

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
  };

  firstPager = () => {
    const { prefixCls, locale } = this.props;
    return (
      <li
        key={1}
        title={locale!.first_page}
        className={`${prefixCls}__item`}
        onClick={() => this._onPagerClick(1)}
      >
        1
      </li>
    );
  };

  lastPager = (pageCount: any) => {
    const { prefixCls, locale } = this.props;
    return (
      <li
        key={pageCount}
        title={locale!.last_page}
        className={`${prefixCls}__item`}
        onClick={() => this._onPagerClick(pageCount)}
      >
        {pageCount}
      </li>
    );
  };

  prevPager = (current: any) => {
    const { prefixCls, locale } = this.props;
    return (
      <li
        key="prev"
        title={locale!.prev_page}
        className={classnames({
          [`${prefixCls}__item`]: true,
          [`${prefixCls}__item--prev`]: true,
          [`${prefixCls}__item--disabled`]: Number(current) === 1,
        })}
        onClick={() => current > 1 && this._onPagerClick(current - 1)}
      >
        <Icon type="arrow-left" />
      </li>
    );
  };

  nextPager = (current, pageCount) => {
    const { prefixCls, locale } = this.props;
    const Scurrent = Number(current);
    const SpageCount = Number(pageCount);
    return (
      <li
        key="next"
        title={locale!.next_page}
        // tslint:disable-next-line:jsx-no-multiline-js
        className={classnames({
          [`${prefixCls}__item`]: true,
          [`${prefixCls}__item--next`]: true,
          [`${prefixCls}__item--disabled`]: Number(current) === pageCount,
        })}
        onClick={() => {
          Scurrent < SpageCount && this._onPagerClick(Scurrent + 1);
        }}
      >
        <Icon type="arrow-right" />
      </li>
    );
  };

  jumpPrev = (current) => {
    const { prefixCls, locale } = this.props;
    return (
      <li
        key="jump-prev"
        title={locale!.prev_5_page}
        className={`${prefixCls}__item ${prefixCls}__item--jump-prev`}
        onClick={() => this._onPagerClick(current - 5)}
      />
    );
  };

  jumpNext = (current) => {
    const { prefixCls, locale } = this.props;
    return (
      <li
        key="jump-next"
        title={locale!.next_5_page}
        className={`${prefixCls}__item ${prefixCls}__item--jump-next`}
        onClick={() => this._onPagerClick(current + 5)}
      />
    );
  };

  renderPager = (i, current) => {
    const { prefixCls } = this.props;
    return (
      <li
        key={i}
        title={i}
        // tslint:disable-next-line:jsx-no-multiline-js
        className={classnames({
          [`${prefixCls}__item`]: true,
          [`${prefixCls}__item--active`]: current === i,
        })}
        onClick={() => this._onPagerClick(i)}
      >
        {i}
      </li>
    );
  };

  renderAddonBefore = (addonBefore) => {
    const { prefixCls } = this.props;
    return (
      <div key="addon-before" className={`${prefixCls}__addon-before`}>
        {addonBefore}
      </div>
    );
  };

  renderAddonAfter = (addonAfter) => {
    const { prefixCls } = this.props;
    return (
      <div key="addon-after" className={`${prefixCls}__addon-after`}>
        {addonAfter}
      </div>
    );
  };

  renderTotal = () => {
    const { total, prefixCls, locale, pageSize } = this.props;

    const { value } = this.state;
    return (
      <div className={`${prefixCls}__total`}>
        {format(locale!.total, {
          total,
        })}
        {format(locale!.current, {
          current: `${value} / ${Math.ceil(total / pageSize)}`,
        })}
      </div>
    );
  };

  renderPageSizeSelector = () => {
    const {
      prefixCls,
      onPageSizeChange,
      onChange,
      locale,
      pageSize,
    } = this.props;
    let { pageSizeSource } = this.props;
    let defaultPageSize = pageSizeSource && pageSizeSource.length > 0 && pageSizeSource[0];

    if (!pageSizeSource) {
      pageSizeSource = [10, 20, 30, 40, 50];
      defaultPageSize = 10;
    }
    return (
      <div className={`${prefixCls}__select`}>
        <Select
          defaultValue={defaultPageSize}
          value={pageSize === 10 ? defaultPageSize : pageSize}
          onChange={({ value }: any) => {
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
          {pageSizeSource.map((value: number) => {
            return (
              <Select.Option value={value} key={value}>
                {format(locale!.pagesize, { value })}
              </Select.Option>
            );
          })}
        </Select>
      </div>
    );
  };

  renderJumper = () => {
    const { currentInputValue } = this.state;
    const { prefixCls, locale } = this.props;

    return (
      <div className={`${prefixCls}__jumper`}>
        {locale!.goto}
        <Input
          shape="radius"
          type="text"
          style={inputStyle}
          value={currentInputValue}
          onChange={this.inputChange}
          onKeyDown={this.inputChange}
        />
        {locale!.pageClassifier}
      </div>
    );
  };

  inputChange = (e: any) => {
    const { total, pageSize } = this.props;
    const target = e.target as HTMLInputElement;
    const inputValue = target.value;
    const { currentInputValue } = this.state;
    let value;

    if (inputValue === '') {
      value = inputValue;
    } else if (Number.isNaN(Number(inputValue))) {
      value = currentInputValue;
    } else {
      value = Number(inputValue);
    }

    if (value !== currentInputValue) {
      this.setState({
        currentInputValue: value,
      });
    }

    if (e.keyCode === 13) {
      if (!value || Number.isNaN(value)) {
        value = 1;
      }
      if (value < 1) {
        value = 1;
      }
      const pageCount = Math.ceil(total / pageSize);
      if (value > pageCount) {
        value = pageCount;
      }
      this._onPagerClick(value);
    }
  };

  simpleItem = () => {
    const { currentInputValue } = this.state;
    return (
      <Input
        shape="radius"
        type="text"
        style={inputStyle}
        value={currentInputValue}
        onChange={this.inputChange}
        onKeyDown={this.inputChange}
      />
    );
  };

  _onPagerClick(value) {
    const { onPageChange, onChange, pageSize } = this.props;

    this.setState({
      value,
      currentInputValue: value,
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

  render() {
    const {
      prefixCls,
      size,
      isBordered,
      className,
      showTotal,
      showJumper,
      showPageSizeSelector,
      style,
      simple,
      shape,
    } = this.props;

    const cls = classnames({
      [prefixCls!]: true,
      [`${prefixCls}--${size}`]: true,
      [`shape-${shape}`]: !!shape,
      [`${prefixCls}--simple`]: simple,
      'is-bordered': 'bordered' in this.props || isBordered,
      'is-radius': true,
      [className!]: !!className,
    });
    const normalShow = <ul>{this.getPagerList()}</ul>;
    const pageShow = simple ? this.simpleRender() : normalShow;
    return (
      <div className={cls} style={style}>
        {showTotal && this.renderTotal()}
        <div className={`${prefixCls}__pagers`}>
          {pageShow}
          {showPageSizeSelector && this.renderPageSizeSelector()}
          {showJumper && this.renderJumper()}
        </div>
      </div>
    );
  }
}

export default LocaleReceiver('Pagination')(Pagination);
