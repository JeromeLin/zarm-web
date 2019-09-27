import React, { PureComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { Popup } from 'zarm';

import DrawerContext from './createDrawerContext';
import Icon from '../icon';
import PropsType, { StateType } from './PropsType';

const BUTTONLAYER = 40;

class Drawer extends PureComponent<PropsType & HTMLAttributes<HTMLDivElement>, StateType> {
  static defaultProps = {
    direction: 'right',       // 抽屉的方向 top | right | bottom | lef
    closable: true,           // 是否显示右上角的关闭按钮
    width: 200,               // 抽屉的宽度
    height: 200,              // 抽屉的高度 在 placement 为 'top' 或者 'bottom' 时生效 其他情况高度撑满屏幕
    mask: true,               // 是否展示遮罩
    visible: false,           // 抽屉是否可见
    maskClosable: false,      // 点击遮罩是否关闭
    prefixCls: 'zw-drawer',   // 样式前缀
    maskover: true,          // 是否重叠遮罩层背景
  };

  readonly state = {
    layer: 0,
    totallayers: 0,
    direction: this.props.direction,
    btnstyle: {},
  };

  private parentDrawer: Drawer | null;

  componentDidMount() {
    const { direction } = this.props;

    if (this.parentDrawer && !!this.parentDrawer.props && this.parentDrawer.props.visible && this.parentDrawer.props.direction !== direction) {
      throw new Error('The direction of the child drawer is the same as that of the father drawer.');
    }
  }

  componentDidUpdate(preProps: PropsType) {
    const { visible } = this.props;
    if (preProps.visible !== visible) {
      if (visible) {
        this.CalculationLayer(this);
      }

      if (!visible && this.parentDrawer) {
        this.CalculationLayer(this.parentDrawer);
      }
    }
  }

  private CalculationLayer = (Drawers: Drawer) => {
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
    drawer.btnFix && drawer.btnFix(total);
    if (drawer.parentDrawer) {
      this.noticeBrother(total, drawer.parentDrawer);
    }
  };

  btnFix(totallayers: number) {
    const { layer, direction = 'right' } = this.state;
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
  }

  private renderProvider = (value: Drawer) => {
    const {
      prefixCls,
      width,
      height,
      style,
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
    const { layer, totallayers, direction = 'right', btnstyle } = this.state;

    const thickness = {
      left: {
        width,
      },
      right: {
        width,
      },
      top: {
        height,
      },
      bottom: {
        height,
      },
    };

    const siderStyle = {
      ...style,
      ...thickness[direction],
    };

    const cls = classnames(`${prefixCls}__cell-box`, {
      [`${prefixCls}__cell-box__${direction}`]: direction,
    });

    const drawerBox = classnames(`${prefixCls}`, {
      [`${prefixCls}__mask__hidden`]: layer > 1 && !maskover,
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
