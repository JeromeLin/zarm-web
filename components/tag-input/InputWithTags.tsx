import React from 'react';
import cn from 'classnames';
import debounce from '../utils/debounce';
import Tag from '../tag';
import Icon from '../icon';
import Tooltip from '../tooltip';

import PropsType, { ValueArray } from './PropsType';

const sizeValue = {
  xs: 24,
  sm: 28,
  lg: 36,
  xl: 40,
};

const Style = {
  tagStyle: { maxWidth: '100%' },
  iconStyle: { fontSize: 'initial' },
};

type BasicProps = React.HTMLAttributes<HTMLDivElement> & PropsType;

class InputWithTags extends React.Component<BasicProps> {
  inputDiv: HTMLDivElement;
  tagListBox: HTMLDivElement;
  isComposition: boolean;
  debouncedOnInputChange: any;

  state = {
    isFocus: false,
    compositionData: null,
  };

  constructor(props) {
    super(props);
    this.debouncedOnInputChange = () => {
      if (!this.isComposition) {
        debounce(this.onInput, 300, false);
      }
    }
  }

  onInput = (value) => {
    if (this.props.disabled || this.isComposition) {
      return;
    }
    if (typeof this.props.onSearchChange === 'function') {
      this.props.onSearchChange(value);
    }
  }

  onFocus = () => {
    this.setState({
      isFocus: true,
    });
  }

  onBlur = () => {
    this.setState({
      isFocus: false,
    });
  }

  componentWillReceiveProps(nextProps: BasicProps) {
    if (nextProps.active !== this.props.active) {
      // work without disabled and search prop;
      if (!nextProps.disabled && (nextProps.search || nextProps.remoteSearch)) {
        if (nextProps.active) {
          this.inputDiv.focus();
        } else {
          this.inputDiv.innerText = '';
        }
      }
    }
  }

  tagListBoxref = (e) => {
    this.tagListBox = e;
  }

  onTagBoxClick = () => {
    const { active, search, remoteSearch, value } = this.props;
    if (active && (search || remoteSearch) && Array.isArray(value)) {
      this.inputDiv.focus();
    }
  }

  onCompositionStart = () => {
    this.isComposition = true;
  }

  onCompositionUpdate = (e: React.CompositionEvent<HTMLDivElement>) => {
    this.setState({
      compositionData: e.data,
    });
  }

  onCompositionEnd = (value) => {
    this.isComposition = false;
    this.setState({
      compositionData: null,
    });
    const isChrome = navigator.userAgent.indexOf('Chrome') > -1;
    if (!this.isComposition && isChrome) {
      this.onInput(value);
    }
  }

  render() {
    const { search, remoteSearch, value, searchValue, placeholder, active, onDeleteTag, onSearchChange, size, tagTheme,
      radius, disabled, ...others } = this.props;
    const { compositionData, isFocus } = this.state;
    let showPlaceHolder = false;
    if (
      (((search || remoteSearch) && !isFocus && value === null) ||
        (typeof value === 'string' && value.length === 0)) ||
      !value
      && !compositionData
    ) {
      showPlaceHolder = true;
    }

    const searchValueStyle = { display: isFocus && searchValue ? 'none' : 'inline-block' };

    let tagSizeHeight: number = (size ? sizeValue[size] : 32) - 10;

    let tagList;

    // if value is array, make a Tag list;
    if (Array.isArray(value)) {
      tagList = (value as Array<ValueArray>).map((elem, index) => {
        const tag = (
          <Tag
            isDisabled={disabled}
            theme={tagTheme}
            title={Array.isArray(elem.value) ? elem.value.join('') : String(elem.value)}
            style={{ ...Style.tagStyle, height: tagSizeHeight, lineHeight: tagSizeHeight + 'px' }}
            isRadius={radius}
            key={elem.key}
            onClose={(e) => {
              e.stopPropagation();
              if (typeof onDeleteTag === 'function') {
                setTimeout(() => {
                  onDeleteTag(e, elem.key, elem.value, index);
                });
              }
            }}
          >
            {elem.value}
          </Tag>
        );
        return (
          <div
            className="ui-tag-list-box"
            key={elem.key}
            ref={this.tagListBoxref}
          >
            {
              elem.title ? (
                <Tooltip title={elem.title}>
                  {tag}
                </Tooltip>
              ) : tag
            }
          </div >
        );
      });
    } else {
      tagList = (
        <div title={value as string} style={searchValueStyle} className="value-text">
          {compositionData || value}
        </div>
      );
    }

    const boxCls = cn({
      'ui-tag-input-box': true,
      'radius': radius,
      'ui-tag-input-box-active': active,
      'disabled': disabled,
      [`size-${size}`]: !!size,
    });

    return <div
      className={boxCls}
      onClick={this.onTagBoxClick}
      {...others}
    >
      {tagList}
      {
        (search || remoteSearch) && <div
          className="ui-tag-input-div"
          contentEditable={!disabled && (search || remoteSearch)}
          onInput={(e) => { this.debouncedOnInputChange((e.target as HTMLDivElement).textContent); }}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onCompositionStart={this.onCompositionStart}
          onCompositionUpdate={this.onCompositionUpdate}
          onCompositionEnd={(e) => { this.onCompositionEnd((e.target as HTMLDivElement).textContent); }}
          ref={(e) => { this.inputDiv = e as HTMLDivElement; }}
        />
      }
      {showPlaceHolder && <span style={searchValueStyle} className="ui-tag-input-div-placeholder">{placeholder}</span>}
      <Icon style={Style.iconStyle} className="arrow-bottom" type="arrow-bottom" />
    </div>;
  }
}

export default InputWithTags;
