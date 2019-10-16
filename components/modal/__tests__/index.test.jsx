import React from 'react';
// import ReactDOM from 'react-dom';
import { render, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Modal from '../index';

jest.mock('react-dom', () => ({
  createPortal: (node) => node,
}));

describe('Modal', () => {
  it('renders basic Modal correctly', () => {
    const wrapper = render(
      <Modal title="标题">
        我是一个模态框
      </Modal>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders customized Modal correctly', () => {
    const wrapper = render(
      <Modal
        width={400}
        radius
        visible
        animationType="fade"
        animationDuration={500}
      >
        我是一个模态框
      </Modal>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders closable Modal correctly', () => {
    const wrapper = render(
      <Modal
        title="标题"
        onCancel={() => { }}
      >
        我是一个模态框
      </Modal>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('triggers onClose callback correctly when clicks on closable icon', () => {
    const onClose = jest.fn();
    const wrapper = mount(
      <Modal
        visible
        title="标题"
        onCancel={onClose}
      >
        我是一个模态框
      </Modal>,
    );
    wrapper.find('.zw-modal__close').simulate('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('triggers onMaskClick callback correctly', () => {
    const onMaskClick = jest.fn();
    const wrapper = shallow(
      <Modal
        title="标题"
        onMaskClick={onMaskClick}
      >
        我是一个模态框
      </Modal>,
    );

    wrapper.find('.za-mask').simulate('click');
    expect(onMaskClick).toHaveBeenCalled();
  });
});
