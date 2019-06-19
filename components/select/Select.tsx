import React, { Component, ReactNode, ReactElement } from 'react';
import classnames from 'classnames';
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
import { Icon } from '..';

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

function stringArray(data: React.ReactNode) {
  if (Array.isArray(data)) {
    if (data.every(item => typeof item === 'string' || typeof item === 'number')) {
      return data.join('');
    }
  }
  return data;
}

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
    clearable: false,
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

    React.Children.map(options, (option: ReactElement<OptionProps>) => {
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

  onOptionChange = (e) => {
    const { index } = e.currentTarget.dataset;
    const currentData = this.state.optionMap[index];
    if (!currentData) {
      return;
    }
    const props = currentData.props;
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

  handleKeyup = (e) => {
    if (this.state.dropdown === true && e.keyCode === 27) {
      this.setDropdown(false);
    }
  }

  bindOuterHandlers() {
    Events.on(document, 'keyup', this.handleKeyup);
  }

  unbindOuterHandlers() {
    Events.off(document, 'keyup', this.handleKeyup);
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

  filterCondition(option, optionIndex: number) {
    if (this.props.search && this.state.searchValue) {
      return String(option.props.children).includes(this.state.searchValue);
    } else { // remoteSearch会走此处逻辑
      return optionIndex > -1;
    }
  }
  renderChildren() {
    const { optionData, value } = this.state;
    const children: Array<ReactNode> = [];
    for (let i = 0; i < optionData.length; i++) {
      const elem = optionData[i];
      if (this.filterCondition(elem, i)) {
        const checked = Array.isArray(value) ? value.indexOf(String(elem.value)) > -1 : String(elem.value) === value;
        const childrenText = stringArray(elem.children);
        children.push(
          <Option
            {...elem.props}
            key={elem.value}
            showCheckIcon={checked}
            checked={checked}
            data-index={elem.value}
            onChange={this.onOptionChange}
          >
            {childrenText}
          </Option>);
      }
    }
    return children;
  }

  onClearBtnClick: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    this.setState({
      value: '',
      searchValue: '',
    }, () => {
      if (this.props.onChange) {
        this.props.onChange({
          value: '',
          text: '',
          index: 0,
        });
      }
      // TODO not able to make a input event
      // if (this.props.isSearch && this.props.onSearchChange) {
      //   this.props.onSearchChange(e);
      // }
    });
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
      tagTheme,
      style,
      zIndex,
      multiple,
      getPopupContainer,
      locale,
      remoteSearch,
      clearable,
      triggerProps,
    } = props;

    const triggerBoxStyle: React.CSSProperties = { ...style, position: 'relative' };

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

    const menuStyle = {
      maxHeight: 250,
      overflow: 'auto',
    };

    const children = this.renderChildren();
    const menus =
      children && children.length > 0
        ? <Menu style={menuStyle}>{children}</Menu>
        : <span className={`${prefixCls}-notfound`}>{locale!.noMatch}</span>;

    const triggerBoxProps = triggerProps ? {
      ...triggerProps,
      className: classnames({
        [`${triggerProps.className}`]: !!triggerProps.className,
        [`${prefixCls}-trigger-box`]: true,
      }),
    } : {
        className: classnames({
          [`${prefixCls}-trigger-box`]: true,
        }),
      };

    return (
      <Dropdown
        triggerBoxStyle={triggerBoxStyle}
        triggerProps={triggerBoxProps}
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
        {
          clearable && !disabled && !multiple && <Icon
            type="wrong-round-fill"
            className={`clear-btn${valueText ? ' clear-btn-show' : ''}`}
            onClick={this.onClearBtnClick}
          />
        }
      </Dropdown>
    );
  }
}

export default LocaleReceiver(Select, 'Select');
