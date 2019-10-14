import React, { PureComponent, HTMLAttributes, CSSProperties } from 'react';
import classnames from 'classnames';
import { Popup } from 'zarm';
import throttle from '../utils/throttle';
import DrawerContext from './createDrawerContext';
import Icon from '../icon';
import events from '../utils/events';
import PropsType from './PropsType';

const BUTTONLAYER = 40;
const PADDING = 160;
const DRAWERSIZE = {
  LARGE: 0.8,
  NORMAL: 0.62,
  SMALL: 0.38,
};

export interface StateType {
  width?: number | string;
  layer?: number;
  top?: number;
  left?: number;
  totallayers?: number;
  btnstyle?: CSSProperties;
}

class Drawer extends PureComponent<PropsType & HTMLAttributes<HTMLDivElement>, StateType> {
  private parentDrawer: Drawer | null;

  private parentWidth: Number | String;

  static defaultProps = {
    closable: true,
    size: 'md',
    mask: true,
    visible: false,
    maskClosable: false,
    prefixCls: 'zw-drawer',
  };

  readonly state = {
    layer: 0,
    totallayers: 0,
    btnstyle: {},
    width: this.props.width,
  };

  componentDidMount() {
    const { width } = this.props;
    const { totallayers } = this.state;

    if (!width) {
      events.on(window, 'resize', throttle(this.calcDrawerWidth, 300));
    }

    this.calcDrawerWidth();
    this.fixDrawer(totallayers, width);
  }

  componentDidUpdate(preProps: PropsType) {
    const { visible } = this.props;
    if (preProps.visible !== visible) {
      if (visible) {
        this.calcLayer(this, this.parentWidth);
      }

      if (!visible && this.parentDrawer) {
        this.calcLayer(this.parentDrawer, this.parentDrawer.parentWidth);
      }
    }
  }

  private calcDrawerWidth = () => {
    let { size = 'md' } = this.props;
    const { width } = this.state;

    if (['lg', 'md', 'sm'].indexOf(size) === -1) {
      size = 'md';
    }

    if (!width) {
      const windowWidth = window.innerWidth;
      const sizeWidth = {
        lg: DRAWERSIZE.LARGE * windowWidth - PADDING,
        md: DRAWERSIZE.NORMAL * windowWidth - PADDING,
        sm: DRAWERSIZE.SMALL * windowWidth - PADDING,
      };
      this.parentWidth = sizeWidth[size];

      return this.setState({
        width: sizeWidth[size],
      });
    }

    this.parentWidth = +width + 160;
  };

  private calcLayer = (Drawers: Drawer, width) => {
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
      this.noticeBrother(totallayer, Drawers, width);
    });
  };

  private noticeBrother = (total, drawer, width) => {
    if (!drawer) return false;

    if (drawer.parentDrawer) {
      this.noticeBrother(total, drawer.parentDrawer, width);
    }

    drawer.fixDrawer && drawer.fixDrawer(total, width);
  };

  private fixDrawer(totallayers: number, width) {
    if (!totallayers) return false;
    const { layer } = this.state;
    const distance = (totallayers - layer) * BUTTONLAYER;

    this.setState({
      btnstyle: {
        top: distance,
      },
      width,
    });
  }

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
      visible,
    } = this.props;
    const {
      layer,
      totallayers,
      width,
      btnstyle,
    } = this.state;

    const drawerBox = classnames(`${prefixCls}`, {
      [`${prefixCls}__mask__hidden`]: layer > 1,
    });

    const drawerCell = classnames(`${prefixCls}__cell`);

    this.parentDrawer = value;

    return (
      <DrawerContext.Provider value={this}>
        <Popup
          key={totallayers}
          mask={mask}
          direction="right"
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
          <div className={`${prefixCls}__cell-box`}>
            {closable && (
              <button
                className={`${prefixCls}__closebtn`}
                style={{ ...btnstyle }}
                onClick={() => onClose && onClose()}
              >
                <Icon
                  size="sm"
                  type="wrong"
                />
              </button>
            )}
            <div className={drawerCell} style={{ width }}>
              {title && (<div className={`${prefixCls}__cell--title`}>{title}</div>)}
              <div className={`${prefixCls}__cell--body`}>{children}</div>
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
