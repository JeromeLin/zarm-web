import React, { Component, ReactElement, ReactNode } from 'react';
import classnames from 'classnames';
import Events from '../utils/events';
import Option from './Option';
import Dropdown from '../dropdown';
import Menu from '../menu';
import Icon from '../icon';
import PropsType from './PropsType';
import LocaleReceiver from '../locale/LocaleReceiver';
import Tag from '../tag';

/**
 * placeholder
 */
class Select extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-select',
    isRadius: false,
    isDisabled: false,
    isSearch: false,
    onSearchChange: () => { },
    onChange: () => { },
  };

  static Option;
  static Multiple;

  inputBox: HTMLInputElement;

  constructor(props) {
    super(props);
    this.state = {
      value:
        props.value ||
        props.defaultValue ||
        this.getCheckedValue(props.children),
      dropdown: false,
      searchValue: '',
      showPlacehoder: true,
    };
    this.optionMap = this.getOptionMap(props.children);
    console.log(this.optionMap);
  }

  componentDidMount() {
    this.bindOuterHandlers();
  }

  getOptionMap(options) {
    return options.reduce((prev, option) => {
      if (option.type === Option) {
        prev[option.props.value] = option;
      }
      return prev;
    }, {});
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps || this.getCheckedValue(nextProps.children)) {
      let value = nextProps.value || this.getCheckedValue(nextProps.children);
      if (nextProps.multiple && !Array.isArray(value)) {
        value = [value];
      }
      this.optionMap = this.getOptionMap();
      this.setState({
        value,
      });
    }
  }

  componentDidUpdate() {
    if (this.props.search) {
      if (this.state.dropdown) {
        this.inputBox.focus();
      } else {
        this.inputBox.blur();
      }
    }
  }

  componentWillUnmount() {
    this.unbindOuterHandlers();
  }

  getOptionList(children: Array<ReactNode>): Array<ReactNode> {
    return children.filter((child) => child instanceof Option);
  }

  // eslint-disable-next-line
  getCheckedValue(children) {
    let checkedValue = null;
    React.Children.forEach(children, (option) => {
      if ((option as ReactElement<any>).props && (option as ReactElement<any>).props.checked) {
        checkedValue = (option as ReactElement<any>).props.value;
      }
    });
    return checkedValue;
  }

  onOptionChange(_: React.MouseEvent, props, index) {
    if ('disabled' in props || props.isDisabled) {
      return;
    }

    if (props.search || props.isSearch) {
      this.setState({
        searchValue: '',
      });
      this.inputBox.textContent = '';
    }

    if (this.props.multiple) {
      const selected = this.state.value.slice();
      console.log(selected, props.value);
      const position = selected.indexOf(props.value);
      if (position === -1) {
        selected.push(props.value);
      } else {
        selected.splice(position, 1);
      }
      const selectedData = selected.map((select, selectIndex) => {
        const vdom = this.optionMap[select];
        const text = vdom ? vdom.props.children : '';
        return {
          text,
          value: select,
          index: selectIndex,
        };
      });
      console.log(selectedData);
      this.setDropdown(false, () => this.props.onChange(selected, selectedData));
    }

    const selected = {
      index,
      value: props.value,
      text: props.children,
    };
    this.setDropdown(false, () => this.props.onChange(selected));
  }

  setDropdown(isOpen, callback?) {
    this.setState(
      {
        dropdown: isOpen,
        searchValue: '',
      },
      () => {
        if (typeof callback === 'function') {
          callback();
        }
      },
    );
  }

  handleKeyup(e) {
    if (this.state.dropdown === true && e.keyCode === 27) {
      this.setDropdown(false);
    }
  }

  bindOuterHandlers() {
    Events.on(document, 'keyup', e => this.handleKeyup(e));
  }

  unbindOuterHandlers() {
    Events.off(document, 'keyup', e => this.handleKeyup(e));
  }

  inputRender(textCls) {
    return <div
      className="input-div"
      contentEditable
      ref={elem => this.inputBox = elem}
      onInput={(e) => {
        let value = e.target.textContent;
        this.setState({ searchValue: value });
      }}
    />;
  }

  getPlaceHoder(hasValue, valueText) {
    if (hasValue) {
      return valueText;
    }
    if (this.state.dropdown) {
      return '';
    }
    const { locale, searchPlaceholder, search } = this.props;
    if (search) {
      return searchPlaceholder || locale!.searchPlaceholder;
    }
    return valueText;
  }

  renderMultiple() {
    return this.state.value.map((item, index) => {
      return <Tag
        key={item}
        radius
        onClose={() => {

        }}
      >
        {item}
      </Tag>;
    });
  }

  render() {
    const { props } = this;
    const {
      prefixCls,
      placeholder,
      searchPlaceholder,
      isRadius,
      isDisabled,
      isSearch,
      size,
      onSearchChange,
      style,
      zIndex,
      title,
      getPopupContainer,
      locale,
    } = props;

    const disabled = 'disabled' in props || isDisabled;
    const radius = 'radius' in props || isRadius;
    const search = 'search' in props || isSearch;

    let valueText = placeholder || locale!.placeholder;
    let hasValue = false;

    const children = React.Children.map(props.children, (option, index) => {
      if (option && typeof option === 'object' && option.type === Option) {
        // tslint:disable-next-line:triple-equals
        if (this.state.value == option.props.value) {
          valueText = option.props.children;
          hasValue = true;
        }

        if (
          search &&
          option.props.children.toString().indexOf(this.state.searchValue) < 0
        ) {
          return null;
        }
        return (
          <Option
            {...option.props}
            onChange={e => this.onOptionChange(e, option.props, index)}
            checked={this.state.value === option.props.value}
          />
        );
      }
      return null;
    });

    const cls = classnames({
      [prefixCls!]: true,
      [`${prefixCls}-open`]: this.state.dropdown,
      disabled,
      radius,
      [`size-${size}`]: !!size,
    });

    const textCls = classnames({
      [`${prefixCls}-text`]: true,
      [`${prefixCls}-text-placeholder`]: true,
      [`${prefixCls}-text-placeholder-color`]:
        !hasValue || (search && hasValue && this.state.dropdown),
    });

    const menuStyle = {
      maxHeight: 250,
      overflow: 'auto',
    };
    const menus =
      children.length > 0 ? (
        <Menu size={size} style={menuStyle}>{children}</Menu>
      ) : (
          <span className={`${prefixCls}-notfound`}>{locale!.noMatch}</span>
        );

    let inputPlaceholder = this.getPlaceHoder(hasValue, valueText);

    let textRender = !(search && this.state.searchValue.length > 0) && (
      <span className={textCls} title={title}>{inputPlaceholder}</span>
    );

    const inputRender = search && !disabled && this.inputRender(textCls);

    return (
      <Dropdown
        disabled={disabled}
        visible={this.state.dropdown}
        isRadius={radius}
        overlay={menus}
        zIndex={zIndex}
        getPopupContainer={getPopupContainer}
        onVisibleChange={(visible) => this.setState({ dropdown: visible })}
      >
        <span className={cls} style={style}>
          <span
            className={`${prefixCls}-selection`}
            role="combobox"
            aria-autocomplete="list"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {textRender}
            {inputRender}
            <Icon type="arrow-bottom" className={`${prefixCls}-arrow`} />
          </span>
        </span>
      </Dropdown>

    );
  }
}

export default LocaleReceiver(Select, 'Select');
