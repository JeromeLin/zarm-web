import React, { Component } from 'react';
import classnames from 'classnames';
import Format from '../utils/format';
import CalendarHeader from './CalendarHeader';
import CalendarDateTable from './CalendarDateTable';
import CalendarMonthTable from './CalendarMonthTable';
import CalendarYearTable from './CalendarYearTable';
import PropsType from './PropsType';
import LocaleReceiver from '../locale/LocaleReceiver';

class Calendar extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-calendar',
    format: 'yyyy-MM-dd',
    min: '',
    max: '',
    onChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      current: Format.date(
        props.value || props.defaultValue || new Date(),
        'yyyy/M/d',
      ),
      value: Format.date(props.value || props.defaultValue, 'yyyy/M/d'),
      panel: 'date',
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: Format.date(nextProps.value, 'yyyy/M/d'),
        current: Format.date(
          nextProps.value || nextProps.defaultValue || new Date(),
          'yyyy/M/d',
        ),
        panel: 'date',
      });
    }
  }

  onYearClick(value) {
    this.setState({
      current: value,
      panel: 'date',
    });
  }

  onMonthClick(value) {
    this.setState({
      current: value,
      panel: 'date',
    });
  }

  onDateClick(value) {
    this.setState({
      value,
      current: value,
    });
    const { format, onChange } = this.props;
    if (onChange) {
      onChange(Format.date(value, format));
    }
  }

  render() {
    const { props } = this;
    const {
      className, hasFooter, min, max, style, prefixCls, locale,
    } = props;
    const { current, value, panel } = this.state;

    const cls = classnames({
      [prefixCls!]: true,
      [className!]: !!className,
    });

    return (
      <div className={cls} style={style}>
        <CalendarHeader
          panel={panel}
          current={current}
          // tslint:disable-next-line:no-shadowed-variable
          onChange={current => this.setState({ current })}
          // tslint:disable-next-line:no-shadowed-variable
          onChangePanel={panel => this.setState({ panel })}
        />
        <div className={`${prefixCls}-body`}>
          <CalendarYearTable
            visible={panel !== 'year'}
            value={value}
            current={current}
            // tslint:disable-next-line:no-shadowed-variable
            onYearClick={value => this.onYearClick(value)}
          />

          <CalendarMonthTable
            visible={panel !== 'month'}
            value={value}
            current={current}
            // tslint:disable-next-line:no-shadowed-variable
            onMonthClick={value => this.onMonthClick(value)}
          />

          <CalendarDateTable
            visible={panel !== 'date'}
            value={value}
            current={current}
            min={min}
            max={max}
            // tslint:disable-next-line:no-shadowed-variable
            onDateClick={value => this.onDateClick(value)}
          />
        </div>
        {
          // tslint:disable-next-line:jsx-no-multiline-js
          hasFooter ? (
          <div className={`${prefixCls}-footer`}>
            <a
              href="javascript:;"
              onClick={() => this.onDateClick(new Date())}
              className={`${prefixCls}-footer-btn`}
            >
              {locale.today}
            </a>

            <a
              href="javascript:;"
              onClick={() => this.onDateClick('')}
              className={`${prefixCls}-footer-btn`}
            >
              {locale.clear}
            </a>
          </div>
        ) : null}
      </div>
    );
  }
}

export default LocaleReceiver(Calendar);
