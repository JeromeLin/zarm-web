import React, { ReactNode, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Modal from './index';
import { ModalProps } from './PropsType';
import Button from '../button';

type AlertProps = MergeProps<typeof Modal, ModalProps> & { content: ReactNode };

function isObject(obj: any) {
  return Object.prototype.toString.call(obj) === '[object object]';
}

function isReactNode(props: AlertProps | ReactNode): props is ReactNode {
  return React.isValidElement(props) || !isObject(props);
}

function AlertMethod(props: AlertProps, isConfirm = false) {
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
        disableEscapeKeyDown
        afterClose={() => {
          if (props.afterClose) {
            props.afterClose();
          }
          ReactDOM.unmountComponentAtNode(div);
          if (div.parentNode) {
            div.parentNode.removeChild(div);
          }
        }}
        {...props}
        autoFocus
        onOk={() => {
          handleOnOk(render, true);
        }}
        onCancel={() => {
          render(false);
          resolveFn(false);
        }}
        footer={(
          <Fragment>
            {isConfirm && <Button onClick={() => handleOnOk(render, false)} theme="primary">取消</Button>}
            <Button onClick={() => handleOnOk(render, true)} theme="primary">确定</Button>
          </Fragment>
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

  Object.setPrototypeOf(Object.getPrototypeOf(returnResult), {
    hide: () => {
      render(false);
      resolveFn(false);
    },
  });

  return returnResult;
}

export function Alert(props: ModalProps | ReactNode, isConfirm = false) {
  const modalProps: AlertProps = isReactNode(props) ? {
    content: props,
  } : props;
  return AlertMethod(modalProps, isConfirm);
}

export function Confirm(props: ModalProps | ReactNode) {
  return Alert(props, true);
}
