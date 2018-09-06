import React, { Component } from 'react';
import Icon from '../icon';
import { HeaderProps } from './PropsType';
import LocaleReceiver from '../locale/LocaleReceiver';

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

  render() {
    const {
      prefixCls,
      isShowPrev,
      isShowNext,
      locale,
      localeCode,
      children,
    } = this.props;

    const dd = new Date(this.props.current);

    const current = {
      year: dd.getFullYear(),
      month: dd.getMonth() + 1,
      date: dd.getDate(),
    };

    const beforeYear = parseInt(String(current.year / 10), 10) * 10;

    return (
      <div className={`${prefixCls}-header`}>
        <div
          style={{ display: this.state.panel !== 'date' ? 'none' : 'block' }}
        >
          <a
            style={{ display: isShowPrev ? 'block' : 'none' }}
            href="javascript:;"
            onClick={() => this.onMonthClick(current, 'pre')}
            className={`${prefixCls}-header-pre-btn`}
            title={locale.last_month}
          >
            <Icon type="arrow-left" />
          </a>

          {
            localeCode === 'zh-cn'
            ? (
              <span className={`${prefixCls}-header-time`}>
                <a
                  href="javascript:;"
                  className={`${prefixCls}-header-btn`}
                  onClick={() => this.onChangePanel('year')}
                >
                  {current.year}年
                </a>
                <a
                  href="javascript:;"
                  className={`${prefixCls}-header-btn`}
                  onClick={() => this.onChangePanel('month')}
                >
                  {current.month}月
                </a>
              </span>
            )
            : (
              <span className={`${prefixCls}-header-time`}>
                <a
                  href="javascript:;"
                  className={`${prefixCls}-header-btn`}
                  onClick={() => this.onChangePanel('month')}
                >
                  {locale[`month${current.month}`]}
                </a>
                <a
                  href="javascript:;"
                  className={`${prefixCls}-header-btn`}
                  onClick={() => this.onChangePanel('year')}
                >
                  {current.year}
                </a>
              </span>
            )
          }

          <a
            style={{ display: isShowNext ? 'block' : 'none' }}
            href="javascript:;"
            onClick={() => this.onMonthClick(current, 'next')}
            className={`${prefixCls}-header-next-btn`}
            title={locale.next_month}
          >
            <Icon type="arrow-right" />
          </a>

          {children}
        </div>

        <div
          style={{ display: this.state.panel !== 'month' ? 'none' : 'block' }}
        >
          <a
            href="javascript:;"
            onClick={() => this.onYearClick(current, 'pre')}
            className={`${prefixCls}-header-pre-btn`}
            title={locale.last_year}
          >
            <Icon type="arrow-left" />
          </a>
          <span>
            <a
              href="javascript:;"
              className={`${prefixCls}-header-year-btn`}
              onClick={() => this.onChangePanel('date')}
            >
              {current.year}{locale.year}
            </a>
          </span>
          <a
            href="javascript:;"
            onClick={() => this.onYearClick(current, 'next')}
            className={`${prefixCls}-header-next-btn`}
            title={locale.next_year}
          >
            <Icon type="arrow-right" />
          </a>
        </div>

        <div
          style={{ display: this.state.panel !== 'year' ? 'none' : 'block' }}
        >
          <a
            href="javascript:;"
            onClick={() => this.onCenturyClick(current, 'pre')}
            className={`${prefixCls}-header-pre-btn`}
            title={locale.last_decade}
          >
            <Icon type="arrow-left" />
          </a>
          <span>
            <a
              href="javascript:;"
              className={`${prefixCls}-header-year-btn`}
              onClick={() => this.onChangePanel('date')}
            >
              {beforeYear} - {beforeYear + 9} {locale.year}
            </a>
          </span>
          <a
            href="javascript:;"
            onClick={() => this.onCenturyClick(current, 'next')}
            className={`${prefixCls}-header-next-btn`}
            title={locale.next_decade}
          >
            <Icon type="arrow-right" />
          </a>
        </div>
      </div>
    );
  }

  // 切换界面
  onChangePanel(panel) {
    this.setState({ panel }, () => this.props.onChangePanel(panel));
  }

  // 切换世纪
  onCenturyClick(current, type) {
    const newYear = current;
    if (type === 'pre') {
      newYear.year = current.year - 10;
    } else {
      newYear.year = current.year + 10;
    }
    const currentString = `${newYear.year}/${newYear.month}/${newYear.date}`;

    this.props.onChange(currentString);
  }

  // 切换年份
  onYearClick(current, type) {
    const newYear = current;
    if (type === 'pre') {
      newYear.year = current.year - 1;
    } else {
      newYear.year = current.year + 1;
    }
    const currentString = `${newYear.year}/${newYear.month}/${newYear.date}`;

    this.props.onChange(currentString);
  }

  // 切换月份
  onMonthClick(current, type) {
    const newMonth =
      type === 'pre' ? this.getPreMonth(current) : this.getNextMonth(current);
    const currentString = `${newMonth.year}/${newMonth.month}/${newMonth.date}`;

    this.props.onChange(currentString);
  }

  // 获取下个月
  // eslint-disable-next-line
  getNextMonth(current) {
    const result = current;
    if (result.month === 12) {
      result.year += 1;
      result.month = 1;
    } else {
      result.year = result.year;
      result.month += 1;
    }
    return result;
  }

  // 获取上个月
  // eslint-disable-next-line
  getPreMonth(current) {
    const result = current;
    if (result.month === 1) {
      result.year -= 1;
      result.month = 12;
    } else {
      result.year = result.year;
      result.month -= 1;
    }
    return result;
  }
}

export default LocaleReceiver(CalendarHeader, 'Calendar');
