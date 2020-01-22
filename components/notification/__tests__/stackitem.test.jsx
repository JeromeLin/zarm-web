import React from "react";
// import ReactDOM from 'react-dom';
import { render, shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import StackItem from "../StackItem";

function TempComponent(props) {
  const { onClose, test } = props;
  return <div onClick={onClose}>{props.test}</div>;
}

describe("StackItem", () => {
  it("renders basic StackItem correctly", () => {
    const wrapper = mount(
      <StackItem
        Component={TempComponent}
        name="testname"
        stayTime={4500}
        test="1"
      ></StackItem>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text()).toBe("1");
  });

  it("triggers onClose callback correctly", () => {
    const onClose = jest.fn();
    const wrapper = mount(
      <StackItem
        Component={TempComponent}
        name="testname"
        stayTime={4500}
        onClose={onClose}
        test="1"
      ></StackItem>
    );
    wrapper.find("div").simulate("click");
    expect(onClose).toBeCalled();
  });

  it("start timer correctly", () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <StackItem
        Component={TempComponent}
        name="testname"
        stayTime={1234}
      ></StackItem>
    );
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1234);
  });

  it("do not start timer", () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <StackItem
        Component={TempComponent}
        name="testname"
        stayTime={0}
      ></StackItem>
    );
    // 除了 transition 调了一次，不会有第二次
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });

  it("end timer correctly", () => {
    jest.useFakeTimers();
    const onClose = jest.fn();
    const wrapper = mount(
      <StackItem
        Component={TempComponent}
        name="testname"
        stayTime={1234}
        onClose={onClose}
      ></StackItem>
    );
    jest.runAllTimers();
    expect(onClose).toBeCalled();
  });

  it("unount Component correctly", () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <StackItem
        Component={TempComponent}
        name="testname"
        stayTime={1234}
      ></StackItem>
    );
    wrapper.unmount();
    expect(clearTimeout).toBeCalled();
  });
});
