import React, { Component, cloneElement, Children, ReactElement } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

class Swipe extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-swipe',
    direction: 'left',
    height: 160,
    activeIndex: 0,
    speed: 300,
    autoPlay: true,
    autoPlayIntervalTime: 3000,
    moveDistanceRatio: 0.5,
    moveTimeSpan: 300,
  };

  private moveInterval;

  private swipeItems;

  constructor(props) {
    super(props);
    this.moveInterval = null;
    this.state = {
      items: [],
      activeIndex: props.activeIndex,
      translateX: 0,
      pointStart: 0,
      pointEnd: 0,
      timeStart: new Date(),
    };
  }

  componentWillMount() {
    this.parseItem(this.props.children);
  }

  componentDidMount() {
    // 监听窗口变化
    window.addEventListener('resize', () => this._updateResize());

    // 设置起始位置编号
    this.onJumpTo(this.props.activeIndex);
  }

  componentWillReceiveProps(nextProps) {
    if ('children' in nextProps) {
      this.parseItem(nextProps.children);
    }
  }

  componentWillUpdate() {
    setTimeout(this._transitionEnd.bind(this), this.props.speed);
  }

  componentWillUnmount() {
    // 自动轮播结束
    this.pauseAutoPlay();
    // 移除监听窗口变化
    window.removeEventListener('resize', () => this._updateResize());

    // if (this.transitionEvents) {
    //   this.transitionEvents.remove();
    // }
  }

  // 滑动到指定编号
  onSlideTo(index) {
    this._onMoveTo(index, this.props.speed);
  }

  // 静默跳到指定编号
  onJumpTo(index) {
    this._onMoveTo(index, 0);
  }

  parseItem(children) {
    if (children.length === 0) {
      return;
    }

    // 增加头尾拼接节点
    const items = [].concat(children);
    const firstItem = items[0];
    const lastItem = items[items.length - 1];
    items.push(firstItem);
    items.unshift(lastItem);

    // 节点追加后重排key
    const newItems = React.Children.map(items, (element, index) => cloneElement(element as ReactElement<any>, {
      key: index,
    }));

    this.setState({
      items: newItems,
    });

    // 自动轮播开始
    if (!this.moveInterval) {
      this.startAutoPlay();
    }
  }

  // 自动轮播开始
  startAutoPlay() {
    this.moveInterval =
      this.props.autoPlay &&
      setInterval(() => {
        let { activeIndex } = this.state;
        const maxLength = React.Children.count(this.props.children);

        activeIndex =
          ['left', 'top'].indexOf(this.props.direction) > -1
            ? activeIndex + 1
            : activeIndex - 1;

        if (activeIndex > maxLength - 1) {
          activeIndex = 0;
          this.onJumpTo(-1);
          this.onSlideTo(activeIndex);
        } else if (activeIndex < 0) {
          activeIndex = maxLength - 1;
          this.onJumpTo(maxLength);
          this.onSlideTo(activeIndex);
        } else {
          this.onSlideTo(activeIndex);
        }
        this.onSlideTo(activeIndex);
      }, this.props.autoPlayIntervalTime);
  }

  // 暂停自动轮播
  pauseAutoPlay() {
    if (this.moveInterval) {
      clearInterval(this.moveInterval);
    }
  }

  // 更新窗口变化的位置偏移
  _updateResize() {
    this.onJumpTo(this.props.activeIndex);
  }

  // 移动到指定编号
  _onMoveTo(index, speed) {
    const dom = this.swipeItems;
    const px = this._isDirectionX()
      ? -dom.offsetWidth * (index + 1)
      : -dom.offsetHeight * (index + 1);

    this._doTransition(dom, px, speed);

    this.setState({
      activeIndex: index,
      translateX: px,
    });
  }

  // 执行过渡动画
  _doTransition(dom, offset, duration) {
    let x = 0;
    let y = 0;

    if (this._isDirectionX()) {
      x = offset;
    } else {
      y = offset;
    }

    dom.style.webkitTransitionDuration = `${duration}ms`;
    dom.style.mozTransitionDuration = `${duration}ms`;
    dom.style.oTransitionDuration = `${duration}ms`;
    dom.style.transitionDuration = `${duration}ms`;
    dom.style.webkitTransform = `translate3d(${x}px, ${y}px, 0)`;
    dom.style.mozTransform = `translate3d(${x}px, ${y}px, 0)`;
    dom.style.oTransform = `translate3d(${x}px, ${y}px, 0)`;
    dom.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  _transitionEnd() {
    const { activeIndex } = this.state;
    const maxLength = React.Children.count(this.props.children);

    if (activeIndex > maxLength - 1) {
      this.onJumpTo(0);
    } else if (activeIndex < 0) {
      this.onJumpTo(maxLength - 1);
    }
  }

  // 触屏事件
  _onTouchStart(event) {
    this.pauseAutoPlay();

    const pointX = this._getCurrentPoint(event);
    const { activeIndex } = this.state;
    const maxLength = React.Children.count(this.props.children);

    // 跳转到头尾
    if (activeIndex <= 0) {
      this.onJumpTo(0);
    } else if (activeIndex >= maxLength - 1) {
      this.onJumpTo(maxLength - 1);
    }

    this.setState({
      pointStart: pointX,
      timeStart: new Date(),
    });
  }

  _onTouchMove(event) {
    event.preventDefault();

    const pointX = this._getCurrentPoint(event);
    const px = this.state.translateX + (pointX - this.state.pointStart);
    const dom = this.swipeItems;

    this._doTransition(dom, px, 0);
    this.setState({
      pointEnd: pointX,
    });
  }

  _onTouchEnd() {
    const px =
        this.state.pointEnd !== 0
          ? this.state.pointEnd - this.state.pointStart
          : 0;
    const timeSpan = new Date().getTime() - this.state.timeStart.getTime();
    const dom = this.swipeItems;

    let { activeIndex } = this.state;

    // 判断滑动临界点
    // 1.滑动距离比超过moveDistanceRatio
    // 2.滑动释放时间差低于moveTimeSpan
    if (
      Math.abs(px / dom.offsetWidth) >= this.props.moveDistanceRatio ||
      timeSpan <= this.props.moveTimeSpan
    ) {
      activeIndex =
        px > 0 ? this.state.activeIndex - 1 : this.state.activeIndex + 1;

      this.onSlideTo(activeIndex);
    } else {
      this.onSlideTo(activeIndex);
    }

    // dom.removeEventListener("transitionend", () => this._aaa());

    // 恢复自动轮播
    this.startAutoPlay();

    this.setState({
      pointStart: 0,
      pointEnd: 0,
      activeIndex,
    });
  }

  // 获取鼠标/触摸点坐标
  _getCurrentPoint(event, type?) {
    const touch = type === 'mouse' ? event : event.touches[0];

    const offset = this._isDirectionX() ? touch.pageX : touch.pageY;
    return offset;
  }

  // 是否横向移动
  _isDirectionX() {
    const dir =
      ['left', 'right'].indexOf(this.props.direction) > -1;
    return dir;
  }

  render() {
    const {
      className, height, children, style: wrapperStyle, prefixCls,
    } = this.props;

    const classes = classnames({
      [prefixCls!]: true,
      [className!]: !!className,
    });

    type styleType = { items: { [propName: string]: any }, pagination: { [propName: string]: any } };
    const style: styleType = {
      items: {},
      pagination: {},
    };

    if (!this._isDirectionX()) {
      style.items.height = height;
      style.pagination.marginTop = 3;
    } else {
      style.items.whiteSpace = 'nowrap';
      style.pagination.display = 'inline-block';
      style.pagination.marginRight = 3;
    }

    return (
      <div className={classes} style={wrapperStyle}>
        <div
          ref={(swipeItems) => { this.swipeItems = swipeItems; }}
          className={`${prefixCls}-items`}
          style={style.items}
          onTouchStart={event => this._onTouchStart(event)}
          onTouchMove={event => this._onTouchMove(event)}
          onTouchEnd={_ => this._onTouchEnd()}
        >
          {this.state.items}
        </div>
        <div className={`${prefixCls}-pagination`}>
          <ul>
            {
              // tslint:disable-next-line:jsx-no-multiline-js
              Children.map(children, (_, index) => (
              <li
                key={`pagination-${index}`}
                // tslint:disable-next-line:jsx-no-multiline-js
                className={classnames({
                  // eslint-disable-next-line
                  // tslint:disable-next-line:triple-equals
                  active: index == this.state.activeIndex,
                })}
                style={style.pagination}
                onClick={() => this.onSlideTo(index)}
              />
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Swipe;
