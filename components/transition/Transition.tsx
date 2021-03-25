import { Component, isValidElement, Children, cloneElement } from 'react';
import classnames from 'classnames';
import { noop } from '../utils';

export interface TransitionProps {
  name?: string;
  duration?: number;
  visible?: boolean;
  directional?: boolean;
  transitionOnMount?: boolean;
  unmountOnHide?: boolean;
  mountOnShow?: boolean;
  onShow?: (status) => void;
  onHide?: (status) => void;
  onStart?: (status) => void;
  onComplete?: (status) => void;
  onBeforeShow?: (status) => void;
  onBeforeHide?: (status) => void;
}

const TRANSITION_TYPE = {
  ENTERING: 'show',
  EXITING: 'hide',
};

export default class Transition extends Component<TransitionProps, any> {
  static defaultProps = {
    name: 'fade',
    duration: 500,
    directional: true,
    visible: true,
    mountOnShow: true,
    transitionOnMount: false,
    unmountOnHide: false,
    onStart: noop,
    onShow: noop,
    onHide: noop,
    onComplete: noop,
    onBeforeShow: noop,
    onBeforeHide: noop,
  };

  static ENTERED = 'ENTERED';

  static ENTERING = 'ENTERING';

  static EXITED = 'EXITED';

  static EXITING = 'EXITING';

  static UNMOUNTED = 'UNMOUNTED';

  private nextStatus: any;

  private timeoutId: any;

  constructor(props) {
    super(props);

    const {
      initial: status,
      next,
    }: { initial: string; next?: string } = this.computeInitialStatus();
    this.nextStatus = next;
    this.state = { status };
  }

  componentDidMount() {
    this.updateStatus();
  }

  componentWillReceiveProps(nextProps) {
    const { status, next } = this.computeStatus(nextProps);
    this.nextStatus = next;
    if (status) this.setState({ status });
  }

  componentDidUpdate() {
    this.updateStatus();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  computeInitialStatus = () => {
    const { visible, mountOnShow, transitionOnMount, unmountOnHide } = this.props;

    if (visible) {
      if (transitionOnMount) {
        return {
          initial: Transition.EXITED,
          next: Transition.ENTERING,
        };
      }
      return { initial: Transition.ENTERED };
    }
    if (mountOnShow || unmountOnHide) return { initial: Transition.UNMOUNTED };
    return { initial: Transition.EXITED };
  };

  computeNextStatus = () => {
    const { animating, status } = this.state;

    if (animating) return status === Transition.ENTERING ? Transition.EXITING : Transition.ENTERING;
    return status === Transition.ENTERED ? Transition.EXITING : Transition.ENTERING;
  };

  computeStatus = (props) => {
    const { status } = this.state;
    const { visible } = props;

    if (visible) {
      return {
        status: status === Transition.UNMOUNTED && Transition.EXITED,
        next:
          status !== Transition.ENTERING && status !== Transition.ENTERED && Transition.ENTERING,
      };
    }

    return {
      next: (status === Transition.ENTERING || status === Transition.ENTERED) && Transition.EXITING,
    };
  };

  updateStatus = () => {
    const { animating } = this.state;

    if (this.nextStatus) {
      this.nextStatus = this.computeNextStatus();
      if (!animating) this.handleStart();
    }
  };

  handleStart = () => {
    const { duration } = this.props;
    const status = this.nextStatus;

    this.nextStatus = null;
    this.setState({ status, animating: true }, () => {
      (this.props as any).onStart({ ...this.props, status });
      this.timeoutId = setTimeout(() => {
        this.handleComplete();
      }, duration);
    });
  };

  handleComplete = () => {
    const { status } = this.state;

    (this.props as any).onComplete({ ...this.props, status });

    if (this.nextStatus) {
      return this.handleStart();
    }
    const completeStatus = this.computeCompletedStatus();
    const beforeHook = status === Transition.ENTERING ? 'onBeforeShow' : 'onBeforeHide';
    const callback = status === Transition.ENTERING ? 'onShow' : 'onHide';

    (this.props as any)[beforeHook]({ ...this.props, status: completeStatus });
    this.setState({ status: completeStatus, animating: false }, () => {
      (this.props as any)[callback]({ ...this.props, status: completeStatus });
    });
  };

  computeCompletedStatus = () => {
    const { unmountOnHide } = this.props;
    const { status } = this.state;

    if (status === Transition.ENTERING) return Transition.ENTERED;
    return unmountOnHide ? Transition.UNMOUNTED : Transition.EXITED;
  };

  computeClasses = (): string => {
    const {
      name,
      children,
      directional,
    }: { name?: string; children?: any; directional?: boolean } = this.props;
    const { animating, status } = this.state;
    const childrenClass = children.props.className;

    if (directional) {
      return classnames(childrenClass, {
        animating,
        [`${name}`]: name,
        [`${name}-in`]: status === Transition.ENTERING,
        [`${name}-out`]: status === Transition.EXITING,
        hidden: status === Transition.EXITED,
        visible: status !== Transition.EXITED,
        transition: true,
      });
    }
    return classnames(childrenClass, { animating, transition: true, [`${name}`]: name });
  };

  computeStyle = (): object => {
    const { children, duration }: { children?: any; duration?: any } = this.props;
    const { status } = this.state;
    const childrenStyle = children!.props.style;
    const type = TRANSITION_TYPE[status];
    const animationDuration = type && `${duration}ms`;

    return { ...childrenStyle, animationDuration };
  };

  render() {
    const { children }: { children? } = this.props;
    const { status } = this.state;

    if (status === Transition.UNMOUNTED) return null;
    if (isValidElement(children) && Children.only(children)) {
      return cloneElement<any>(children, {
        className: this.computeClasses(),
        style: this.computeStyle(),
      });
    }
  }
}
