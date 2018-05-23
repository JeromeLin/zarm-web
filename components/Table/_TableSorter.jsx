import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        sort: !!nextProps.sort,
      });
    }
  }

  toggleSort() {
    const sort = !this.state.sort;
    this.setState({ sort });
    this.props.onSort(sort);
  }

  render() {
    const { className } = this.props;
    const { sort } = this.state;

    const cls = classnames({
      'ui-table-sorter': true,
      [className]: !!className,
    });
    const sortUpCls = classnames({
      'ui-table-sorter-up': true,
      'ui-table-sorter-active': !!sort,
    });
    const sortDownCls = classnames({
      'ui-table-sorter-down': true,
      'ui-table-sorter-active': sort !== undefined && !sort,
    });

    return (
      <span className={cls} onClick={() => this.toggleSort()}>
        <span className={sortUpCls} />
        <span className={sortDownCls} />
      </span>
    );
  }
}

TableSorter.propTypes = {
  sort: PropTypes.bool,
  onSort: PropTypes.func,
};

TableSorter.defaultProps = {
  sort: false,
  onSort() {},
};

export default TableSorter;
