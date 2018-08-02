import React from 'react';
import ReactDOM from 'react-dom';
import { render, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Modal from '../index';

const { Header, Body, Footer } = Modal;

ReactDOM.createPortal = node => node;

describe('Modal', () => {
  it('renders basic Modal correctly', () => {
    const wrapper = render(
      <Modal>
        <Header title="标题" />
        <Body>我是一个模态框</Body>
        <Footer>页脚</Footer>
      </Modal>
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
        <Header title="标题" />
        <Body>我是一个模态框</Body>
        <Footer>页脚</Footer>
      </Modal>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders closable Modal correctly', () => {
    const wrapper = render(
      <Modal>
        <Header title="标题" onClose={() => {}} />
        <Body>我是一个模态框</Body>
        <Footer>页脚</Footer>
      </Modal>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('triggers onClose callback correctly when clicks on closable icon', () => {
    const onClose = jest.fn();
    const wrapper = mount(
      <Modal>
        <Header title="标题" onClose={onClose} />
        <Body>我是一个模态框</Body>
        <Footer>页脚</Footer>
      </Modal>
    );
    wrapper.find('.ui-modal-close').simulate('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('triggers onMaskClick callback correctly', () => {
    const onMaskClick = jest.fn();
    const wrapper = shallow(
      <Modal onMaskClick={onMaskClick}>
        <Header title="标题" />
        <Body>我是一个模态框</Body>
        <Footer>页脚</Footer>
      </Modal>
    );

    wrapper.find('.ui-modal').simulate('click');
    expect(onMaskClick).toHaveBeenCalled();
  });
});
