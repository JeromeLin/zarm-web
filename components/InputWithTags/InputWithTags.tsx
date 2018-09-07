import React, { ReactNode } from 'react';
import Tag from '../Tag';
import Icon from '../Icon';
import cn from 'classnames';
import '../Tag/style';
import './index.scss';

interface ValueArray {
  key: any;
  value: ReactNode;
}

interface Props {
  search?: boolean;
  active?: boolean;
  placeholder?: string;
  searchValue?: string;
  radius?: boolean;
  value?: React.ReactNode | Array<ValueArray>;
  onDeleteTag?(key: any, value: React.ReactNode, index: number): void;
  onSearchChange(e: React.UIEvent<HTMLDivElement>): void;
}

class InputWithTags extends React.Component<Props> {
  didUpdateCallback: Array<() => void> = [];
  inputDiv: HTMLDivElement;
  constructor(props: Props) {
    super(props);
  }

  onInput = (e) => {
    if (typeof this.props.onSearchChange === 'function') {
      this.props.onSearchChange(e);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active) {
      this.inputDiv.focus();
    }
  }

  componentDidUpdate() {
    this.didUpdateCallback.forEach(fn => {
      fn();
    });
  }

  render() {
    const { search, value, searchValue, placeholder, active, onDeleteTag, radius } = this.props;
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
          >
            <Tag
              isRadius={radius}
              size="xs"
              key={elem.key}
              onClose={() => {
                if (typeof onDeleteTag === 'function') {
                  onDeleteTag(elem.key, elem.value, index);
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

    return <div className={boxCls}>
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
