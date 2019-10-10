import React, { ReactNode, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Modal from './index';
import { ModalProps } from './PropsType';
import Button from '../button';
import Icon from '../icon';

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

type ThemeType = 'success' | 'primary' | 'warning' | 'danger';

type AlertProps = MergeProps<typeof Modal, ModalProps> & { content: ReactNode; theme?: ThemeType };

function isObject(obj: any) {
  return Object.prototype.toString.call(obj).toLowerCase() === '[object object]';
}

function isReactNode(props: AlertProps | ReactNode): props is ReactNode {
  return React.isValidElement(props) || !isObject(props);
}

function AlertMethod(props: AlertProps, isConfirm = false) {
  const { theme = 'primary', title, ...others } = props;
  const themeTitleConfig = themeMapIcon[theme];
  const themeTitle = (
    <>
      <Icon className="modal-alert-icon" type={themeTitleConfig.icon} theme={theme} />
      <span className="modal-alert-icon-text">{title}</span>
    </>
  );
  const div = document.createElement('div');
  let resolveFn = (result: boolean) => result;

  function handleOnOk(renderTemp: (visible: boolean) => void, resolveResult: boolean) {
    const { onOk } = props;
    if (onOk) {
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
        title={themeTitle}
        {...others}
        autoFocus
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
            <Button theme={theme === 'success' ? 'primary' : 'theme'} onClick={() => handleOnOk(render, true)}>确定</Button>
          </>
        )}
      >
        {props.content}
      </Modal>,
      div,
    );
  }

  const returnResult = new Promise((resolve) => {
    resolveFn = resolve as typeof resolveFn;
    render(true);
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
  const modalProps: AlertProps = isReactNode(props) ? {
    content: props,
  } : props;
  return AlertMethod(modalProps);
}

export function Confirm(props: ModalProps | ReactNode) {
  const modalProps: AlertProps = isReactNode(props) ? {
    content: props,
  } : props;
  return AlertMethod(modalProps, true);
}
