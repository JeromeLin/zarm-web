import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Select from '../Select';
import Input from '../Input';
import Icon from '../Icon';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  firstPager = (
    <li
      key={1}
      title="第-页"
      className="ui-pagination-item"
      onClick={() => this._onPagerClick(1)}
    >
      1
    </li>
  );

  lastPager = (pageCount) => {
    return (
      <li
        key={pageCount}
        title="最后一页"
        className="ui-pagination-item"
        onClick={() => this._onPagerClick(pageCount)}
      >
        {pageCount}
      </li>
    );
  };

  prevPager = (current) => {
    return (
      <li
        key="prev"
        title="上一页"
        className={classnames({
          'ui-pagination-item': true,
          'ui-pagination-item-prev': true,
          'ui-pagination-item-disabled': Number(current) === 1
        })}
        onClick={() => current > 1 && this._onPagerClick(current - 1)}
      >
        <Icon type="arrow-left" />
      </li>
    );
  };

  nextPager = (current, pageCount) => {
    return (
      <li
        key="next"
        title="下一页"
        className={classnames({
          'ui-pagination-item': true,
          'ui-pagination-item-next': true,
          'ui-pagination-item-disabled': Number(current) === pageCount
        })}
        onClick={() => current < pageCount && this._onPagerClick(current + 1)}
      >
        <Icon type="arrow-right" />
      </li>
    );
  }

  jumpPrev = (current) => {
    return (
      <li
        key="jump-prev"
        title="向前 5 页"
        className="ui-pagination-item ui-pagination-item-jump-prev"
        onClick={() => this._onPagerClick(current - 5)}
      />
    );
  };

  jumpNext = (current) => {
    return (
      <li
        key="jump-next"
        title="向后 5 页"
        className="ui-pagination-item ui-pagination-item-jump-next"
        onClick={() => this._onPagerClick(current + 5)}
      />
    );
  }

  renderPager = (i, current) => {
    return (
      <li
        key={i}
        title={i}
        className={classnames({
          'ui-pagination-item': true,
          'ui-pagination-item-active': current === i
        })}
        onClick={() => this._onPagerClick(i)}
      >
        {i}
      </li>
    );
  }

  renderAddonBefore = (addonBefore) => {
    return (
      <div key="addon-before" className="ui-pagination-addon-before">
        {addonBefore}
      </div>
    );
  }

  renderAddonAfter = (addonAfter) => {
    return (
      <div key="addon-after" className="ui-pagination-addon-after">
        {addonAfter}
      </div>
    );
  }

  renderTotal = () => {
    const { total, pageSize } = this.props;
    const { value } = this.state;
    return (
      <div className="ui-pagination-total">
        共有条 {total} 记录 第 {value} / {Math.ceil(
          total / pageSize
        )} 页
      </div>
    );
  }

  renderPageSizeSelector = () => {
    const { radius } = this.props;
    return (
      <div className="ui-pagination-size">
        <Select
          isRadius={radius}
          size="sm"
          defaultValue={10}
          onChange={({ value }) => {
            this.props.onPageSizeChange(value);
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
    const { radius, total, pageSize } = this.props;
    return (
      <div className="ui-pagination-jumper">
        跳至
        <Input
          isRadius={radius}
          style={{ width: 50, marginLeft: 5, marginRight: 5 }}
          size="sm"
          defaultValue=""
          onKeyDown={(e) => {
            let { value } = e.target;
            if (e.keyCode === 13) {
              value = parseInt(value, 10);
              // eslint-disable-next-line
              if (!value || isNaN(value)) return;

              if (value < 1) value = 1;
              const pageCount = Math.ceil(total / pageSize);
              if (value > pageCount) value = pageCount;

              this._onPagerClick(value);
            }
          }}
        />
        页
      </div>
    );
  }

  getPagerList = () => {
    const {
      total,
      pageSize,
      addonBefore,
      addonAfter
    } = this.props;

    const pageCount = Math.ceil(total / pageSize);
    let pagerList = [];
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
        pagerList.unshift(this.firstPager);
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

  _onPagerClick(value) {
    this.setState({
      value
    });
    this.props.onPageChange(value);
  }

  render() {
    const { props } = this;
    const {
      isBordered,
      isRadius,
      className,
      showTotal,
      showJumper,
      showPageSizeSelector,
      style
    } = props;

    const cls = classnames({
      'ui-pagination': true,
      bordered: 'bordered' in props || isBordered,
      radius: 'radius' in props || isRadius,
      [className]: !!className
    });

    return (
      <div className={cls} style={style}>
        {
          showTotal && this.renderTotal()
        }
        <div className="ui-pagination-pagers">
          <ul>
            {this.getPagerList()}
          </ul>
          {
            showPageSizeSelector && this.renderPageSizeSelector()
          }
          {
            showJumper && this.renderJumper()
          }
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  defaultValue: PropTypes.number,
  isBordered: PropTypes.bool,
  isRadius: PropTypes.bool,
  total: PropTypes.number,
  pageSize: PropTypes.number,
  showPageSizeSelector: PropTypes.bool,
  showTotal: PropTypes.bool,
  showJumper: PropTypes.bool,
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
};

Pagination.defaultProps = {
  defaultValue: 1,
  isBordered: false,
  isRadius: false,
  total: 0,
  pageSize: 10,
  showTotal: false,
  showJumper: false,
  showPageSizeSelector: false,
  onPageChange: () => {},
  onPageSizeChange: () => {}
};

export default Pagination;
