import React, { Component, ReactNode, ReactElement } from 'react';
import Events from '../utils/events';
import { FormItemContext } from '../form/createContext';
import Option from './Option';
import Dropdown from '../dropdown';
import Menu from '../menu';
import InputWithTags from '../tag-input';
import PropsType, { OptionProps } from './PropsType';
import LocaleReceiver from '../locale/LocaleReceiver';
import SelectMultiple from './SelectMultiple';
import { isEmpty } from '../utils';

interface StateProps {
  value: string | string[];
  dropdown: boolean;
  searchValue: string | null;
  showPlacehoder: boolean;
  optionMap: { [x: string]: any, [y: number]: any };
  optionData: Array<OptionDataProps>;
}

interface OptionDataProps {
  props: OptionProps & { children?: ReactNode };
  key: any;
  value: string | number;
  children: ReactNode;
}

const EMPTY_STRING = '';
const EMPTY_STRING_VALUE = '$$EMPTY_STRING_VALUE';

/**
 * placeholder
 */
class Select extends Component<PropsType, StateProps> {
  static contextType = FormItemContext;
  static defaultProps = {
    prefixCls: 'ui-select',
    isRadius: true,
    isDisabled: false,
    isSearch: false,
    onSearchChange: () => { },
    onChange: () => { },
  };

  static Option: typeof Option;
  static Multiple: typeof SelectMultiple;

  inputBox!: HTMLInputElement;
  inputWithTags!: InputWithTags;
  oldInputDivHeight: number = 0;

  constructor(props: PropsType) {
    super(props);
    let value = props.value === undefined ? props.defaultValue : props.value;
    let state: StateProps = {
      value: String(value),
      dropdown: false,
      searchValue: '',
      showPlacehoder: true,
      optionMap: {},
      optionData: [],
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

    state.value = this.mapEmptyStringToEmptyValue(state.value);
    const [optionMap, optionData] = this.getOptionMap(this.props.children);
    state.optionMap = optionMap;
    state.optionData = optionData;
    this.state = state;
  }

  componentDidMount() {
    this.bindOuterHandlers();
  }

  getOptionMap(options: ReactNode): [{}, Array<any>] {
    if (!Array.isArray(options)) {
      options = [options];
    }

    let optionData: Array<OptionDataProps> = [];
    let optionMap: { [x: string]: any } = {};

    React.Children.map(options, (option: ReactElement) => {
      if (option && typeof option === 'object' && option.type) {
        let value = this.mapEmptyStringToEmptyValue(option.props.value);
        if (option.props && value) {
          // handle optionMap
          optionMap[value] = option;
          // handle OptionData
          optionData.push({
            key: option.key,
            props: option.props,
            value,
            children: option.props.children,
          });
        }
      }
      return optionMap;
    });
    return [optionMap, optionData];
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
      this.setState({
        value: this.mapEmptyStringToEmptyValue(value),
      });
    }
    if (nextProps.children !== this.props.children) {
      const [optionMap, optionData] = this.getOptionMap(nextProps.children);
      this.setState({
        optionData,
        optionMap,
      });
    }
  }

