
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class TableSorter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sort: props.sort,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('sort' in nextProps) {
      this.setState({
        sort: !!nextProps.sort
      });
    }
  }

  render() {
    const { children, onSort, className } = this.props;
    const { sort } = this.state;

    const cls = classnames({
      'ui-table-sorter': true,
      [className]      : !!className,
    }),
    sortUpCls = classnames({
      'ui-table-sorter-up'    : true,
      'ui-table-sorter-active': !!sort,
    }),
    sortDownCls = classnames({
      'ui-table-sorter-down'  : true,
      'ui-table-sorter-active': (sort !== undefined) && !sort,
    });

    return (
      <span className={cls} onClick={() => this.toggleSort() }>
        <span className={sortUpCls}></span>
        <span className={sortDownCls}></span>
      </span>
    );
  }

  toggleSort() {
    const sort = !this.state.sort;
    this.setState({sort});
    this.props.onSort(sort);
  }
}

TableSorter.propTypes = {
  sort  : PropTypes.bool,
  onSort: PropTypes.func,
};

TableSorter.defaultProps = {
  onSort: function () {},
};

export default TableSorter;