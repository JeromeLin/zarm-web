
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

      switchValue: false,
      radioValue : 'A',
      selectValue: 'a',
      selectValue2: 'a'
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

        <Form>

          <Form.Item label="姓名">
            <Input placeholder="请输入..." />
          </Form.Item>

          <Form.Item label="座右铭">
            <Input type="textarea" rows="3" />
          </Form.Item>

          <Form.Item label="是否在职">
            <Switch isCheckedText="是" unCheckedText="否" defaultValue={true} onChange={(value) => {
              console.log('switch to ' + value);
              this.setState({
                switchValue: value,
              });
            }}></Switch>
            <Switch size="sm" value={this.state.switchValue}></Switch>
          </Form.Item>

          <Form.Item label="单选选择">
            <Radio.Group defaultValue={this.state.radioValue} onChange={(e) => {
                console.log('radio to ' + e.target.value);
                this.setState({
                  radioValue: e.target.value,
                });
              }}>
              <Radio value="a">A</Radio>
              <Radio value="b">B</Radio>
              <Radio value="c">C</Radio>
              <Radio value="d">D</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="单选绑定">
            <Radio.Group value={this.state.radioValue}>
              <Radio value="a">A</Radio>
              <Radio value="b">B</Radio>
              <Radio value="c" disabled>C</Radio>
              <Radio value="d">D</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="下拉选择">
            <Select style={{width: 120}} value={this.state.selectValue} onChange={(data) => {
              this.setState({
                selectValue2: data.value,
              });
            }}>
              <Select.Option value="a">A</Select.Option>
              <Select.Option value="b">B</Select.Option>
              <Select.Option value="c">C</Select.Option>
              <Select.Option value="d">D</Select.Option>
            </Select>

            <Select style={{width: 120}} value={this.state.selectValue2} onChange={(data) => {
              console.log(data);
            }}>
              <Select.Option value="a">A</Select.Option>
              <Select.Option value="b">B</Select.Option>
              <Select.Option value="c">C</Select.Option>
              <Select.Option value="d">D</Select.Option>
            </Select>
          </Form.Item>

        </Form>

        <p className="buttons">
          <Button size="xl" circle><Icon type="search" /></Button>
          <Button size="lg" circle><Icon type="search" /></Button>
          <Button circle><Icon type="search" /></Button>
          <Button size="sm" circle><Icon type="search" /></Button>
          <Button size="xs" circle><Icon type="search" /></Button>

          <Button size="xl" onClick={() => this._onClickOpen('mask')}><Icon type="search" />遮罩层</Button>
          <Button size="lg" theme="primary" onClick={() => this._onClickOpen('modal')}><Icon type="search" />模态框</Button>
          <Button theme="info" onClick={() => this._onClickOpen('confirm')}><Icon type="search" />确认框</Button>
          <Button size="sm" theme="success" onClick={() => this._onClickOpen('alert')}><Icon type="search" />警告框</Button>
          <Button size="xs" theme="warning" onClick={() => this._onClickOpen('loading')}><Icon type="search" />加载中</Button>
          <Button theme="danger" onClick={() => this._onClickOpen('toast')}><Icon type="search" />提示信息</Button>
        </p>

        <Modal visible={this.state.modal} width="600" onMaskClick={() => this._onClickClose('modal')}>
          <Modal.Header title="标题" onClose={() => this._onClickClose('modal')}></Modal.Header>
          <Modal.Body height={400}>
            我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮
          </Modal.Body>
          <Modal.Footer>
            <Button size="lg" onClick={() => this._onClickClose('modal')}>取消</Button>
            <Button size="lg" theme="success" onClick={() => { alert('你点击了确定') }}>确定</Button>
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