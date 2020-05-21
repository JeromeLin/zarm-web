import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import Modal from './Modal';
import { ModalProps } from './PropsType';
import Button from '../button';
import Icon from '../icon';

type ReactNodeFn<T> = (param: T) => ReactNode;

const themeMapIcon = {
  success: {
    icon: 'right-round-fill',
  },
  danger: {
    icon: 'wrong-round-fill',
  },
  primary: {
    icon: 'info-round-fill',
  },
  warning: {
    icon: 'warning-round-fill',
  },
};

Modal.staticTriggerInstanceList = [];

type ThemeType = 'success' | 'primary' | 'danger' | 'warning';

type AlertProps = MergeProps<typeof Modal, ModalProps> & { content: ReactNode; theme?: ThemeType };

function isObject(obj: any) {
  return Object.prototype.toString.call(obj).toLowerCase() === '[object object]';
}

function isReactNode(props: AlertProps | ReactNode): props is ReactNode {
  return React.isValidElement(props) || !isObject(props);
}

function AlertMethod(props: AlertProps, isConfirm = false) {
  const {
    theme,
    prefixCls = Modal.defaultProps.prefixCls,
    title,
    className,
    content,
    ...others
  } = props;

  let iconElem: ReactNode = null;
  if (theme) {
    const themeTitleConfig = themeMapIcon[theme];
    iconElem = <Icon className={`${prefixCls}__alert-icon`} size="md" type={themeTitleConfig.icon} theme={theme} />;
  }

  const titleAndContent = (
    <>
      {theme && iconElem}
      <div className={`${prefixCls}__alert-body`}>
        <div className={`${prefixCls}__alert-title`}>{title}</div>
        {content}
      </div>
    </>
  );
  const div = document.createElement('div');
  let resolveFn = (result: boolean) => result;

  const cls = cn({
    [`${className}`]: !!className,
    [`${prefixCls}-${isConfirm ? 'confirm' : 'alert'}`]: true,
  });

  function handleOnOk(renderTemp: (visible: boolean) => void, resolveResult: boolean) {
    const { onOk } = props;
    if (onOk && resolveResult) {
      const result: any = onOk();
      if (result instanceof Promise) {
        return result.then((res) => {
          if (res === false) {
            return;
          }
          renderTemp(false);
          resolveFn(resolveResult);
        });
      }
      if (result !== false) {
        renderTemp(false);
        resolveFn(resolveResult);
      }
      return;
    }
    renderTemp(false);
    resolveFn(resolveResult);
  }

  function render(visible: boolean) {
    ReactDOM.render(
      <Modal
        closable={false}
        visible={visible}
        style={{ maxWidth: 340 }}
        afterClose={() => {
          if (props.afterClose) {
            props.afterClose();
          }
          ReactDOM.unmountComponentAtNode(div);
          if (div.parentNode) {
            div.parentNode.removeChild(div);
          }
        }}
        {...others}
        autoFocus
        className={cls}
        onOk={() => {
          handleOnOk(render, true);
        }}
        onCancel={() => {
          render(false);
          resolveFn(false);
        }}
        footer={(
          <>
            {isConfirm && <Button onClick={() => handleOnOk(render, false)}>取消</Button>}
            <Button theme="primary" onClick={() => handleOnOk(render, true)}>确定</Button>
          </>
        )}
      >
        {titleAndContent}
      </Modal>,
      div,
    );
  }

  const returnResult = new Promise((resolve) => {
    resolveFn = resolve as typeof resolveFn;
    render(true);
  });
  Modal.staticTriggerInstanceList.push({
    close: () => {
      render(false);
      resolveFn(false);
    },
  });
  return {
    hide() {
      render(false);
      resolveFn(false);
    },
    then: (resolve) => {
      return returnResult.then((res) => {
        resolve(res);
      });
    },
    catch: (_resolve, reject) => {
      return returnResult.catch((res) => {
        reject(res);
      });
    },
  };
}

