import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu } from 'zarm-web';
import { documents, components } from '@site/site.config';
import Format from '@site/utils/format';
import './style.scss';

class SideBar extends PureComponent {
  getDocs = () => {
    return documents.map(doc => (
      <Menu.Item
        key={Format.camel2Dash(doc.name)}
      >
        <a href={`#/components/${Format.camel2Dash(doc.name)}`}>
          {doc.description}
        </a>
      </Menu.Item>
    ));
  };

  getMenus = (groupName, key) => {
    return (
      <Menu.SubMenu title={groupName} key={key}>
        {
          components[key]
            .sort((a, b) => {
              return a.name.localeCompare(b.name);
            })
            .map(component => (
              <Menu.Item key={Format.camel2Dash(component.name)}>
                <a href={`#/components/${Format.camel2Dash(component.name)}`}>
                  <span>{component.name}</span>
                  <span className="chinese">{component.description}</span>
                </a>
              </Menu.Item>
            ))
        }
      </Menu.SubMenu>
    );
  };

  render() {
    const { match } = this.props;
    return (
      <div className="side-bar">
        <div className="menu">
          <Menu
            defaultOpenKeys={['components', 'basic', 'layout', 'form', 'data', 'notice', 'navigation', 'others']}
            selectedKeys={[match.params.component]}
          >
            {this.getDocs()}
            <Menu.SubMenu title="组件" key="components">
              {this.getMenus('基础组件', 'basic')}
              {this.getMenus('布局组件', 'layout')}
              {this.getMenus('数据录入', 'form')}
              {this.getMenus('数据展示', 'data')}
              {this.getMenus('操作反馈', 'notice')}
              {this.getMenus('导航', 'navigation')}
              {this.getMenus('其他', 'others')}
            </Menu.SubMenu>
          </Menu>
        </div>
      </div>
    );
  }
}

export default withRouter(SideBar);
