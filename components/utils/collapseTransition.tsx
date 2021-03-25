import React, { Component, createRef } from 'react';

interface IProps {
  visible: boolean;
  children: React.ReactNode;
}

const percent = 0.06;

export default class CollapseTransition extends Component<IProps, any> {
  collapseWrap = createRef<HTMLDivElement>();

  componentDidMount(): void {
    const { visible } = this.props;
    this.beforeEnter();
    if (visible) {
      this.enter();
    }
  }

  componentDidUpdate(props) {
    const { visible } = this.props;

    if (visible !== props.visible) this.triggerChange(visible);
  }

  componentWillUnmount(): void {
    this.beforeLeave();
    this.leave();
  }

  triggerChange(visible: boolean): void {
    if (visible) {
      this.beforeEnter();
      this.enter();
    } else {
      this.beforeLeave();
      this.leave();
    }
  }

  beforeEnter() {
    const el: any = this.collapseWrap.current;
    el.dataset.oldPaddingTop = el!.style.paddingTop;
    el.dataset.oldPaddingBottom = el!.style.paddingBottom;
    el.dataset.oldOverflow = el!.style.overflow;
    el.style.height = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
  }

  enter() {
    const el: any = this.collapseWrap.current;
    let tempHeight = 0;
    let tempPaddingTop = 0;
    let tempPaddingBottom = 0;
    el.style.display = 'block';

    function step(context) {
      tempHeight = Math.min(el.scrollHeight, (tempHeight += el.scrollHeight * percent));
      tempPaddingTop = Math.min(
        el.dataset.oldPaddingTop,
        (tempPaddingTop += el.dataset.oldPaddingTop * percent),
      );
      tempPaddingBottom = Math.min(
        el.dataset.oldPaddingBottom,
        (tempPaddingBottom += el.dataset.oldPaddingBottom * percent),
      );
      el.style.height = `${tempHeight}px`;
      el.style.paddingTop = tempPaddingTop;
      el.style.paddingBottom = tempPaddingBottom;
      if (tempHeight < el.scrollHeight) {
        requestAnimationFrame(() => {
          step(context);
        });
      } else {
        context.afterEnter();
      }
    }

    requestAnimationFrame(() => {
      step(this);
    });
    el.style.overflow = 'hidden';
  }

  afterEnter() {
    const el: any = this.collapseWrap.current;
    el.style.display = 'block';
    el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
  }

  beforeLeave() {
    const el: any = this.collapseWrap.current;
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldOverflow = el.style.overflow;

    el.style.display = 'block';
    if (el.scrollHeight !== 0) {
      el.style.height = `${el.scrollHeight}px`;
    }
    el.style.overflow = 'hidden';
  }

  leave() {
    const el: any = this.collapseWrap.current;
    let tempHeight = el.scrollHeight;
    let tempPaddingTop = el.dataset.oldPaddingTop;
    let tempPaddingBottom = el.dataset.oldPaddingBottom;

    function step(context) {
      tempHeight = Math.max(0, (tempHeight -= el.scrollHeight * percent));
      tempPaddingTop = Math.max(0, (tempPaddingTop -= el.dataset.oldPaddingTop * percent));
      tempPaddingBottom = Math.max(0, (tempPaddingBottom -= el.dataset.oldPaddingBottom * percent));
      el.style.height = `${tempHeight}px`;
      el.style.paddingTop = tempPaddingTop;
      el.style.paddingBottom = tempPaddingBottom;
      if (tempHeight !== 0) {
        requestAnimationFrame(() => {
          step(context);
        });
      } else {
        context.afterLeave();
      }
    }

    requestAnimationFrame(() => {
      step(this);
    });
  }

  afterLeave() {
    const el: any = this.collapseWrap.current;
    if (!el) return;

    el.style.display = 'none';
    el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
    el.style.paddingTop = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
  }

  render() {
    const { children } = this.props;

    return (
      <div className="collapse-transition" ref={this.collapseWrap} style={{ overflow: 'hidden' }}>
        {children}
      </div>
    );
  }
}
