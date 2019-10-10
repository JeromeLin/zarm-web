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
    closable: true,
    size: 'normal',
    mask: true,
    visible: false,
    maskClosable: false,
    prefixCls: 'zw-drawer',
    maskover: true,
  };

  readonly state = {
    layer: 0,
    totallayers: 0,
    btnstyle: {},
    width: this.props.width,
  };

  private parentDrawer: Drawer | null;

  private parentWidth: Number | String;

  componentDidMount() {
    const { width } = this.props;

    if (!width) {
      events.on(window, 'resize', this.onWindowResize);
    }

    this.calcDrawerWidth();
  }

  componentDidUpdate(preProps: PropsType) {
    const { visible } = this.props;
    if (preProps.visible !== visible) {
      if (visible) {
        this.calcLayer(this);
      }

      if (!visible && this.parentDrawer) {
        this.calcLayer(this.parentDrawer);
      }
    }
  }

  private onWindowResize = throttle(this.calcDrawerWidth, 300);

  private calcDrawerWidth = () => {
    const { size = 'normal' } = this.props;
    const { width } = this.state;

    if (!width) {
      const windowWidth = window.innerWidth;
      const sizeWidth = {
        large: 0.8 * windowWidth - 160,
        normal: 0.62 * windowWidth - 160,
        sm: 0.38 * windowWidth - 160,
      };
      this.parentWidth = sizeWidth[size];

      return this.setState({
        width: sizeWidth[size],
      });
    }

    this.parentWidth = width;
  };

  private calcLayer = (Drawers: Drawer) => {
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

  private noticeBrother = (total, drawer, fn) => {
    if (!drawer) return false;

    if (drawer.parentDrawer) {
      this.noticeBrother(total, drawer.parentDrawer);
    }
    drawer.fixBtnPosition && drawer.fixBtnPosition(total);
    drawer.fixDrawerWidth && drawer.fixDrawerWidth(this.parentWidth);
  };

  private fixBtnPosition = (totallayers: number) => {
    if (!totallayers) return false;
    const { layer } = this.state;
    const distance = (totallayers - layer) * BUTTONLAYER;

    this.setState({
      btnstyle: {
        top: distance,
      },
    });
  };

  private fixDrawerWidth = (parentWidth: number) => {
    this.setState({
      width: parentWidth,
    });
  };

  private renderProvider = (value: Drawer) => {
    const {
      prefixCls,
      mask,
      closable,
      onClose,
      maskClosable,
      title,
      afterOpen,
      afterClose,
      onMaskClick,
      children,
      maskover,
      visible,
    } = this.props;
    const {
      layer,
      totallayers,
      width,
      btnstyle,
    } = this.state;

    const drawerBox = classnames(`${prefixCls}`, {
      [`${prefixCls}__mask__hidden`]: layer > 1 && !maskover,
    });

    const drawerCell = classnames(`${prefixCls}__cell`);

    const cls = classnames(`${prefixCls}__cell-box`, `${prefixCls}__cell-box__right`);

    this.parentDrawer = value;

    return (
      <DrawerContext.Provider value={this}>
        <Popup
          key={totallayers}
          mask={mask}
          direction='right'
          animationDuration={100}
          className={drawerBox}
          visible={visible}
          onMaskClick={maskClosable ? () => {
            onMaskClick && onMaskClick();
            onClose && onClose();
          } : undefined}
          afterOpen={afterOpen}
          afterClose={afterClose}
        >
          <div className={cls}>
            {closable && (<button className={`${prefixCls}__cell__closebtn`} style={{ ...btnstyle }} onClick={() => onClose && onClose()}><Icon type="wrong" /></button>)}
            <div className={drawerCell} style={{ width }}>
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
