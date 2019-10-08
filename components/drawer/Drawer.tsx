import React, { PureComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { Popup } from 'zarm';

import throttle from '../utils/throttle';
import DrawerContext from './createDrawerContext';
import Icon from '../icon';
import events from '../utils/events';
import PropsType, { StateType } from './PropsType';

const BUTTONLAYER = 40;

class Drawer extends PureComponent<PropsType & HTMLAttributes<HTMLDivElement>, StateType> {
  static defaultProps = {
    direction: 'right',       // 抽屉的方向 top | right | bottom | lef
    closable: true,           // 是否显示右上角的关闭按钮
    size: 'normal',           // size
    mask: true,               // 是否展示遮罩
    visible: false,           // 抽屉是否可见
    maskClosable: false,      // 点击遮罩是否关闭
    prefixCls: 'zw-drawer',   // 样式前缀
    maskover: true,           // 是否重叠遮罩层背景
  };

  readonly state = {
    layer: 0,
    totallayers: 0,
    direction: this.props.direction,
    btnstyle: {},
    drawerWidth: 0, // 抽屉宽度
  };

  private parentDrawer: Drawer | null;

  private parentWidth: Number | String;

  componentDidMount() {
    const { direction, width } = this.props;

    if (!width) {
      events.on(window, 'resize', this.onWindowResize);
    }

    this.calcDrawerWidth();

    if (this.parentDrawer && !!this.parentDrawer.props && this.parentDrawer.props.visible && this.parentDrawer.props.direction !== direction) {
      throw new Error('The direction of the child drawer is the same as that of the father drawer.');
    }

    this.btnFix(0);
  }

  componentDidUpdate(preProps: PropsType) {
    const { visible } = this.props;
    if (preProps.visible !== visible) {
      if (visible) {
        this.calculationLayer(this);
      }

      if (!visible && this.parentDrawer) {
        this.calculationLayer(this.parentDrawer);
      }
    }
  }

  private onWindowResize = throttle(this.calcDrawerWidth, 300);

  private calcDrawerWidth = () => {
    const { size = 'normal', width } = this.props;
    const windowWidth = window.innerWidth;
    const sizeWidth = {
      lg: 0.8 * windowWidth - 160,
      normal: 0.62 * windowWidth - 160,
      sm: 0.38 * windowWidth - 160,
    };

    if (!width) {
      this.parentWidth = sizeWidth[size];
      return this.setState({
        drawerWidth: sizeWidth[size],
      });
    }
    this.parentWidth = width;
    this.setState({
      drawerWidth: width,
    });
  };

  private calculationLayer = (Drawers: Drawer) => {
    let totallayer = 0;
    function layers(drawer: Drawer) {
      if (drawer) {
        if (drawer.parentDrawer) {
          totallayer += 1;
          layers(drawer.parentDrawer);
        }
      }
    }
    layers(Drawers);

    this.setState({
      layer: totallayer,
    }, () => {
      this.noticeBrother(totallayer, Drawers);
    });
  };

  private noticeBrother = (total, drawer) => {
    if (!drawer) return false;

    if (drawer.parentDrawer) {
      this.noticeBrother(total, drawer.parentDrawer);
    }
    drawer.btnFix && drawer.btnFix(total);
  };

  private btnFix = (totallayers: number) => {
    if (!totallayers) return false;
    const { layer, direction = 'right', drawerWidth } = this.state;
    if (!!this.parentWidth && this.parentWidth !== drawerWidth) {
      return false;
    }
    const distance = (totallayers - layer) * BUTTONLAYER;
    const btnstyle = {
      left: {
        top: distance,
      },
      right: {
        top: distance,
      },
      top: {
        left: distance,
      },
      bottom: {
        left: distance,
      },
    };

    this.setState({
      btnstyle: btnstyle[direction],
    });
  };

  private renderProvider = (value: Drawer) => {
    const {
      prefixCls,
      width,
      height,
      mask,
      closable,
      onClose,
      maskClosable,
      title,
      // afterOpen,
      afterClose,
      onMaskClick,
      children,
      maskover,
      visible,
    } = this.props;
    const {
      layer,
      totallayers,
      direction = 'right',
      btnstyle,
      drawerWidth,
    } = this.state;

    const thickness = {
      left: {
        width: drawerWidth || width,
      },
      right: {
        width: drawerWidth || width,
      },
      top: {
        height: drawerWidth || height,
      },
      bottom: {
        height: drawerWidth || height,
      },
    };

    const siderStyle = {
      ...thickness[direction],
    };

    const drawerBox = classnames(`${prefixCls}`, {
      [`${prefixCls}__mask__hidden`]: layer > 1 && !maskover,
    });

    const cls = classnames(`${prefixCls}__cell-box`, {
      [`${prefixCls}__cell-box__${direction}`]: direction,
    });

    this.parentDrawer = value;

    return (
      <DrawerContext.Provider value={this}>
        <Popup
          key={totallayers}
          mask={mask}
          direction={direction}
          animationDuration={100}
          className={drawerBox}
          visible={visible}
          onMaskClick={maskClosable ? () => {
            onMaskClick && onMaskClick();
            onClose && onClose();
          } : undefined}
          // afterOpen={afterOpen}
          afterClose={afterClose}
        >
          <div className={cls}>
            {closable && (<button className={`${prefixCls}__cell__closebtn`} style={{ ...btnstyle }} onClick={() => onClose && onClose()}><Icon type="wrong" /></button>)}
            <div className={`${prefixCls}__cell`} style={{ ...siderStyle }}>
              {title && (<div className={`${prefixCls}__cell__title`}>{title}</div>)}
              <div className={`${prefixCls}__cell__body`}>{children}</div>
            </div>
          </div>
        </Popup>
      </DrawerContext.Provider>
    );
  };

  render() {
    return (
      <DrawerContext.Consumer>{this.renderProvider}</DrawerContext.Consumer>
    );
  }
}

export default Drawer;
