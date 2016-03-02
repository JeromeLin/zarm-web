
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';

class Pagination extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  render() {
    const props = this.props;
    const { isBordered, className, total, pageSize, addonBefore, addonAfter, ...others } = props;

    const cls = classnames({
      'ui-pagination'         : true,
      'ui-pagination-bordered': ('bordered' in props || isBordered),
      [className]             : !!className,
    });

    const pageCount = Math.ceil(total / pageSize);
    let pagerList = [];
    let { value } = this.state;
    value = (value < 1) ? 1 : value;
    value = (value > pageCount) ? pageCount : value;


    if (pageCount <= 9) {
      for (let i = 1; i <= pageCount; i++) {
        pagerList.push(
          <li key={i}
            title={i}
            className={classnames({'ui-pagination-item': true, 'ui-pagination-item-active': value === i})}
            onClick={() => this._onPagerClick(i)}
          >{i}</li>
        );
      }
    } else {
      const firstPager = <li key={1} title="第一页" className="ui-pagination-item" onClick={() => this._onPagerClick(1)}>1</li>,
            lastPager = <li key={pageCount} title="最后一页" className="ui-pagination-item" onClick={() => this._onPagerClick(pageCount)}>{pageCount}</li>,
            prevPager = <li key="prev" title="上一页" className={classnames({'ui-pagination-item': true, 'ui-pagination-item-prev': true, 'ui-pagination-item-disabled': value == 1})} onClick={() => this._onPagerClick(value - 1)}><Icon type="back" /></li>,
            nextPager = <li key="next" title="下一页" className={classnames({'ui-pagination-item': true, 'ui-pagination-item-next': true, 'ui-pagination-item-disabled': value == pageCount})}  onClick={() => this._onPagerClick(value + 1)}><Icon type="right" /></li>,
            jumpPrev = <li key="jump-prev" title="向前 5 页" className="ui-pagination-item ui-pagination-item-jump-prev" onClick={() => this._onPagerClick(value - 5)}></li>,
            jumpNext = <li key="jump-next" title="向后 5 页" className="ui-pagination-item ui-pagination-item-jump-next" onClick={() => this._onPagerClick(value + 5)}></li>;

      let left = Math.max(1, value - 2),
          right = Math.min(value + 2, pageCount);

      if (value - 1 <= 2) {
        right = 1 + 4;
      }

      if (pageCount - value <= 2) {
        left = pageCount - 4;
      }

      for (let i = left; i <= right; i++) {
        pagerList.push(
          <li key={i}
            title={i}
            className={classnames({'ui-pagination-item': true, 'ui-pagination-item-active': value === i})}
            onClick={() => this._onPagerClick(i)}
          >{i}</li>
        );
      }

      if (value - 1 >= 4) {
        pagerList.unshift(jumpPrev);
      }
      if (pageCount - value >= 4) {
        pagerList.push(jumpNext);
      }

      if (left !== 1) {
        pagerList.unshift(firstPager);
      }
      if (right !== pageCount) {
        pagerList.push(lastPager);
      }

      pagerList.unshift(prevPager);
      pagerList.push(nextPager);
    }

    pagerList.unshift(<div key="addon-before" className="ui-pagination-addon-before">{addonBefore}</div>);
    pagerList.push(<div key="addon-after" className="ui-pagination-addon-after">{addonAfter}</div>);

    return (
      <ul {...others} className={cls}>
        {pagerList}
      </ul>
    );
  }

  _onPagerClick(value) {
    const { total, pageSize } = this.props;
    const pageCount = Math.ceil(total / pageSize);

    this.setState({
      value: value
    });
    this.props.onPageChange(value);
  }
  
}

Pagination.propTypes = {
  total        : PropTypes.number,
  pageSize     : PropTypes.number,
  onChange     : PropTypes.func,
};

Pagination.defaultProps = {
  defaultValue : 1,
  total        : 0,
  pageSize     : 10,
  onChange     : function () {},
};

export default Pagination;