import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Swipe from '../index';

describe('Swipe', () => {
  it('renders normal Swipe correctly', () => {
    const wrapper = render(
      <Swipe speed={1000}>
        <div className="ui-swipe-item">
          <div className="ui-swipe-pic">
            <a href="http://www.baidu.com">
              <img alt="" src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E4%BD%B3%E4%B9%90%E9%94%AD.png" />
            </a>
          </div>
        </div>
        <div className="ui-swipe-item">
          <div className="ui-swipe-pic">
            <a href="http://www.taobao.com">
              <img alt="" src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E8%96%AF%E7%89%87-0.png" />
            </a>
          </div>
        </div>
        <div className="ui-swipe-item">
          <div className="ui-swipe-pic">
            <a href="http://www.qq.com">
              <img alt="" src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E9%BB%84%E6%B2%B9%E8%96%AF%E7%89%87-0.png" />
            </a>
          </div>
        </div>
      </Swipe>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders vertical Swipe correctly', () => {
    const wrapper = render(
      <Swipe speed={1000} direction="top">
        <div className="ui-swipe-item">
          <div className="ui-swipe-pic">
            <a href="http://www.baidu.com">
              <img alt="" src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E4%BD%B3%E4%B9%90%E9%94%AD.png" />
            </a>
          </div>
        </div>
        <div className="ui-swipe-item">
          <div className="ui-swipe-pic">
            <a href="http://www.taobao.com">
              <img alt="" src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E8%96%AF%E7%89%87-0.png" />
            </a>
          </div>
        </div>
        <div className="ui-swipe-item">
          <div className="ui-swipe-pic">
            <a href="http://www.qq.com">
              <img alt="" src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E9%BB%84%E6%B2%B9%E8%96%AF%E7%89%87-0.png" />
            </a>
          </div>
        </div>
      </Swipe>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('autoPlays correctly', () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <Swipe speed={1000}>
        <div className="ui-swipe-item">
          <div className="ui-swipe-pic">
            <a href="http://www.baidu.com">
              <img alt="" src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E4%BD%B3%E4%B9%90%E9%94%AD.png" />
            </a>
          </div>
        </div>
        <div className="ui-swipe-item">
          <div className="ui-swipe-pic">
            <a href="http://www.taobao.com">
              <img alt="" src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E8%96%AF%E7%89%87-0.png" />
            </a>
          </div>
        </div>
        <div className="ui-swipe-item">
          <div className="ui-swipe-pic">
            <a href="http://www.qq.com">
              <img alt="" src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E9%BB%84%E6%B2%B9%E8%96%AF%E7%89%87-0.png" />
            </a>
          </div>
        </div>
      </Swipe>
    );

    jest.runOnlyPendingTimers();

    expect(wrapper.state('activeIndex')).toEqual(1);
  });

  it('behaves correctly on touchstart', () => {
    const wrapper = mount(
      <Swipe speed={1000}>
        <div className="ui-swipe-item">
          <div className="ui-swipe-pic">
            <a href="http://www.baidu.com">
              <img alt="" src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E4%BD%B3%E4%B9%90%E9%94%AD.png" />
            </a>
          </div>
        </div>
        <div className="ui-swipe-item">
          <div className="ui-swipe-pic">
            <a href="http://www.taobao.com">
              <img alt="" src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E8%96%AF%E7%89%87-0.png" />
            </a>
          </div>
        </div>
        <div className="ui-swipe-item">
          <div className="ui-swipe-pic">
            <a href="http://www.qq.com">
              <img alt="" src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E9%BB%84%E6%B2%B9%E8%96%AF%E7%89%87-0.png" />
            </a>
          </div>
        </div>
      </Swipe>
    );

    wrapper.find('.ui-swipe-items').simulate('touchStart', {
      touches: [
        {
          pageX: 10,
        },
      ],
    });

    expect(wrapper.state('pointStart')).toEqual(10);
  });

  it('behaves correctly on touchmove', () => {
    const wrapper = mount(
      <Swipe speed={1000}>
        <div className="ui-swipe-item">
          <div className="ui-swipe-pic">
            <a href="http://www.baidu.com">
              <img alt="" src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E4%BD%B3%E4%B9%90%E9%94%AD.png" />
            </a>
          </div>
        </div>
        <div className="ui-swipe-item">
          <div className="ui-swipe-pic">
            <a href="http://www.taobao.com">
              <img alt="" src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E8%96%AF%E7%89%87-0.png" />
            </a>
          </div>
        </div>
        <div className="ui-swipe-item">
          <div className="ui-swipe-pic">
            <a href="http://www.qq.com">
              <img alt="" src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E9%BB%84%E6%B2%B9%E8%96%AF%E7%89%87-0.png" />
            </a>
          </div>
        </div>
      </Swipe>
    );

    wrapper.find('.ui-swipe-items')
      .simulate('touchMove', {
        touches: [
          {
            pageX: 100,
          },
        ],
      });

    expect(wrapper.state('pointEnd')).toEqual(100);
  });

  it('behaves correctly on touchend', () => {
    const wrapper = mount(
      <Swipe speed={1000}>
        <div className="ui-swipe-item">
          <div className="ui-swipe-pic">
            <a href="http://www.baidu.com">
              <img alt="" src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E4%BD%B3%E4%B9%90%E9%94%AD.png" />
            </a>
          </div>
        </div>
        <div className="ui-swipe-item">
          <div className="ui-swipe-pic">
            <a href="http://www.taobao.com">
              <img alt="" src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E8%96%AF%E7%89%87-0.png" />
            </a>
          </div>
        </div>
        <div className="ui-swipe-item">
          <div className="ui-swipe-pic">
            <a href="http://www.qq.com">
              <img alt="" src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E9%BB%84%E6%B2%B9%E8%96%AF%E7%89%87-0.png" />
            </a>
          </div>
        </div>
      </Swipe>
    );

    wrapper.find('.ui-swipe-items')
      .simulate('touchStart', {
        touches: [
          {
            pageX: 0,
          },
        ],
      })
      .simulate('touchMove', {
        touches: [
          {
            pageX: 100,
          },
        ],
      })
      .simulate('touchEnd');

    expect(wrapper.state('activeIndex')).toEqual(-1);
  });
});

