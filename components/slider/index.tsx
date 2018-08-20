import React, { Component } from 'react';
import classnames from 'classnames';
import domUtil from '../utils/dom';
import PropsType from './PropsType';

const noop = () => {};

class Slider extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-slider',
    min: 0,
    step: 1,
    defaultValue: 0,
    showTip: true,
    tipAlwayShow: false,
    handleAmount: 1,
    isRound: false,
    isSolid: false,
    isRange: false,
    isPass: true,
    theme: 'default',
    styleWidth: 200,
    rangeColor: '',
    customCls: '',
    getValue: () => {},
  };

  private draggingPayload;
  private offsetLeft;
  private isTouchSuported;
  private sliderBody;
  private removeTransition;

  constructor(props) {
    super(props);
    const { handleAmount } = this.props;
    const states = {};
    let i = 0;
    while (i < handleAmount) {
      states[`currentValue${i}`] = 0;
      i++;
    }
    this.state = states;

    this.onHandleDown = this.onHandleDown.bind(this);
    this.onHandleMove = this.onHandleMove.bind(this);
    this.onHandleUp = this.onHandleUp.bind(this);
    this.clickhandler = this.clickhandler.bind(this);

    this.draggingPayload = {
      isDragging: false,
      prevX: 0,
      isThreshhold: false, // 是否到达阈值
      handleMove: undefined, // 记录匿名函数的指针
      handleUp: undefined, // 记录匿名函数的指针
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const {
        min, max, handleAmount, defaultValue,
      } = this.props;
      const states = {};
      let i = 0;
      const dv = this.isArray(defaultValue) ? defaultValue : [defaultValue];

      while (i < handleAmount) {
        if (dv[i] === undefined) {
          dv[i] = min;
        }
        states[`currentValue${i}`] = this.validateDefault(dv[i], min, max);
        i++;
      }
      this.setState(states);
    }, 0);

    this.offsetLeft = domUtil.getLeft(this.sliderBody);
    this.isTouchSuported = domUtil.probTouch();
  }

  componentWillReceiveProps(nextProps) {
    setTimeout(() => {
      const {
        min, max, handleAmount, defaultValue,
      } = nextProps;
      const states = {};
      let i = 0;
      const dv = this.isArray(defaultValue) ? defaultValue : [defaultValue];

      while (i < handleAmount) {
        if (dv[i] === undefined) {
          dv[i] = min;
        }
        states[`currentValue${i}`] = this.validateDefault(dv[i], min, max);
        i++;
      }
      this.setState(states);
    }, 0);
  }

  onHandleDown(i) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      const addBodyListener = document.body.addEventListener.bind(
        document.body,
      );

      this.draggingPayload.handleMove = this.onHandleMove(i);
      this.draggingPayload.handleUp = this.onHandleUp();

      if (!this.isTouchSuported) {
        addBodyListener('mousemove', this.draggingPayload.handleMove, false);
        addBodyListener('mouseup', this.draggingPayload.handleUp, false);
      } else {
        addBodyListener('touchmove', this.draggingPayload.handleMove, false);
        addBodyListener('touchend', this.draggingPayload.handleUp, false);
      }
      // 移除初始化时的transition效果，否则会影响slider的推动
      this.removeTransition = true;
      this.draggingPayload.isDragging = true;
      this.draggingPayload.prevX = this.isTouchSuported
        ? e.touches[0].clientX
        : e.clientX;
    };
  }

  onHandleMove(i) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();

      if (this.draggingPayload.isDragging) {
        const {
          min, max, step, styleWidth, getValue, isPass,
        } = this.props;
        const mouseMovedDist =
          (this.isTouchSuported && e.touches && e.touches[0]
            ? e.touches[0].clientX
            : e.clientX) - this.draggingPayload.prevX;

        const percent = mouseMovedDist / (styleWidth || 200);
        const value = percent * (max - min);
        if (Math.abs(value) >= step) {
          // 寻找最接近value的step倍数
          const closestStepToValue = Math.round(value / step) * step;
          const newValue = this.state[`currentValue${i}`] + closestStepToValue;

          if (!isPass && this.isHandleMeet(i, newValue)) {
            return;
          }

          this.draggingPayload.prevX =
            this.isTouchSuported && e.touches && e.touches[0]
              ? e.touches[0].clientX
              : e.clientX;
          if (newValue <= max && newValue >= min) {
            if (getValue) {
              getValue(newValue, i);
            }
            this.draggingPayload.isThreshhold = false;
            this.setState({
              [`currentValue${i}`]: newValue,
            });
          } else if (newValue > max && !this.draggingPayload.isThreshhold) {
            if (getValue) {
              getValue(max, i);
            }
            this.draggingPayload.isThreshhold = true;
            this.setState({
              [`currentValue${i}`]: max,
            });
          } else if (newValue < min && !this.draggingPayload.isThreshhold) {
            if (getValue) {
              getValue(min, i);
            }
            this.draggingPayload.isThreshhold = true;
            this.setState({
              [`currentValue${i}`]: min,
            });
          }
        }
      }
    };
  }

  onHandleUp() {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      const removeBodyListener = document.body.removeEventListener.bind(
        document.body,
      );

      if (!this.isTouchSuported) {
        removeBodyListener('mousemove', this.draggingPayload.handleMove, false);
        removeBodyListener('mouseup', this.draggingPayload.handleUp, false);
      } else {
        removeBodyListener('touchmove', this.draggingPayload.handleMove, false);
        removeBodyListener('touchend', this.draggingPayload.handleUp, false);
      }
      // fix ‘click event triggered after mouseup’ bug
      setTimeout(() => {
        this.draggingPayload.isDragging = false;
      }, 0);
    };
  }

  clickhandler(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.draggingPayload.isDragging) {
      return;
    }

    this.removeTransition = false;
    const {
      min, max, step, styleWidth, getValue,
    } = this.props;
    // 此处用pageX,兼容有x轴滚动条的情况
    const mouseLeft = e.pageX - this.offsetLeft;
    if (mouseLeft < 0 || mouseLeft > (styleWidth || 200)) {
      return;
    }
    const percent = mouseLeft / (styleWidth || 200);
    const value = Math.floor(percent * (max - min)) + min;

    // 寻找最接近的handle的value值
    const closestHandleValue = this.findClosestHandle(value);
    const handleIndex = this.findHandleIndex(this.state, closestHandleValue);

    const delta = value - closestHandleValue;
    if (Math.abs(delta) >= step) {
      const closestStepToDelta = Math.round(delta / step) * step;
      if (getValue) {
        getValue(
          this.state[`currentValue${handleIndex}`] + closestStepToDelta,
          handleIndex,
        );
      }
      this.setState({
        [`currentValue${handleIndex}`]:
          this.state[`currentValue${handleIndex}`] + closestStepToDelta,
      });
    }
  }

  // eslint-disable-next-line
  validateDefault(defaultValue, min, max) {
    // eslint-disable-next-line
    return defaultValue < min ? min : defaultValue > max ? max : defaultValue;
  }

  // eslint-disable-next-line
  isArray(ele) {
    return Object.prototype.toString.call(ele) === '[object Array]';
  }

  findClosestHandle(value) {
    let stateKeys = Object.keys(this.state);
    let states = stateKeys.map(v => this.state[v]);
    /* eslint-disable */
    return states.reduce((pre, cur) => (value > Math.max(pre, cur)
      ? Math.max(pre, cur)
      : value < Math.min(pre, cur)
        ? Math.min(pre, cur)
        : Math.abs(value - pre) < Math.abs(value - cur)
          ? pre
          : cur), this.state[`currentValue${0}`]);
    /* eslint-enable */
  }

  findHandleIndex(state, v) {
    let states = Object.keys(state);
    states = states.map(value => this.state[value]);
    return states.indexOf(v);
  }

  // 判断handle是否互相接触
  isHandleMeet(index, value) {
    const { max, min } = this.props;
    let stateKeys = Object.keys(this.state);
    // tslint:disable-next-line:no-shadowed-variable
    let states = stateKeys.map(v => this.state[v]);
    states.sort((a, b) => a - b);

    const v = this.state[`currentValue${index}`];
    const vIndex = states.indexOf(v);
    const vMax = states[vIndex + 1] ? states[vIndex + 1] : max;
    const vMin = states[vIndex - 1] ? states[vIndex - 1] : min;
    return !(value > vMin && value < vMax);
  }

  render() {
    const {
      prefixCls,
      min,
      max,
      styleWidth,
      isRound,
      isSolid,
      showTip,
      tipAlwayShow,
      customCls,
      theme,
      handleAmount,
      isRange,
      rangeColors,
    } = this.props;

    const styleWidthObj = {
      width: `${styleWidth || 200}px`,
    };
    const tipClass = classnames({
      [`${prefixCls}-tip`]: true,
      [`${prefixCls}-tip-show`]: tipAlwayShow,
    });
    const customClass = classnames({
      [`${prefixCls}-wraper`]: true,
      [customCls!]: !!customCls,
      round: 'round' in this.props || isRound,
      solid: 'solid' in this.props || isSolid,
      [`theme-${theme}`]: !!theme,
    });

    const transitionArray = [
      'WebkitTransition',
      'MozTransition',
      'msTransition',
      'OTransition',
      'Transition',
    ];

    // eslint-disable-next-line
    const rangeColorArray = rangeColors
      ? this.isArray(rangeColors)
        ? rangeColors
        : [rangeColors]
      : ['#fff', '#eee'];

    const handles: React.ReactNode[] = [];
    let i = 0;
    let styleObjArr;
    while (i < handleAmount) {
      const percent = (this.state[`currentValue${i}`] - min) / (max - min) * 100;

      styleObjArr = {
        handle: { left: `${percent}%` },
        back: {
          width: `${percent}%`,
          backgroundColor: isRange && rangeColorArray[i],
          zIndex: 10 - i,
        },
      };
      if (!this.removeTransition) {
        // eslint-disable-next-line
        transitionArray.forEach((transition) => {
          styleObjArr.handle[transition] = 'left 0.6s ease-out';
          styleObjArr.back[transition] = 'width 0.6s ease-out';
        });
      }

      handles.push(
        <div key={`handleBack${i}`}>
          <div
            key={`Back${i}`}
            className={`${prefixCls}-back`}
            style={styleObjArr.back}
          />
          <span
            key={`handle${i}`}
            className={`${prefixCls}-handle`}
            style={styleObjArr.handle}
            onMouseDown={!this.isTouchSuported ? this.onHandleDown(i) : noop}
            onMouseMove={!this.isTouchSuported ? this.onHandleMove(i) : noop}
            onMouseUp={!this.isTouchSuported ? this.onHandleUp() : noop}
            onClick={e => e.stopPropagation()}
            onTouchStart={this.isTouchSuported ? this.onHandleDown(i) : noop}
            onTouchMove={this.isTouchSuported ? this.onHandleMove(i) : noop}
            onTouchEnd={this.isTouchSuported ? this.onHandleMove(i) : noop}
          >
            {showTip && (<em className={tipClass}>{this.state[`currentValue${i}`]}</em>)}
          </span>
        </div>,
      );
      i++;
    }

    return (
      <div className={customClass}>
        <div
          className={`${prefixCls}-horizontal`}
          style={styleWidthObj}
          ref={(sliderBody) => { this.sliderBody = sliderBody; }}
          onClick={this.clickhandler}
        >
          {handles}
        </div>
      </div>
    );
  }
}

export default Slider;
