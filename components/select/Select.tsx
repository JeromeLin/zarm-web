import React, { Component, ReactElement, ReactNode } from 'react';
import Events from '../utils/events';
import Option from './Option';
import Dropdown from '../dropdown';
import Menu from '../menu';
import InputWithTags from '../tag-input';
import PropsType from './PropsType';
import LocaleReceiver from '../locale/LocaleReceiver';

interface StateProps {
  value: string | string[];
  dropdown: boolean;
  searchValue: string | null;
  showPlacehoder: boolean;
}

/**
 * placeholder
 */
class Select extends Component<PropsType, StateProps> {
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
  optionMap: { [x: string]: any, [y: number]: any };
  inputWithTags: InputWithTags;
  oldInputDivHeight: number = 0;

  constructor(props: PropsType) {
    super(props);
    let value = props.value === undefined ? props.defaultValue : props.value;
    let state: StateProps = {
      value: String(value),
      dropdown: false,
      searchValue: '',
      showPlacehoder: true,
    };

    if (props.multiple) {
      if (!Array.isArray(value)) {
        state.value = [String(value)];
      } else {
        state.value = value.map(val => String(val));
      }
    } else {
      state.value = String(value);
    }
    this.state = state;
    this.optionMap = this.getOptionMap(this.props.children);
  }

  componentDidMount() {
    this.bindOuterHandlers();
  }

  getOptionMap(options: ReactNode, prev = {}) {
    if (!Array.isArray(options)) {
      options = [options];
    }

    React.Children.map(options, (option) => {
      if (option && typeof option === 'object' && option.type) {
        if (option.props) {
          prev[option.props.value] = option;
        }
      } else if (Array.isArray(option)) {
        this.getOptionMap(option, prev);
      }
      return prev;
    });
    return prev;
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps || nextProps.defaultValue !== this.props.defaultValue) {
      let value = nextProps.value === undefined ? nextProps.defaultValue : nextProps.value;
      if (nextProps.multiple) {
        if (!Array.isArray(value)) {
          value = [String(value)];
        } else {
          value = value.map(val => String(val));
        }
      } else {
        value = String(value);
      }
      this.optionMap = this.getOptionMap(nextProps.children);
      this.setState({
        value,
      });
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

    let value = String(props.value);

    if (this.props.multiple) {
      const selected = (this.state.value as Array<string>).slice();
      const position = selected.indexOf(value);
      if (position === -1) {
        selected.push(value);
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
      this.setState({
        value: selected,
      }, () => {
        this.props.onChange(selected, selectedData);
      });

      return;
    }

    const selected = {
      index,
      value: props.value,
      text: props.children,
    };

    this.setState({
      value: props.value,
    }, () => {
      this.setDropdown(false, () => this.props.onChange(selected));
    });
  }

  inputWithTagsRef = (e) => {
    this.inputWithTags = e;
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

  onDeleteTag = (_e, _key, _value, index) => {
    const selected = (this.state.value as Array<string>).slice();
    selected.splice(index, 1);
    const selectedData = selected.map((select, selectIndex) => {
      const vdom = this.optionMap[select];
      const text = vdom ? vdom.props.children : '';
      return {
        text,
        value: select,
        index: selectIndex,
      };
    });
    this.props.onChange(selected, selectedData);
  }

  render() {
    const { props } = this;
    const {
      prefixCls,
      placeholder,
      isRadius,
      isDisabled,
      isSearch,
      size,
      style,
      zIndex,
      multiple,
      getPopupContainer,
      locale,
    } = props;

    const disabled = 'disabled' in props || isDisabled;
    const radius = 'radius' in props || isRadius;
    const search = 'search' in props || isSearch;

    let placeholderText = placeholder || locale!.placeholder;

    let valueText;
    if (multiple && Array.isArray(this.state.value)) {
      valueText = this.state.value.reduce((prev: any, item) => {
        if (this.optionMap[item]) {
          prev.push({
            key: item,
            value: this.optionMap[item].props.children,
          });
        }
        return prev;
      }, []);
    } else {
      let optionProps = this.optionMap[this.state.value as string];
      if (optionProps) {
        valueText = optionProps.props.children;
      }
    }
    const children = React.Children.map(props.children, (option, index) => {
      if (option && typeof option === 'object') {
        if (
          search &&
          option.props.children.toString().indexOf(this.state.searchValue) < 0
        ) {
          return null;
        }
        let propsValue = String(option.props.value);
        const checked = multiple ? this.state.value.indexOf(propsValue) > -1 : this.state.value === propsValue;
        return (
          <Option
            {...option.props}
            showCheckIcon
            onChange={e => this.onOptionChange(e, option.props, index)}
            checked={checked}
          />
        );
      }
      return null;
    });

    const menuStyle = {
      maxHeight: 250,
      overflow: 'auto',
    };

    const menus =
      children && children.length > 0 ? (<Menu size={size} style={menuStyle}>{children}</Menu>)
        : (<span className={`${prefixCls}-notfound`}>{locale!.noMatch}</span>);

    return (
      <Dropdown
        triggerBoxStyle={style}
        disabled={disabled}
        visible={this.state.dropdown}
        isRadius={radius}
        overlay={menus}
        zIndex={zIndex}
        getPopupContainer={getPopupContainer}
        onVisibleChange={(visible) => {
          if (visible === true) {
            this.setState({ dropdown: visible, searchValue: '' });
          } else {
            this.setState({ dropdown: visible });
          }
        }}
      >
        <InputWithTags
          radius={radius}
          size={size}
          disabled={disabled}
          ref={this.inputWithTagsRef}
          style={style}
          searchValue={this.state.searchValue}
          search={search}
          active={this.state.dropdown}
          value={valueText}
          placeholder={placeholderText}
          onDeleteTag={this.onDeleteTag}
          onSearchChange={(e) => {
            this.setState({
              searchValue: (e.target as HTMLDivElement).textContent,
            });
          }}
        />
      </Dropdown>

    );
  }
}

export default LocaleReceiver(Select, 'Select');
