
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import {
  Mask,
  Modal,
  Alert,
  Confirm,
  Toast,
  Loading,
  Button,
  Swipe,
  Switch,
  Input,
  Icon,
  Form,
  Radio,
  Checkbox,
  Select,
  Menu,
  Tag,
  Dropdown,
  Breadcrumb,
  Table,
  Pagination,
  Panel,
  Step,
  Tooltip
} from '../../components';

import '../../styles/index.scss';
import '../styles/pages/Page1.scss';

let index = 0;
const dataSource = [
  {id: '1', name: '张三', dept: '直营部', address: '上海市杨浦区四平路324号', state: true},
  {id: '2', name: '李四', dept: '健康险事业部', age: 32, state: true},
  {id: '3', name: '王五', dept: '金融信保部', age: 20, address: '上海市浦东区张杨路1400号', state: false},
];

class Page1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal     : false,
      confirm   : false,
      alert     : false,
      mask      : false,
      toast     : false,
      loading   : false,
      dropdown  : false,

      switchValue  : false,
      radioValue   : 'b',
      radioValue2  : '',
      selectValue  : '',
      selectValue2 : 'b',
      checkboxValue: [],
      tags         : [],

      tableSelection  : [],
      tableLoading    : false,

      currentPage  : 4,
      pageSize     : 10,
      inputPage    : 4,
    };
  }

  _onClickOpen(key) {
    this.setState({
      [`${ key }`]: true
    });
  }

  _onClickClose(key) {
    this.setState({
      [`${ key }`]: false
    });
  }

  _removeTag(key) {
    const tags = [...this.state.tags].filter(tag => (tag.key !== key) && tag);
    console.log(tags);
    this.setState({ tags });
  }

  render() {

    return (
      <Loading visible={this.state.loading} message="付款中">
        <div className="demo">
          <h4>Tooltip</h4>
          {['left', 'right', 'top', 'bottom', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom',
          'topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map((item, index) => {
            return <Tooltip title="这是一个Tooltip" direction={item} style={{marginRight: '10px', lineHeight: '30px'}}>
            你好这里是一个带title的ToolTip
            </Tooltip>;
          })}
          <h4>Form</h4>
          <Form style={{maxWidth: '100%'}}>

            <Form.Item label="账号">
              <Input placeholder="请输入..." />
            </Form.Item>
            <Form.Item label="密码">
              <Input placeholder="请输入..." />
            </Form.Item>
            <Form.Item>
              <Button theme="success">登录</Button>
            </Form.Item>

          </Form>

          <h4>Form inline</h4>
          <Form type="inline">
            <Form.Item
              className="col-sm-3"
              label="类型">
              <Input placeholder="请输入..." />
            </Form.Item>
            <Form.Item
              className="col-sm-3"
              label="来源">
              <Input placeholder="请输入..." />
            </Form.Item>
            <Form.Item
              className="col-sm-3"
              label="等级">
              <Input placeholder="请输入..." />
            </Form.Item>
            <Form.Item
              className="col-sm-3"
              label="">
              <Button theme="success">查询</Button>
            </Form.Item>
          </Form>

          <Form type="inline">

            <Form.Item label="账号">
              <Input placeholder="请输入..." />
            </Form.Item>
            <Form.Item label="密码">
              <Input placeholder="请输入..." />
            </Form.Item>
            <Form.Item>
              <Button theme="success">登录</Button>
            </Form.Item>
          </Form>

          <h4>Form horizontal</h4>
          <Form type="horizontal">

            <Form.Item
              label="icon图标" 
              labelCol="col-sm-2"
              controlCol="col-sm-10">
              <Icon type="search" style={{fontSize: 30}} />
              <Icon type="check" style={{fontSize: 30}} />
              <Icon type="close" style={{fontSize: 30}} />
            </Form.Item>

            <Form.Item
              label="图标按钮"
              labelCol="col-sm-2"
              controlCol="col-sm-10">
              <Button size="xl" circle><Icon type="search" /></Button>
              <Button size="lg" circle><Icon type="search" /></Button>
              <Button circle><Icon type="search" /></Button>
              <Button size="sm" circle><Icon type="search" /></Button>
              <Button size="xs" circle><Icon type="search" /></Button>
            </Form.Item>

            <Form.Item
              label="文字按钮"
              labelCol="col-sm-2"
              controlCol="col-sm-10">
              <Button size="xl">特大号按钮</Button>
              <Button size="lg" theme="info">大号按钮</Button>
              <Button theme="success">普通按钮</Button>
              <Button size="sm" theme="warning">小号按钮</Button>
              <Button size="xs" theme="error">特小号按钮</Button>
              <Button>直角按钮</Button>
              <Button radius>圆角按钮</Button>
              <Button round>椭圆角按钮</Button>
              <Button><Icon type="search" />带图标的按钮</Button>
              <Button disabled>禁用状态</Button>
              <Button active>激活状态</Button>
            </Form.Item>

            <Form.Item
              label="标签"
              labelCol="col-sm-2"
              controlCol="col-sm-10">
              <Tag size="xl" radius>特大号标签</Tag>
              <Tag size="lg" theme="info" radius>大号标签</Tag>
              <Tag theme="success" radius>普通标签</Tag>
              <Tag size="sm" theme="warning" radius>小号标签</Tag>
              <Tag size="xs" theme="error" radius>特小号标签</Tag>
              <br />
              {this.state.tags.map(tag =>
                <Tag key={tag.key} size="xs" radius onClose={() => this._removeTag(tag.key)}>{tag.name}</Tag>
              )}
              <Button theme="info" round onClick={() => {
                const tags = [...this.state.tags];
                index += 1;
                tags.push({ key: index, name: `新标签${index}` });
                this.setState({ tags });
              }}><Icon type="roundadd" />添加标签</Button>
            </Form.Item>

            <Form.Item
              label="面包屑" 
              labelCol="col-sm-2"
              controlCol="col-sm-10">
              <Breadcrumb>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item href="">模块</Breadcrumb.Item>
                <Breadcrumb.Item>应用</Breadcrumb.Item>
              </Breadcrumb>
              <Breadcrumb separator=">">
                <Breadcrumb.Item><Icon type="search" /> 首页</Breadcrumb.Item>
                <Breadcrumb.Item href="">模块</Breadcrumb.Item>
                <Breadcrumb.Item>应用</Breadcrumb.Item>
              </Breadcrumb>
            </Form.Item>

            <Form.Item
              label="面包屑" 
              labelCol="col-sm-2"
              controlCol="col-sm-10">
                <Step current={6}>
                  <Step.Item>投保单基本信息</Step.Item>
                  <Step.Item>投保单位录入</Step.Item>
                  <Step.Item>产品选择</Step.Item>
                  <Step.Item>总单险种定义</Step.Item>
                  <Step.Item>计划创建</Step.Item>
                  <Step.Item>被保人清单导入</Step.Item>
                  <Step.Item>录入完成</Step.Item>
                </Step>
            </Form.Item>

            <Form.Item
              label="输入框"
              labelCol="col-sm-2"
              controlCol="col-sm-10"
              help="写点提示信息吧">
              <Input placeholder="请输入..." id="title" />
            </Form.Item>

            <Form.Item
              label="密码"
              labelCol="col-sm-2"
              controlCol="col-sm-10"
              help="请输入密码"
              theme="error">
              <Input type="password" placeholder="请输入..." id="password" />
            </Form.Item>

            <Form.Item
              label="警告样式的表单"
              labelCol="col-sm-2"
              controlCol="col-sm-10"
              help="我是警告内容"
              theme="warning">
              <Input type="email" placeholder="请输入..." />
            </Form.Item>

            <Form.Item
              label="文本框"
              labelCol="col-sm-2"
              controlCol="col-sm-10"
              help="请输入密码">
              <Input type="textarea" rows="3" placeholder="请输入..." id="remark" />
            </Form.Item>

            <Form.Item
              label="开关"
              labelCol="col-sm-2"
              controlCol="col-sm-10"
              theme="error"
              help={`您最后一个开关选择了( ${this.state.switchValue} )`}>
              <Switch /> 普通开关
            </Form.Item>

            <Form.Item
              label="单选"
              labelCol="col-sm-2"
              controlCol="col-sm-10"
              theme="error"
              help={`您选择了( ${this.state.radioValue} )`}>
              <Radio value="a" onChange={(e) => {
                console.log(e.target.value);
              }}>单独使用</Radio>
              <br />
              <Radio.Group defaultValue={this.state.radioValue} onChange={(e) => {
                  console.log('radio to ' + e.target.value);
                  this.setState({
                    radioValue: e.target.value,
                    radioValue2: e.target.value,
                  });
                }}>
                <Radio value="a">A</Radio>
                <Radio value="b">B</Radio>
                <Radio value="c" disabled>C</Radio>
                <Radio value="d">D</Radio>
              </Radio.Group> 组合使用
            </Form.Item>

            <Form.Item
              label="多选"
              labelCol="col-sm-2"
              controlCol="col-sm-10"
              theme="error"
              help={`您选择了( ${this.state.checkboxValue} )`}>
              <Checkbox onChange={(e) => {
                console.log(e.target.checked);
              }}>单独使用</Checkbox>
              <br />
              <Checkbox.Group value={this.state.checkboxValue} onChange={(data) => {
                  this.setState({
                    checkboxValue: data
                  });
                }}>
                <Checkbox value="a">A</Checkbox>
                <Checkbox value="b" disabled>B</Checkbox>
                <Checkbox value="c">C</Checkbox>
                <Checkbox value="d">D</Checkbox>
              </Checkbox.Group> 组合使用
            </Form.Item>

            <Form.Item
              label="下拉选择"
              labelCol="col-sm-2"
              controlCol="col-sm-10"
              theme="error"
              help={`您选择了( ${this.state.selectValue}, ${this.state.selectValue2} )`}>
              <Select style={{width: 120}} placeholder="请选择" onChange={(data) => {
                this.setState({
                  selectValue : data.value,
                  selectValue2: data.value
                });
              }}>
                <Select.Option value="a">我是A</Select.Option>
                <Select.Option value="b" disabled>我是B</Select.Option>
                <Select.Option value="c">我是C</Select.Option>
                <Select.Option value="d">我是D</Select.Option>
              </Select>

              <Select disabled style={{width: 120}} defaultValue={this.state.selectValue2} value={this.state.selectValue2} onChange={(data) => {
                this.setState({
                  selectValue2: data.value
                });
              }}>
                <Select.Option value="a">我是A</Select.Option>
                <Select.Option value="b">我是B</Select.Option>
                <Select.Option value="c">我是C</Select.Option>
                <Select.Option value="d">我是D</Select.Option>
              </Select>
              <Button>确定</Button>
            </Form.Item>

            <Form.Item
              label="模态框"
              labelCol="col-sm-2"
              controlCol="col-sm-10">
              <Button onClick={() => this._onClickOpen('mask')}>遮罩层</Button>
              <Button onClick={() => this._onClickOpen('modal')}>模态框</Button>
              <Button onClick={() => this._onClickOpen('confirm')}>确认框</Button>
              <Button onClick={() => this._onClickOpen('alert')}>警告框</Button>
              <Button onClick={() => this._onClickOpen('loading')}>加载中</Button>
              <Button onClick={() => this._onClickOpen('toast')}>消息提示</Button>
            </Form.Item>

            <Form.Item
              label="菜单"
              labelCol="col-sm-2"
              controlCol="col-sm-10">
              <div style={{display: 'inline-block', position: 'relative'}}>
                <Button onClick={() => {
                  this.setState({
                    dropdown: true,
                  });
                  document.onclick = () => {
                    this.setState({
                      dropdown: false,
                    });
                  }
                }}>点击显示下拉菜单
                </Button>
                <Dropdown visible={this.state.dropdown} style={{position: 'absolute', left: 0, top: 36}}>
                  <Menu>
                    <Menu.Item><Checkbox value="name">姓名</Checkbox></Menu.Item>
                    <Menu.Item><Checkbox value="age">年龄</Checkbox></Menu.Item>
                    <Menu.Item>333</Menu.Item>
                  </Menu>
                </Dropdown>
              </div>
            </Form.Item>

            <Form.Item
              label="分页" 
              labelCol="col-sm-2"
              controlCol="col-sm-10">
              <div>
                <Pagination
                  bordered
                  defaultValue={this.state.currentPage}
                  pageSize={10}
                  total={324}
                  onPageChange={(value) => {
                    console.log(`您选择了( 第 ${value} 页 )`);
                  }} />

                <Pagination
                  value={this.state.currentPage}
                  pageSize={10}
                  total={324} 
                  onPageChange={(value) => {
                    console.log(`您选择了( 第 ${value} 页 )`);
                    this.setState({
                      currentPage: value,
                    })
                  }} />

              </div>
            </Form.Item>

            <Form.Item
              label="面板"
              labelCol="col-sm-2"
              controlCol="col-sm-10">
              <Panel>
                <Panel.Header>面板</Panel.Header>
                <Panel.Body>内容</Panel.Body>
              </Panel>
            </Form.Item>

            <Form.Item
              label
              labelCol="col-sm-2"
              controlCol="col-sm-10">
              <Button theme="info" onClick={() => {
                alert(JSON.stringify(this.state))
              }}>查看表单值</Button>
            </Form.Item>

          </Form>

          <Panel>
            <Panel.Header>
              切换Loading状态：
              <Switch size="sm" value={this.state.tableLoading} onChange={(value) => {
                this.setState({
                  tableLoading: value
                });
              }} />
            </Panel.Header>
            <Table
              striped
              radius
              isLoading={this.state.tableLoading}
              dataSource={dataSource}
              columns={[{
                title: '姓名',
                dataIndex: 'name',
                width: 100,
                render: (value, row, index) => {
                  return <a href="javascript:;">{value}</a>;
                }
              },
              {
                title: '部门',
                dataIndex: 'dept',
                width: 140,
                render: (value, row, index) => {
                  return (
                    <Select size="sm" value={value} style={{width: 120}}>
                      <Select.Option value="直营部">直营部</Select.Option>
                      <Select.Option value="健康险事业部">健康险事业部</Select.Option>
                      <Select.Option value="金融信保部">金融信保部</Select.Option>
                      <Select.Option value="人力资源部">人力资源部</Select.Option>
                    </Select>
                  );
                }
              },
              {
                title: '年龄',
                dataIndex: 'age',
                width: 80,
                render: (value, row, index) => {
                  if (index === 2) {
                    return <Input size="sm" style={{width: 40}} defaultValue={value} maxLength="3" />;
                  } else {
                    return value;
                  }
                }
              },{
                title: '住址',
                dataIndex: 'address',
              },{
                title: '状态',
                dataIndex: 'state',
                width: 100,
                render: (value, row, index) => {
                  return <Switch size="sm" defaultValue={value} />;
                }
              },{
                title: '操作',
                dataIndex: 'op',
                width: 120,
                render: (value, row, index) => {
                  return (
                    <div style={{color: '#ccc'}}>
                      <a href="javascript:;" onClick={() => this._onClickOpen('modal')}>编辑</a>
                      &nbsp;&nbsp;|&nbsp;&nbsp;
                      <a href="javascript:;" onClick={() => this._onClickOpen('confirm')}>删除</a>
                    </div>
                  );
                }
              }]}
              rowSelection={{
                onSelect: (selected, row, selectedRows) => {
                  console.log(selected, row, selectedRows)
                },
                onSelectAll: (selected, selectedRows) => {
                  console.log(selected, selectedRows)
                }
              }}>
            </Table>
          </Panel>

          <Pagination
            bordered
            value={this.state.currentPage}
            pageSize={this.state.pageSize}
            total={324}
            style={{fontSize: 14}}
            addonBefore={`共有324条记录 第${this.state.currentPage}/${Math.ceil(324/this.state.pageSize)}页`}
            addonAfter={
              <div>
                <Select
                  size="sm"
                  defaultValue={10}
                  onChange={(data) => {
                    this.setState({
                      currentPage: 1,
                      pageSize   : data.value,
                    });
                  }}>
                  <Select.Option value={10}>每页 10 条</Select.Option>
                  <Select.Option value={20}>每页 20 条</Select.Option>
                  <Select.Option value={30}>每页 30 条</Select.Option>
                  <Select.Option value={40}>每页 40 条</Select.Option>
                </Select>
                <span style={{display: 'inline-block', marginLeft: 15}}>
                  跳至<span style={{display: 'inline-block', width: 50, marginLeft: 5, marginRight: 5}}>
                  <Input size="sm" value={this.state.inputPage}
                    onChange={(e) => {
                      let value = e.target.value;

                      this.setState({
                        inputPage: value,
                      });
                    }}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        let value = parseInt(this.state.inputPage);
                        if (!value) return;

                        const pageCount = Math.ceil(324/this.state.pageSize);
                        value = (value < 1) ? 1 : value;
                        value = (value > pageCount) ? pageCount : value;

                        this.setState({
                          currentPage: value,
                          inputPage  : value,
                        });
                      }
                    }} />
                  </span>页
                </span>
              </div>
            }
            onPageChange={(value) => {
              this.setState({
                currentPage : value,
                inputPage   : value,
              })
            }} />

          <Modal visible={this.state.modal} width="600" onMaskClick={() => this._onClickClose('modal')}>
            <Modal.Header title="标题" onClose={() => this._onClickClose('modal')}></Modal.Header>
            <Modal.Body height={400}>
              我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this._onClickClose('modal')}>取消</Button>
              <Button theme="success" onClick={() => { alert('你点击了确定') }}>确定</Button>
            </Modal.Footer>
          </Modal>

          <Confirm
            visible={this.state.confirm}
            message="确定要删除吗？"
            onOk={() => this._onClickOpen('alert')}
            onCancel={() => this._onClickClose('confirm')} />

          <Alert
            visible={this.state.alert}
            message="这是一个警告框！"
            onClose={() => this._onClickClose('alert')} />
          
          { this.state.toast ?
            <Toast
              visible={this.state.toast}
              message="这是一个提示信息！"
              onMaskClick={() => this._onClickClose('toast')} />
          : null }

          <Mask
            visible={this.state.mask}
            onClose={() => this._onClickClose('mask')} />

        </div>
      </Loading>
    );
  }
}

export default Page1;