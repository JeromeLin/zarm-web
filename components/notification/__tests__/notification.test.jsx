import React from "react";
import { render, shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import Notification from "../Notification";

describe("Notification", () => {
  const message = "This is a test messgae";
  const prefixCls = Notification.defaultProps.prefixCls;

  it("renders basic Notification correctly", () => {
    const title = "Test Title";
    const wrapper = shallow(
      <Notification title={title} message={message}></Notification>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text().indexOf(title)).not.toBe(-1);
    expect(wrapper.text().indexOf(message)).not.toBe(-1);
  });

  it("render default title correctly", () => {
    const wrapper1 = mount(<Notification message={message}></Notification>);
    const wrapper2 = mount(
      <Notification icon="success" message={message}></Notification>
    );
    const wrapper3 = mount(
      <Notification icon="warning" message={message}></Notification>
    );
    const wrapper4 = mount(
      <Notification icon="error" message={message}></Notification>
    );
    expect(wrapper1.text().indexOf("通知")).not.toBe(-1);
    expect(wrapper2.text().indexOf("成功")).not.toBe(-1);
    expect(wrapper3.text().indexOf("警告")).not.toBe(-1);
    expect(wrapper4.text().indexOf("错误")).not.toBe(-1);
  });

  it("trigger event correctly", () => {
    const mouseEnter = jest.fn();
    const mouseLeave = jest.fn();
    const click = jest.fn();
    const wrapper = mount(
      <Notification
        message={message}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        onClick={click}
      ></Notification>
    );
    wrapper
      .find("div")
      .at(0)
      .simulate("mouseenter")
      .simulate("mouseleave");
    wrapper.find("." + prefixCls + "__content").simulate("click");
    expect(mouseEnter).toHaveBeenCalledTimes(1);
    expect(mouseLeave).toHaveBeenCalledTimes(1);
    expect(click).toHaveBeenCalledTimes(1);
  });

  it("render custom icon correctly", () => {
    const wrapper = mount(
      <Notification message={message} icon={<i>?</i>}></Notification>
    );
    expect(
      wrapper
        .find("." + prefixCls + "__icon")
        .find("i")
        .text()
    ).toBe("?");
  });

  it("render unknow icon correctly", () => {
    const wrapper = mount(
      <Notification message={message} icon="unknown-icon"></Notification>
    );
    expect(wrapper.find("." + prefixCls + "__icon")).toHaveLength(0);
  });

  it("render custom footer correctly", () => {
    const text = "this is a custom footer";
    const wrapper = mount(
      <Notification message={message} footer={<div>{text}</div>}></Notification>
    );
    expect(wrapper.find("." + prefixCls + "__foot").text()).toBe(text);
  });
});
