import React, { PureComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { Popup } from 'zarm';

import DrawerContext from './createDrawerContext';
import Icon from '../icon';
import PropsType, { StateType } from './PropsType';

const BUTTONLAYER = 10;

class Drawer extends PureComponent<PropsType & HTMLAttributes<HTMLDivElement>, StateType> {
  static defaultProps = {
    direction: 'right',  // 抽屉的方向 top | right | bottom | lef
    closable: true,      // 是否显示右上角的关闭按钮
    width: 200,          // 抽屉的宽度
    height: 200,         // 抽屉的高度 在 placement 为 'top' 或者 'bottom' 时生效 其他情况高度撑满屏幕
    mask: true,          // 是否展示遮罩
    visible: false,      // 抽屉是否可见
    maskClosable: false, // 点击遮罩是否关闭
  };

  readonly state = {
    layer: 1,
  };

  private parentDrawer: Drawer | null;

  componentDidMount() {
    const { visible, direction } = this.props;

    if (this.parentDrawer && !!this.parentDrawer.props && this.parentDrawer.props.visible && this.parentDrawer.props.direction !== direction) {
      throw new Error('The direction of the child drawer is the same as that of the father drawer.');
    }

    if (visible && this.parentDrawer) {
      this.CalculationLayer(this.parentDrawer);
    }
  }

  componentDidUpdate() {
    const { visible } = this.props;
    if (visible && this.parentDrawer) {
      this.CalculationLayer(this.parentDrawer);
    }
  }

  private CalculationLayer = (parentDrawer: Drawer) => {
    let layer = 0;
    function layers(drawer: Drawer) {
      if (drawer) {
        layer += 1;
        if (drawer.parentDrawer) {
          layers(drawer.parentDrawer);
        }
      }
    }
    layers(parentDrawer);
    this.setState({
      layer,
    });
  };

  private renderProvider = (value: Drawer) => {
    const {
      width,
      height,
      style,
      mask,
      direction = 'right',
      closable,
      visible,
      onClose,
      maskClosable,
      title,
      afterOpen,
      afterClose,
      onMaskClick,
      children,
    } = this.props;
    const { layer } = this.state;

    this.parentDrawer = value;

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

    const buttonlocation = {
      left: {
        top: layer * BUTTONLAYER,
      },
      right: {
        top: layer * BUTTONLAYER,
      },
      top: {
        left: layer * BUTTONLAYER,
      },
      bottom: {
        left: layer * BUTTONLAYER,
      },
    };

    const siderStyle = {
      ...style,
      ...thickness[direction],
    };

    const cls = classnames('zw-drawer__cell-box', {
      [`zw-drawer__cell-box__${direction}`]: direction,
    });

    return (
      <DrawerContext.Provider value={this}>
        <Popup
          mask={mask}
          direction={direction}
          className="zw-drawer"
          visible={visible}
          onMaskClick={maskClosable ? () => {
            onMaskClick && onMaskClick();
            onClose && onClose();
          } : undefined}
          afterOpen={afterOpen}
          afterClose={afterClose}
        >
          <div className={cls}>
            {closable && (<button className="zw-drawer__cell__closebtn" style={{ ...buttonlocation[direction] }} onClick={() => onClose && onClose()}><Icon type="wrong" /></button>)}
            <div className="zw-drawer__cell" style={{ ...siderStyle }}>
              {title && (<div className="zw-drawer__cell__title">{title}</div>)}
              <div className="zw-drawer__cell__body">{children}</div>
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
