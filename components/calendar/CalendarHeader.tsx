import React, { Component } from 'react';
import Icon from '../icon';
import { HeaderProps } from './PropsType';
import LocaleReceiver from '../locale-provider/LocaleReceiver';

class CalendarHeader extends Component<HeaderProps, any> {
  static defaultProps = {
    prefixCls: 'ui-calendar',
    current: new Date(),
    isShowPrev: true,
    isShowNext: true,
    onChange: () => {},
    onChangePanel: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      panel: props.panel || 'date',
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('panel' in nextProps) {
      this.setState({
        panel: nextProps.panel,
      });
    }
  }

  // 切换界面
  onChangePanel(panel) {
    const { onChangePanel } = this.props;
    this.setState({ panel }, () => onChangePanel(panel));
  }

  // 切换世纪
  onCenturyClick(current, type) {
    const { onChange } = this.props;
    const newYear = current;
    if (type === 'pre') {
      newYear.year = current.year - 10;
    } else {
      newYear.year = current.year + 10;
    }
    const currentString = `${newYear.year}/${newYear.month}/${newYear.date}`;

    onChange(currentString);
  }

  // 切换年份
  onYearClick(current, type) {
    const { onChange } = this.props;
    const newYear = current;
    if (type === 'pre') {
      newYear.year = current.year - 1;
    } else {
      newYear.year = current.year + 1;
    }
    const currentString = `${newYear.year}/${newYear.month}/${newYear.date}`;

    onChange(currentString);
  }

  // 切换月份
  onMonthClick(current, type) {
    const { onChange } = this.props;
    const newMonth = type === 'pre' ? this.getPreMonth(current) : this.getNextMonth(current);
    const currentString = `${newMonth.year}/${newMonth.month}/${newMonth.date}`;

    onChange(currentString);
  }

  // 获取下个月
  getNextMonth = (current) => {
    const result = current;
    if (result.month === 12) {
      result.year += 1;
      result.month = 1;
    } else {
      result.month += 1;
    }
    return result;
  };

  // 获取上个月
  getPreMonth = (current) => {
    const result = current;
    if (result.month === 1) {
      result.year -= 1;
      result.month = 12;
    } else {
      result.month -= 1;
    }
    return result;
  };

  render() {
    const {
      prefixCls,
      isShowPrev,
      isShowNext,
      locale,
      localeCode,
      children,
      current: stateCurrent,
    } = this.props;
    const { panel } = this.state;

    const dd = new Date(stateCurrent);

    const current = {
      year: dd.getFullYear(),
      month: dd.getMonth() + 1,
      date: dd.getDate(),
    };

    const beforeYear = parseInt(String(current.year / 10), 10) * 10;

    return (
      <div className={`${prefixCls}-header`}>
        <div
          style={{ display: panel !== 'date' ? 'none' : 'block' }}
        >
          <span
            style={{ display: isShowPrev ? 'block' : 'none' }}
            onClick={() => this.onMonthClick(current, 'pre')}
            className={`${prefixCls}-header-pre-btn`}
            title={locale!.last_month}
          >
            <Icon type="arrow-left" />
          </span>

          {
            localeCode === 'zh-cn'
              ? (
                <span className={`${prefixCls}-header-time`}>
                  <span
                    className={`${prefixCls}-header-btn`}
                    onClick={() => this.onChangePanel('year')}
                  >
                    {current.year}
                    年
                  </span>
                  <span
                    className={`${prefixCls}-header-btn`}
                    onClick={() => this.onChangePanel('month')}
                  >
                    {current.month}
                    月
                  </span>
                </span>
              )
              : (
                <span className={`${prefixCls}-header-time`}>
                  <span
                    className={`${prefixCls}-header-btn`}
                    onClick={() => this.onChangePanel('month')}
                  >
                    {locale![`month${current.month}`]}
                  </span>
                  <span
                    className={`${prefixCls}-header-btn`}
                    onClick={() => this.onChangePanel('year')}
                  >
                    {current.year}
                  </span>
                </span>
              )
          }

          <span
            style={{ display: isShowNext ? 'block' : 'none' }}
            onClick={() => this.onMonthClick(current, 'next')}
            className={`${prefixCls}-header-next-btn`}
            title={locale!.next_month}
          >
            <Icon type="arrow-right" />
          </span>

          {children}
        </div>

        <div
          style={{ display: panel !== 'month' ? 'none' : 'block' }}
        >
          <span
            onClick={() => this.onYearClick(current, 'pre')}
            className={`${prefixCls}-header-pre-btn`}
            title={locale!.last_year}
          >
            <Icon type="arrow-left" />
          </span>
          <span>
            <span
              className={`${prefixCls}-header-year-btn`}
              onClick={() => this.onChangePanel('date')}
            >
              {current.year}
              {locale!.year}
            </span>
          </span>
          <span
            onClick={() => this.onYearClick(current, 'next')}
            className={`${prefixCls}-header-next-btn`}
            title={locale!.next_year}
          >
            <Icon type="arrow-right" />
          </span>
        </div>

        <div
          style={{ display: panel !== 'year' ? 'none' : 'block' }}
        >
          <span
            onClick={() => this.onCenturyClick(current, 'pre')}
            className={`${prefixCls}-header-pre-btn`}
            title={locale!.last_decade}
          >
            <Icon type="arrow-left" />
          </span>
          <span>
            <span
              className={`${prefixCls}-header-year-btn`}
              onClick={() => this.onChangePanel('date')}
            >
              {beforeYear}
              {' '}
              -
              {beforeYear + 9}
              {' '}
              {locale!.year}
            </span>
          </span>
          <span
            onClick={() => this.onCenturyClick(current, 'next')}
            className={`${prefixCls}-header-next-btn`}
            title={locale!.next_decade}
          >
            <Icon type="arrow-right" />
          </span>
        </div>
      </div>
    );
  }
}

export default LocaleReceiver('Calendar')(CalendarHeader);