export function Alert(props: ModalProps | ReactNode) {
  const modalProps: AlertProps = isReactNode(props)
    ? { content: props }
    : { maskClosable: false, ...props as AlertProps };
  return AlertMethod(modalProps);
}

export function Confirm(props: ModalProps | ReactNode) {
  const modalProps: AlertProps = isReactNode(props)
    ? { content: props }
    : { maskClosable: false, ...props as AlertProps };
  return AlertMethod(modalProps, true);
}

Modal.confirm = Confirm;

Modal.alert = Alert;

Modal.success = (props: AlertProps | ReactNode) => {
  const modalProps: AlertProps = isReactNode(props)
    ? { content: props, theme: 'success' }
    : { maskClosable: false, ...props as AlertProps, theme: 'success' };
  return AlertMethod(modalProps);
};

Modal.info = (props: AlertProps | ReactNode) => {
  const modalProps: AlertProps = isReactNode(props)
    ? { content: props, theme: 'primary' }
    : { maskClosable: false, ...props as AlertProps, theme: 'primary' };
  return AlertMethod(modalProps);
};

Modal.error = (props: AlertProps | ReactNode) => {
  const modalProps: AlertProps = isReactNode(props)
    ? { content: props, theme: 'danger' }
    : { maskClosable: false, ...props as AlertProps, theme: 'danger' };
  return AlertMethod(modalProps);
};

Modal.warning = (props: ModalProps | ReactNode) => {
  const modalProps: AlertProps = isReactNode(props)
    ? { content: props, theme: 'warning' }
    : { maskClosable: false, ...props as AlertProps, theme: 'warning' };
  return AlertMethod(modalProps);
};

export interface ModalConfigProps extends ModalProps {
  content: ReactNode | ReactNodeFn<() => void>;
  key: any;
}

export class ModalStatic {
  props: ModalConfigProps;

  mounteElem: HTMLDivElement;

  key: string | number;

  constructor(props: ModalConfigProps) {
    this.props = props;
    this.key = props.key;
    this.mounteElem = document.createElement('div');
  }

  render(visible: boolean) {
    const {
      content,
      prefixCls = Modal.defaultProps.prefixCls,
      key,
      onCancel,
      className,
      ...others
    } = this.props;
    const cls = cn({
      [`${className}`]: !!className,
      [`${prefixCls}-open`]: true,
    });
    return new Promise((resolve) => {
      const contentNode = typeof content === 'function'
        ? content(() => {
          this.render(true);
        })
        : content;
      ReactDOM.render((
        <Modal
          {...others}
          className={cls}
          visible={visible}
          afterClose={() => {
            resolve();
          }}
          onCancel={() => {
            if (onCancel) {
              const result = onCancel();
              if (result instanceof Promise) {
                result.then((res) => {
                  if (res !== false) {
                    this.close();
                  }
                });
              } else if (result !== false) {
                this.close();
              }
            } else {
              this.close();
            }
          }}
        >
          {contentNode}
        </Modal>
      ), this.mounteElem);
    });
  }

  close() {
    return this.render(false).then(() => {
      ReactDOM.unmountComponentAtNode(this.mounteElem);
      if (this.mounteElem.parentNode) {
        this.mounteElem.parentNode.removeChild(this.mounteElem);
      }
    });
  }
}

Modal.open = (props: ModalConfigProps) => {
  const instance = new ModalStatic(props);
  instance.render(true);
  Modal.staticTriggerInstanceList.push(instance);
  return instance;
};

Modal.close = (key: string | number) => {
  const index = Modal.staticTriggerInstanceList.findIndex((item) => item.key === key);
  if (index >= 0) {
    return Modal.staticTriggerInstanceList.splice(index, 1)[0].close();
  }
  return Promise.resolve();
};

Modal.destroy = () => {
  while (Modal.staticTriggerInstanceList.length > 0) {
    const currentInstance = Modal.staticTriggerInstanceList.shift();
    if (currentInstance) {
      currentInstance.close();
    }
  }
};

export default Modal;
