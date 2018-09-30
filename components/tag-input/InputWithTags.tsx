import React, { UIEvent } from 'react';
import Tag from '../tag';
import Icon from '../icon';
import cn from 'classnames';

import PropsType, { ValueArray } from './PropsType';

const sizeValue = {
  xs: 24,
  sm: 28,
  lg: 36,
  xl: 40,
};

const Style = {
  tagStyle: { maxWidth: 100 },
  iconStyle: { fontSize: 'initial' },
};

type BasicProps = React.HTMLAttributes<HTMLDivElement> & PropsType;

class InputWithTags extends React.Component<BasicProps> {
  inputDiv: HTMLDivElement;
  tagListBox: HTMLDivElement;
  isComposition: boolean;

  onInput = (e: UIEvent<HTMLDivElement>) => {
    if (this.props.disabled || this.isComposition) {
      return;
    }
    if (typeof this.props.onSearchChange === 'function') {
      this.props.onSearchChange(e);
    }
  }

  componentWillReceiveProps(nextProps: BasicProps) {
    if (nextProps.active !== this.props.active) {
      // work without disabled and search prop;
      if (!nextProps.disabled && nextProps.search) {
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
    const { active, search, value } = this.props;
    if (active && search && Array.isArray(value)) {
      this.inputDiv.focus();
    }
  }

  onCompositionStart = () => {
    this.isComposition = true;
  }

  onCompositionEnd = (e) => {
    this.isComposition = false;
    this.onInput(e);
  }

  render() {
    const { search, value, searchValue, placeholder, active, onDeleteTag, onSearchChange, size, tagTheme,
      radius, disabled, ...others } = this.props;
    let showPlaceHolder = false;
    if (value == null || (typeof value === 'string' && value.length === 0)) {
      showPlaceHolder = true;
    }

    const searchValueStyle = { display: searchValue ? 'none' : 'inline-block' };

    let tagSizeHeight: number = (size ? sizeValue[size] : 32) - 10;

    let tagList;

    // if value is array, make a Tag list;
    if (Array.isArray(value)) {
      tagList = (value as Array<ValueArray>).map((elem, index) => {
        return (
          <div
            className="tag-list-box"
            key={elem.key}
            ref={this.tagListBoxref}
          >
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
          </div >
        );
      });
    } else {
      tagList = <div title={value as string} style={searchValueStyle} className="value-text">{value}</div>;
    }

    const boxCls = cn({
      'tag-input-box': true,
      'radius': radius,
      'tag-input-box-active': active,
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
        search && <div
          className="input-div"
          contentEditable={!disabled && search}
          onInput={this.onInput}
          onCompositionStart={this.onCompositionStart}
          onCompositionEnd={this.onCompositionEnd}
          ref={(e) => { this.inputDiv = e as HTMLDivElement; }}
        />
      }
      {showPlaceHolder && <span style={searchValueStyle} className="input-div-placeholder">{placeholder}</span>}
      <Icon style={Style.iconStyle} className="arrow-bottom" type="arrow-bottom" />
    </div>;
  }
}

export default InputWithTags;