  componentWillUnmount() {
    this.unbindOuterHandlers();
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
    if (!isEmpty(this.context)) {
      this.context.handleFieldChange();
    }

    let value = String(props.value);

    if (this.props.multiple) {
      const selected = this.mapEmptyValueToEmptyString((this.state.value as Array<string>).slice());
      const position = selected.indexOf(value);
      if (position === -1) {
        selected.push(value);
      } else {
        selected.splice(position, 1);
      }
      const selectedData = selected.map((select) => {
        let selectValue = select || EMPTY_STRING_VALUE;
        const vdom = this.state.optionMap[selectValue];
        const text = vdom ? vdom.props.children : '';
        let index = this.state.optionData.findIndex(elem => String(elem.value) === String(selectValue));
        return { text, value: select, index };
      });
      this.setState({
        value: this.mapEmptyStringToEmptyValue(selected),
      }, () => {
        this.props.onChange(selected, selectedData);
      });
      return;
    }

    const selected = {
      index,
      value,
      text: Array.isArray(props.children) ? props.children.join() : props.children,
    };

    this.setState({
      value: this.mapEmptyStringToEmptyValue(value),
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

  mapEmptyStringToEmptyValue(values) {
    if (Array.isArray(values)) {
      return values.map((value) => {
        if (value === EMPTY_STRING) {
          return EMPTY_STRING_VALUE;
        }
        return value;
      });
    } else if (values === EMPTY_STRING) {
      return EMPTY_STRING_VALUE;
    }

    return values;
  }

  mapEmptyValueToEmptyString(selected) {
    return selected.map((select) => {
      if (select === EMPTY_STRING_VALUE) {
        return EMPTY_STRING;
      }
      return select;
    });
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
    const selected = this.mapEmptyValueToEmptyString((this.state.value as Array<string>).slice());
    selected.splice(index, 1);
    const selectedData = selected.map((select, selectIndex) => {
      const vdom = this.state.optionMap[select || EMPTY_STRING_VALUE];
      const text = vdom ? vdom.props.children : '';
      return {
        text,
        value: select,
        index: selectIndex,
      };
    });
    this.props.onChange(selected, selectedData);
  }

  onSearchValueChange = (value) => {
    const { onSearchChange } = this.props;
    // const textContent = (e.target as HTMLDivElement).textContent;

    this.setState({
      searchValue: value,
      dropdown: true,
    }, () => {
      if (typeof onSearchChange === 'function') {
        onSearchChange(this.state.searchValue);
      }
    });
  }

  render() {
    const { props } = this;
    const { searchValue } = this.state;
    const {
      prefixCls,
      placeholder,
      isRadius,
      isDisabled,
      isSearch,
      size,
      tagTheme,
      style,
      zIndex,
      multiple,
      getPopupContainer,
      locale,
      remoteSearch,
    } = props;

    const disabled = 'disabled' in props || isDisabled;
    const radius = 'radius' in props || isRadius;
    const search = 'search' in props || isSearch;

    let placeholderText = placeholder || locale!.placeholder;

    let valueText;
    if (multiple && Array.isArray(this.state.value)) {
      valueText = this.state.value.reduce((prev: any, item) => {
        if (this.state.optionMap[item]) {
          prev.push({
            key: item,
            value: this.state.optionMap[item].props.children,
          });
        }
        return prev;
      }, []);
    } else {
      let optionProps = this.state.optionMap[this.state.value as string];
      if (optionProps) {
        let optionChildren = optionProps.props.children;
        Array.isArray(optionChildren) ? valueText = optionChildren.join() : valueText = optionChildren;
      }
    }

    const { value } = this.state;
    const children: Array<ReactNode> = [];
    const filterCondition = (option, optionIndex: number) => {
      if (search && searchValue) {
        return String(option.props.children).includes(searchValue);
      } else { // remoteSearch会走此处逻辑
        return optionIndex > -1;
      }
    };
    this.state.optionData.filter(filterCondition).forEach((elem, index) => {
      const checked = Array.isArray(value) ? value.indexOf(String(elem.value)) > -1 : String(elem.value) === value;
      children.push(
        <Option
          key={elem.key || elem.value}
          showCheckIcon={checked}
          {...elem.props}
          checked={checked}
          onChange={(e) => {
            this.onOptionChange(e, elem.props, index);
          }}
        >
          {elem.children}
        </Option>,
      );
    });

    const menuStyle = {
      maxHeight: 250,
      overflow: 'auto',
    };

    const menus =
      children && children.length > 0
        ? <Menu size={size} style={menuStyle}>{children}</Menu>
        : <span className={`${prefixCls}-notfound`}>{locale!.noMatch}</span>;

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
          tagTheme={tagTheme}
          radius={radius}
          size={size}
          disabled={disabled}
          ref={this.inputWithTagsRef}
          style={style}
          searchValue={this.state.searchValue}
          search={search}
          remoteSearch={remoteSearch}
          active={this.state.dropdown}
          value={valueText}
          placeholder={placeholderText}
          onDeleteTag={this.onDeleteTag}
          onSearchChange={this.onSearchValueChange}
        />
      </Dropdown>
    );
  }
}

export default LocaleReceiver(Select, 'Select');
