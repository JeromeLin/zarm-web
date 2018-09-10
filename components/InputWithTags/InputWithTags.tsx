import React, { ReactNode, CSSProperties, MouseEvent } from 'react';
import Tag from '../tag';
import Icon from '../icon';
import cn from 'classnames';
import '../tag/style';
import './index.scss';

const Style = {
  tagStyle: { maxWidth: 80, backgroundColor: '#f0f0f0' },
};

interface ValueArray {
  key: any;
  value: ReactNode;
}

interface Props {
  style?: CSSProperties;
  search?: boolean;
  active?: boolean;
  placeholder?: string;
  searchValue?: string | null;
  radius?: boolean;
  value?: React.ReactNode | Array<ValueArray>;
  onDeleteTag?(e: MouseEvent, key: any, value: React.ReactNode, index: number): void;
  onSearchChange(e: React.ChangeEvent<HTMLDivElement>): void;
}

class InputWithTags extends React.Component<Props> {
  didUpdateCallback: Array<() => void> = [];
  inputDiv: HTMLDivElement;
  tagListBox: HTMLDivElement;
  constructor(props: Props) {
    super(props);
  }

  onInput = (e) => {
    if (typeof this.props.onSearchChange === 'function') {
      this.props.onSearchChange(e);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      if (nextProps.active) {
        this.inputDiv.focus();
      } else {
        this.inputDiv.innerText = '';
      }
    }
  }

  tagListBoxref = (e) => {
    this.tagListBox = e;
  }

  render() {
    const { search, value, searchValue, placeholder, active, onDeleteTag, radius, ...others } = this.props;
    let showPlaceHolder = true;
    if (typeof value === 'string' || Array.isArray(value)) {
      showPlaceHolder = value.length === 0;
    }

    const searchValueStyle = { display: searchValue ? 'none' : 'block' };

    let tagList;
    if (Array.isArray(value)) {
      tagList = (value as Array<ValueArray>).map((elem, index) => {
        return (
          <div
            className="tag-list-box"
            key={elem.key}
            ref={this.tagListBoxref}
          >
            <Tag
              title={typeof elem.value === 'string' ? elem.value : ''}
              style={Style.tagStyle}
              isRadius={radius}
              size="xs"
              key={elem.key}
              onClose={(e: MouseEvent) => {
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
      tagList = <div style={searchValueStyle} className="value-text">{value}</div>;
    }

    const boxCls = cn({
      'tag-input-box': true,
      'radius': radius,
      'tag-input-box-active': active,
    });

    return <div className={boxCls} {...others}>
      {tagList}
      <div
        className="input-div"
        contentEditable={search}
        onInput={this.onInput}
        ref={(e) => { this.inputDiv = e as HTMLDivElement; }}
      />
      {showPlaceHolder && <span style={searchValueStyle} className="input-div-placeholder">{placeholder}</span>}
      <Icon className="arrow-bottom" type="arrow-bottom" />
    </div >;
  }
}

export default InputWithTags;
