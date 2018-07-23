import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Panel from '../index';

describe('Panel', () => {
  it('renders Panel correctly', () => {
    const wrapper = render(
      <div>
        <Panel>
          <Panel.Header>
            <Panel.Title>头部左侧</Panel.Title>
            <Panel.More>
              头部右侧
            </Panel.More>
          </Panel.Header>
          <Panel.Body>
            React is the entry point to the React library
            If you load React from a script tag, these
            top-level APIs are available on the React global
          </Panel.Body>
          <Panel.Footer>
            <Panel.Title>底部左侧</Panel.Title>
            <Panel.More>
              底部右侧
            </Panel.More>
          </Panel.Footer>
        </Panel>
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
