
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
  Select
} from '../../components';

import '../../styles/index.scss';
import '../styles/pages/Page1.scss';

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

      switchValue  : false,
      radioValue   : 'b',
      radioValue2  : '',
      selectValue  : 'a',
      selectValue2 : 'a',
      checkboxValue: [],
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

  render() {

    return (
      <div className="demo">

        <h4>Form inline</h4>
        <Form type="inline" style={{maxWidth: '100%', textAlign: 'center'}}>

          <Form.Item label="账号">
            <Input placeholder="请输入..." id="account" />
          </Form.Item>
          <Form.Item label="密码">
            <Input placeholder="请输入..." id="password" />
          </Form.Item>
          <Form.Item>
            <Button theme="success">登录</Button>
          </Form.Item>

        </Form>

        <Form style={{maxWidth: '100%'}}>

          <Form.Item label="账号">
            <Input placeholder="请输入..." id="account" />
          </Form.Item>
          <Form.Item label="密码">
            <Input placeholder="请输入..." id="password" />
          </Form.Item>
          <Form.Item>
            <Button theme="success">登录</Button>
          </Form.Item>

        </Form>

        <h4>Form horizontal</h4>
        <Form type="horizontal">

          <Form.Item label="icon图标">
            <Icon type="search" style={{fontSize: 30}} />
            <Icon type="check" style={{fontSize: 30}} />
            <Icon type="close" style={{fontSize: 30}} />
          </Form.Item>

          <Form.Item label="图标按钮">
            <Button size="xl" circle><Icon type="search" /></Button>
            <Button size="lg" circle><Icon type="search" /></Button>
            <Button circle><Icon type="search" /></Button>
            <Button size="sm" circle><Icon type="search" /></Button>
            <Button size="xs" circle><Icon type="search" /></Button>
          </Form.Item>

          <Form.Item label="文字按钮">
            <Button size="xl">特大号按钮</Button>
            <Button size="lg" theme="info">大号按钮</Button>
            <Button theme="success">普通按钮</Button>
            <Button size="sm" theme="warning">小号按钮</Button>
            <Button size="xs" theme="error">特小号按钮</Button>
            <Button>直角按钮</Button>
            <Button radius>圆角按钮</Button>
            <Button round>椭圆角按钮</Button>
            <Button onClick={() => alert('你点击了按钮')}><Icon type="search" />带图标的按钮</Button>
            <Button disabled>禁用状态</Button>
            <Button active>激活状态</Button>
          </Form.Item>

          <Form.Item label="输入框" help="写点提示信息吧">
            <Input placeholder="请输入..." id="title" />
          </Form.Item>

          <Form.Item label="文本框">
            <Input type="textarea" rows="3" placeholder="请输入..." id="remark" />
          </Form.Item>

          <Form.Item label="开关" theme="error" help={`您最后一个开关选择了( ${this.state.switchValue} )`}>
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

          <Form.Item label="单选" theme="error" help={`您选择了( ${this.state.radioValue} )`}>
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

          <Form.Item label="多选" theme="error" help={`您选择了( ${this.state.checkboxValue} )`}>
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

          <Form.Item label="下拉选择" theme="error" help={`您选择了( ${this.state.selectValue}, ${this.state.selectValue2} )`}>
            <Select style={{width: 120}} value={this.state.selectValue} onChange={(data) => {
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

            <Select style={{width: 120}} value={this.state.selectValue2} onChange={(data) => {
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

          <Form.Item label="模态框">
            <Button onClick={() => this._onClickOpen('mask')}>遮罩层</Button>
            <Button onClick={() => this._onClickOpen('modal')}>模态框</Button>
            <Button onClick={() => this._onClickOpen('confirm')}>确认框</Button>
            <Button onClick={() => this._onClickOpen('alert')}>警告框</Button>
            <Button onClick={() => this._onClickOpen('loading')}>加载中</Button>
            <Button onClick={() => this._onClickOpen('toast')}>消息提示</Button>
          </Form.Item>

          <Form.Item label="&nbsp;">
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