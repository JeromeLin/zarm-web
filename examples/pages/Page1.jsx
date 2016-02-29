
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
  Table
} from '../../components';

import '../../styles/index.scss';
import '../styles/pages/Page1.scss';

let index = 0;
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
      selectValue2 : '',
      checkboxValue: [],
      tags         : [],
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
      <div className="demo container">

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
              <Breadcrumb.Item separator=">">首页</Breadcrumb.Item>
              <Breadcrumb.Item href="">模块</Breadcrumb.Item>
              <Breadcrumb.Item>应用</Breadcrumb.Item>
            </Breadcrumb>
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
            <br />
            <Switch isCheckedText={<Icon type="check" />} unCheckedText={<Icon type="close" />} /> 图标开关
            <br />
            <Switch defaultValue={true} /> 设定默认值为true
            <br />
            <Switch isCheckedText="是" unCheckedText="否" disabled /> 禁用状态
            <br />
            <Switch size="sm" value={this.state.switchValue} onChange={(value) => {
              this.setState({
                switchValue: value,
              });
            }} /> 小开关
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
            <Select style={{width: 120}} placeholder="请选择" value={this.state.selectValue} onChange={(data) => {
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

            <Select disabled style={{width: 120}} value={this.state.selectValue2} onChange={(data) => {
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
                  <Menu.Item>111</Menu.Item>
                  <Menu.Item>222</Menu.Item>
                  <Menu.Item>333</Menu.Item>
                </Menu>
              </Dropdown>
            </div>
          </Form.Item>

          <Form.Item
            label="表格" 
            labelCol="col-sm-2"
            controlCol="col-sm-10">
            <Table columns={[{
              title: '表头1(20%)',
              dataIndex:'a',
              width:'20%',
              render: (text, row, index) => {
                if (index == 1)
                  return text;
                else
                  return <a href="#">{text}</a>;
              }
            },{
              id: '123',
              title: '表头2(30%)',
              dataIndex:'b',
              width: '30%'
            },{
              title: '表头3(50%)',
              dataIndex: 'c',
              width: '50%'
            }]}
            dataSource={[
              {a:'123'},
              {a:'cdd', b:'edd'},
              {a:'1333', c:'eee', d:2},
            ]}>
            </Table>
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
        
        <Loading
          visible={this.state.loading}
          message="付款中" />

        <Mask
          visible={this.state.mask}
          onClose={() => this._onClickClose('mask')} />

      </div>
    );
  }
}

export default Page1;