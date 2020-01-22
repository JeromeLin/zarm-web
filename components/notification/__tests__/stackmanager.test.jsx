import React from "react";
import ReactDOM from "react-dom";
import { render, shallow, mount } from "enzyme";

import StackManager from "../StackManager";
import Notification from "../Notification";

describe("StackManager", () => {
  const instance = new StackManager(Notification, "notification");
  const containCls = Notification.defaultProps.prefixCls + "-container";
  const title = "TestTitle";
  const message = "this is a test message!";

  it("instantiation correctly", () => {
    expect(instance.containerCls).toBe(containCls);
    expect(instance.component).toBe(Notification);
    expect(instance.componentName).toBe("notification");
  });

  it("open correctly", () => {
    const open1 = instance.open({ title, message });
    expect(typeof open1.close).toBe("function");
    expect(instance.notifyList.length).toBe(1);
    expect(document.body.querySelector("." + containCls)).not.toBe(null);
    const item = instance.notifyList[0];
    expect(item.props.title).toBe(title);
    expect(item.props.message).toBe(message);
  });

  it("position correctly", () => {
    instance.open({ title, message, position: "bottomLeft" });
    const item = instance.notifyList[0];
    expect(item.props.position).toBe("bottomLeft");
  });

  it("destroy correctly", () => {
    instance.destroy();
    expect(document.body.querySelector("." + containCls)).toBe(null);
  });

  it("close correctly", () => {
    const instance = new StackManager(Notification, "notification");
    const open1 = instance.open({ title, message });
    expect(instance.notifyList.length).toBe(1);
    open1.close();
    const item = instance.notifyList[0];
    expect(item.ref.current.state.visible).toBe(false);
    instance.destroy();
  });

  it("close all correctly", () => {
    const instance = new StackManager(Notification, "notification");
    instance.open({ title, message });
    instance.open({ title, message });

    expect(instance.notifyList.length).toBe(2);
    instance.closeAll();

    instance.notifyList.forEach(item => {
      expect(item.ref.current.state.visible).toBe(false);
    });
  });

  it("auto close correctly", () => {
    const oldRender = ReactDOM.render;
    ReactDOM.render = jest.fn(coms => {
      ReactDOM.render = oldRender;
      const wraper = mount(coms);
      wraper.mount();
    });

    jest.useFakeTimers();
    const instance = new StackManager(Notification, "notification");
    const open1 = instance.open({ title, message });

    expect(instance.notifyList.length).toBe(1);
    jest.advanceTimersByTime(10000);
    expect(instance.notifyList.length).toBe(0);
    // 走close的另一个分支， 提高代码覆盖率
    open1.close();
    // 走remove的另一个分支， 提高代码覆盖率
    instance.remove("testkey", "rightBottom");
  });

  it("open with key correctly", () => {
    jest.useFakeTimers();
    const instance = new StackManager(Notification, "notification");
    const key = "uniquekey";
    instance.open({ title, message, key });
    expect(instance.notifyList.length).toBe(1);
    instance.close(key);
    jest.advanceTimersByTime(10000);
    expect(instance.notifyList.length).toBe(0);
  });
});
