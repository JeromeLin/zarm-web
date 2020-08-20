import React from 'react';
import cn from 'classnames';
import debounce from '../utils/debounce';
import Tag from '../tag';
import Icon from '../icon';

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

  debouncedOnInputChange: any;

  state = {
    isFocus: false,
    compositionData: null,
  };

  constructor(props) {
    super(props);
    this.debouncedOnInputChange = debounce(this.onInput, 0, false);
  }

  componentWillReceiveProps(nextProps: BasicProps) {
    const { active } = this.props;
    if (nextProps.active !== active) {
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

  onInput = (value) => {
    if (this.props.disabled || this.isComposition) {
      return;
    }
    if (typeof this.props.onSearchChange === 'function') {
      this.props.onSearchChange(value);
    }
  };

  onFocus = () => {
    console.log(111);
    this.setState({
      isFocus: true,
    });
  };

  onBlur = () => {
    this.setState({
      isFocus: false,
    });
  };

  tagListBoxref = (e) => {
    this.tagListBox = e;
  };

  onTagBoxClick = () => {
    const { active, search, remoteSearch, value } = this.props;
    if (active && (search || remoteSearch) && Array.isArray(value)) {
      this.inputDiv.focus();
    }
  };

  onCompositionStart = () => {
    this.isComposition = true;
  };

  onCompositionUpdate = (e: React.CompositionEvent<HTMLDivElement>) => {
    this.setState({
      compositionData: e.data,
    });
  };

  onCompositionEnd = (value) => {
    this.isComposition = false;
    this.setState({
      compositionData: null,
    });
    this.onInput(value);
  };

  render() {
    const {
      search, remoteSearch, value, searchValue, placeholder, active, onDeleteTag, onSearchChange, size,
      radius, disabled, tagTheme, ...others
    } = this.props;
    const { compositionData, isFocus } = this.state;
    let showPlaceHolder = false;
    if (
      ((((search || remoteSearch) && !isFocus && value === null)
      || (typeof value === 'string' && value.length === 0))
      // eslint-disable-next-line no-mixed-operators
      || ((Array.isArray(value) && value.length === 0))
      || !value)
      // eslint-disable-next-line no-mixed-operators
      && !compositionData
    ) {
      showPlaceHolder = true;
    }

    const searchValueStyle = { display: isFocus && searchValue ? 'none' : 'inline-block' };

    const tagSizeHeight: number = (size ? sizeValue[size] : 32) - 10;

    let tagList;

    // if value is array, make a Tag list;
    if (Array.isArray(value)) {
      tagList = (value as Array<ValueArray>).map((elem, index) => {
        return (
          <div
            className="zw-tag-list-box"
            key={elem.key}
            ref={this.tagListBoxref}
          >
            <Tag
              style={{ ...Style.tagStyle, height: tagSizeHeight, lineHeight: `${tagSizeHeight}px` }}
              key={elem.key}
              closable
              onClick={() => {}}
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
          </div>
        );
      });
    } else {
      tagList = (
        <div style={searchValueStyle} className="value-text">
          {compositionData || value}
        </div>
      );
    }

    const boxCls = cn({
      'zw-tag-input-box': true,
      'is-radius': radius,
      'zw-tag-input-box--active': active,
      'is-disabled': disabled,
      [`size-${size}`]: !!size,
    });

    return (
      <div className={boxCls} onClick={this.onTagBoxClick} {...others}>
        {tagList}
        {(search || remoteSearch) && (
          <div
            className="zw-tag-input__div"
            contentEditable={!disabled && (search || remoteSearch)}
            onInput={(e) => {
              this.debouncedOnInputChange(
                (e.target as HTMLDivElement).textContent,
              );
            }}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onCompositionStart={this.onCompositionStart}
            onCompositionUpdate={this.onCompositionUpdate}
            onCompositionEnd={(e) => {
              this.onCompositionEnd((e.target as HTMLDivElement).textContent);
            }}
            ref={(e) => {
              this.inputDiv = e as HTMLDivElement;
            }}
          />
        )}
        {showPlaceHolder && (
          <span
            style={searchValueStyle}
            className="zw-tag-input__div-placeholder"
          >
            {placeholder}
          </span>
        )}
        <Icon
          style={Style.iconStyle}
          className="arrow-bottom"
          type="arrow-bottom"
        />
      </div>
    );
  }
}

export default InputWithTags;
