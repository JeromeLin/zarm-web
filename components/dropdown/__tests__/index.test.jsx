import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Dropdown from '../index';
import Button from '../../button';

describe('Dropdown', () => {
  it('renders normal Dropdown correctly', () => {
    const doneChange = jest.fn();
    const wrapper = render(
      <div>
        <Dropdown
          onVisibleChange={doneChange}
        >
          <Button>click</Button>
        </Dropdown>
      </div>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  const timer = function (t) {
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(true);
      }, t);
    });
  };

  it('trigger onVisibleChange correctly', async () => {
    let visible = false;
    const doneChange = jest.fn();
    const onClick = jest.fn();
    const wrapper = mount(
      <Dropdown
        visible={visible}
        onVisibleChange={(e) => {
          visible = e;
          doneChange(e);
        }}
      >
        <Button className="btn" onClick={onClick}>click</Button>
      </Dropdown>,
    );
    wrapper.find('button').simulate('click');
    expect(onClick).toHaveBeenCalled();
    expect(doneChange).toHaveBeenCalled();
    expect(visible).toEqual(true);
  });

  it('not trigger onVisibleChange when trigger is not click', async () => {
    let visible = false;
    const doneChange = jest.fn();
    const onClick = jest.fn();
    const wrapper = mount(
      <Dropdown
        visible={visible}
        trigger="hover"
        onVisibleChange={(e) => {
          visible = e;
          doneChange(e);
        }}
      >
        <Button className="btn" onClick={onClick}>click</Button>
      </Dropdown>,
    );
    wrapper.find('button').simulate('click');
    expect(onClick).toHaveBeenCalled();
    expect(doneChange).not.toHaveBeenCalled();
    expect(visible).toEqual(false);
  });


  it('trigger onVisibleChange correctly when props trigger is hover', async () => {
    let visible = false;
    const doneChange = jest.fn();
    const wrapper = mount(
      <Dropdown
        visible={visible}
        trigger="hover"
        triggerProps={{
          className: 'span',
        }}
        onVisibleChange={(e) => {
          visible = e;
          doneChange(e);
        }}
      >
        <Button className="btn">hover</Button>
      </Dropdown>,
    );
    wrapper.find('.span').simulate('mouseEnter');
    expect(doneChange).toHaveBeenCalled();
    expect(visible).toEqual(true);
  });


  it('not trigger onVisibleChange correctly when props trigger is not hover', async () => {
    let visible = false;
    const doneChange = jest.fn();
    const wrapper = mount(
      <Dropdown
        visible={visible}
        trigger="click"
        triggerProps={{
          className: 'span',
        }}
        onVisibleChange={(e) => {
          visible = e;
          doneChange(e);
        }}
      >
        <Button className="btn">hover</Button>
      </Dropdown>,
    );
    wrapper.find('.span').simulate('mouseEnter');
    expect(doneChange).not.toHaveBeenCalled();
    expect(visible).toEqual(false);
  });


  it('trigger onVisibleChange correctly when props trigger is mouseleave', async () => {
    let visible = true;
    const doneChange = jest.fn();
    const wrapper = mount(
      <Dropdown
        visible={visible}
        trigger="hover"
        triggerProps={{
          className: 'span',
        }}
        onVisibleChange={(e) => {
          visible = e;
          doneChange(e);
        }}
      >
        <Button className="btn">hover</Button>
      </Dropdown>,
    );
    const span = wrapper.find('.span');
    span.simulate('mouseLeave');
    await timer(310);   // 实际实现中会有300ms的延迟才消失
    expect(doneChange).toHaveBeenCalled();
    expect(visible).toEqual(false);
  });


  it('not trigger onVisibleChange correctly when props trigger is mouseleave and visible is false', async () => {
    let visible = false;
    const doneChange = jest.fn();
    const wrapper = mount(
      <Dropdown
        visible={visible}
        trigger="hover"
        triggerProps={{
          className: 'span',
        }}
        onVisibleChange={(e) => {
          visible = e;
          doneChange(e);
        }}
      >
        <Button className="btn">hover</Button>
      </Dropdown>,
    );
    const span = wrapper.find('.span');
    span.simulate('mouseLeave');
    await timer(310);   // 实际实现中会有300ms的延迟才消失
    expect(doneChange).not.toHaveBeenCalled();
    expect(visible).toEqual(false);
  });

  // 当鼠标离开不超过300ms的时候
  it('not trigger onVisibleChange correctly when props trigger is mouseleave', async () => {
    let visible = true;
    const doneChange = jest.fn();
    const wrapper = mount(
      <Dropdown
        visible={visible}
        trigger="hover"
        triggerProps={{
          className: 'span',
        }}
        onVisibleChange={(e) => {
          visible = e;
          doneChange(e);
        }}
      >
        <Button className="btn">hover</Button>
      </Dropdown>,
    );
    const span = wrapper.find('.span');
    span.simulate('mouseLeave');
    await timer(100);   // 实际实现中会有300ms的延迟才消失
    expect(doneChange).not.toHaveBeenCalled();
    expect(visible).toEqual(true);
  });


  it('renders normal Dropdown correctly when trigger contextmenu', async () => {
    let visible = false;
    const doneChange = jest.fn();
    const wrapper = mount(
      <Dropdown
        visible={visible}
        trigger="contextMenu"
        onVisibleChange={(e) => {
          visible = e;
          doneChange(e);
        }}
      >
        <Button> contextmenu </Button>
      </Dropdown>,
    );
    wrapper.find('button').simulate('contextmenu');
    await timer(100);
    expect(doneChange).toHaveBeenCalled();
    expect(visible).toEqual(true);
  });

  it('should not trigger onVisibleChange callback when trigger is not contextMenu', async () => {
    let visible = false;
    const doneChange = jest.fn();
    const wrapper = mount(
      <Dropdown
        visible={visible}
        trigger="click"
        onVisibleChange={(e) => {
          visible = e;
          doneChange(e);
        }}
      >
        <Button>contextmenu</Button>
      </Dropdown>,
    );
    wrapper.find('button').simulate('contextmenu');
    await timer(100);
    expect(doneChange).not.toHaveBeenCalled();
    expect(visible).toEqual(false);
  });

  it('should not trigger onVisibleChange callback when disabled', async () => {
    let visible = false;
    const doneChange = jest.fn();
    const wrapper = mount(
      <Dropdown
        disabled
        visible={visible}
        trigger="click"
        onVisibleChange={(e) => {
          visible = e;
          doneChange(e);
        }}
      >
        <Button>contextmenu</Button>
      </Dropdown>,
    );
    wrapper.find('button').simulate('click');
    expect(doneChange).not.toHaveBeenCalled();
  });
});
