import React, { Component } from 'react';
import classnames from 'classnames';
import Select from '../select';
import Icon from '../icon';
import PropsType from './PropsType';
import format from '../locale-provider/format';
import LocaleReceiver from '../locale-provider/LocaleReceiver';

const noop = () => {};

class Pagination extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'zw-pagination',
    defaultValue: 1,
    total: 0,
    pageSize: 10,
    pageSizeOptions: [10, 20, 30, 40, 50],
    showTotal: false,
    showQuickJumper: false,
    showPageSizeChanger: false,
    onPageSizeChange: noop,
    onChange: noop,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue,
      currentInputValue: props.value || props.defaultValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  getPageSize = () => {
    const { total, pageSize } = this.props;
    return Math.ceil(total / pageSize);
  };

  getPagerList = () => {
    const pageCount = this.getPageSize();
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

    return pagerList;
  };

  renderSimple = () => {
    const { prefixCls } = this.props;
    const pagerList: JSX.Element[] = [];
    const pageCount = this.getPageSize();
    const { currentInputValue } = this.state;
    let { value } = this.state;
    value = value > pageCount ? pageCount : value;

    pagerList.push(
      <li
        key={pageCount}
        title={`${value}/${pageCount}`}
        className={`${prefixCls}__item ${prefixCls}__pager`}
      >
        <input
          type="text"
          size={3}
          value={currentInputValue}
          onChange={this.handleJumpChange}
          onKeyDown={this.handleJumpKeyDown}
        />
        <span className={`${prefixCls}__options--slash`}>／</span>
        {pageCount}
      </li>,
    );

    pagerList.unshift(this.prevPager(value));
    pagerList.push(this.nextPager(value, pageCount));
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

  lastPager = (pageSize: number) => {
    const { prefixCls, locale } = this.props;
    return (
      <li
        key="lastPager"
        title={locale!.last_page}
        className={`${prefixCls}__item`}
        onClick={() => this._onPagerClick(pageSize)}
      >
        {pageSize}
      </li>
    );
  };

  prevPager = (page: number) => {
    const { prefixCls, locale } = this.props;
    const cls = classnames({
      [`${prefixCls}__item`]: true,
      [`${prefixCls}__prev`]: true,
      [`${prefixCls}__item--disabled`]: Number(page) === 1,
    });

    return (
      <li
        key="prev"
        title={locale!.prev_page}
        className={classnames(cls)}
        onClick={() => page > 1 && this._onPagerClick(page - 1)}
      >
        <Icon type="arrow-left" className={`${prefixCls}__item--icon`} />
      </li>
    );
  };

  nextPager = (page: number, pageSize: number) => {
    const { prefixCls, locale } = this.props;
    const cls = classnames({
      [`${prefixCls}__item`]: true,
      [`${prefixCls}__next`]: true,
      [`${prefixCls}__item--disabled`]: Number(page) === pageSize,
    });

    return (
      <li
        key="next"
        title={locale!.next_page}
        className={cls}
        onClick={() => page < pageSize && this._onPagerClick(page + 1)}
      >
        <Icon type="arrow-right" className={`${prefixCls}__item--icon`} />
      </li>
    );
  };

  jumpPrev = (page: number) => {
    const { prefixCls, locale } = this.props;
    const cls = classnames({
      [`${prefixCls}__item`]: true,
      [`${prefixCls}__item--ellipsis`]: true,
    });

    return (
      <li
        key="jump-prev"
        title={locale!.prev_5_page}
        className={cls}
        onClick={() => this._onPagerClick(page - 5)}
      />
    );
  };

  jumpNext = (page: number) => {
    const { prefixCls, locale } = this.props;
    const cls = classnames({
      [`${prefixCls}__item`]: true,
      [`${prefixCls}__item--ellipsis`]: true,
    });

    return (
      <li
        key="jump-next"
        title={locale!.next_5_page}
        className={cls}
        onClick={() => this._onPagerClick(page + 5)}
      />
    );
  };

  handleJumpChange = ({ target: { value } }) => {
    const sValue = parseInt(value, 10);
    if (typeof sValue !== 'number') {
      this.setState({ currentInputValue: '' });
      return;
    }

    this.setState({ currentInputValue: value });
  };

  /**
   * 按下回车键，改变分页
   */
  handleJumpKeyDown = ({ keyCode, target: { value } }: any) => {
    if (keyCode === 13) {
      let sValue = parseInt(value, 10);
      if (typeof sValue !== 'number') {
        return;
      }

      const pageCount = this.getPageSize();
      if (sValue < 1) {
        sValue = 1;
      }

      if (sValue > pageCount) {
        sValue = pageCount;
      }

      this._onPagerClick(sValue);
    }
  };

  _onPagerClick(value: number) {
    const { onChange } = this.props;

    this.setState({
      value,
      currentInputValue: value,
    });

    onChange(value);
  }

  renderPager = (i: number, page: number) => {
    const { prefixCls } = this.props;
    const cls = classnames({
      [`${prefixCls}__item`]: true,
      [`${prefixCls}__item--active`]: page === i,
    });

    return (
      <li
        key={i}
        title={`${i}`}
        className={cls}
        onClick={() => this._onPagerClick(i)}
      >
        {i}
      </li>
    );
  };

  renderTotal = () => {
    const { total, prefixCls, locale, pageSize } = this.props;
    const cls = classnames({
      [`${prefixCls}__total`]: true,
    });

    const { value } = this.state;
    return (
      <li key="total" className={cls}>
        {format(locale!.total, {
          total,
        })}
        {format(locale!.current, {
          current: `${value} / ${Math.ceil(total / pageSize)}`,
        })}
      </li>
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
    let { pageSizeOptions } = this.props;
    let defaultPageSize = pageSizeOptions && pageSizeOptions.length > 0 && pageSizeOptions[0];

    if (!pageSizeOptions) {
      pageSizeOptions = [10, 20, 30, 40, 50];
      defaultPageSize = 10;
    }
    return (
      <li className={`${prefixCls}__options`}>
        <Select
          className={`${prefixCls}__options--changer`}
          defaultValue={defaultPageSize}
          value={pageSize === 10 ? defaultPageSize : pageSize}
          onChange={({ value }: any) => {
            if (value === pageSize) {
              return;
            }
            if (onPageSizeChange !== noop) {
              onPageSizeChange(pageSize);
              return;
            }
            onChange(1);
          }}
        >
          {pageSizeOptions.map((value) => {
            return (
              <Select.Option value={value} key={value}>
                {format(locale!.pagesize, { value })}
              </Select.Option>
            );
          })}
        </Select>
      </li>
    );
  };

  renderJumper = () => {
    const { prefixCls, locale } = this.props;

    return (
      <li className={`${prefixCls}__options`}>
        <div className={`${prefixCls}__options--jumper`}>
          {locale!.goto}
          <input type="text" onKeyDown={this.handleJumpKeyDown} />
          {locale!.pageClassifier}
        </div>
      </li>
    );
  };

  render() {
    const {
      prefixCls,
      className,
      showTotal,
      showQuickJumper,
      showPageSizeChanger,
      simple,
      size,
      style,
    } = this.props;

    const cls = classnames({
      [prefixCls!]: true,
      [`${prefixCls}--${size}`]: !!size,
      [`${prefixCls}--simple`]: simple,
      [className!]: !!className,
    });

    return (
      <ul className={cls} style={style}>
        {showTotal && this.renderTotal()}
        {simple ? this.renderSimple() : this.getPagerList()}
        {showPageSizeChanger && this.renderPageSizeSelector()}
        {showQuickJumper && this.renderJumper()}
      </ul>
    );
  }
}

export default LocaleReceiver('Pagination')(Pagination);
