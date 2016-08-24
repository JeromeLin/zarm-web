
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
  DatePicker,
  Calendar,
  Tooltip,
  Upload,
  Tab,
  Message,
  Progress,
  Slider
} from '../../components';

import '../../styles/index.scss';
import '../styles/pages/Page1.scss';

let index = 0;
class Page1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {id: '1', name: '张三', dept: '直营部', age: 46, address: '上海市杨浦区四平路324号', state: true},
        {id: '2', name: '李四', dept: '健康险事业部', age: 32, address: 'wda', state: true},
        {id: '3', name: '王五', dept: '金融信保部', age: 20, address: '上海市浦东区张杨路1400号', state: false},
        {id: '4', name: '奥巴马', dept: '健康险事业部', age: 45, address: '美国洛杉矶', state: false},
      ],

      uploadDataSource: [],
      startUpload: false,

      modal     : false,
      modalProps: {
        visible: false,
        style: {
          width: '1000px'
        },
        onMaskClick: () => this._toggleModal(null)
      },

      confirm   : false,
      alert     : false,
      mask      : false,
      toast     : false,
      loading   : false,
      dropdown  : false,

      switchValue  : false,
      radioValue   : 'b',
      radioValue2  : '',
      selectValue  : 'b',
      checkboxValue: [],
      date         : '2015-12-2',

      selectSearchDataSource: [],

      mulSelectLeft      : [
        {value: 1, name: '我是选项一'},
        {value: 2, name: '我是选项二'},
        {value: 3, name: '我是选项三'},
        {value: 4, name: '我是选项四'},
      ],
      mulSelectLeftValue : [],
      mulSelectRight     : [],
      mulSelectRightValue: [],

      tags         : [],
      msg          : [],

      tableSelection: [],
      tableLoading  : false,

      currentPage  : 4,
      pageSize     : 10,
      inputPage    : 4,
      percent: 0,
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

  _toggleModal(animationType) {
    let modalProps = this.state.modalProps;
    modalProps.visible = !modalProps.visible;
    if (modalProps.visible) {
      modalProps.animationType = animationType || 'zoom';
    }
    this.setState({modalProps});
  }

  _removeTag(key) {
    const tags = [...this.state.tags].filter(tag => (tag.key !== key) && tag);
    this.setState({ tags });
  }

  _showMessage(m) {
    this.setState({
      msg: this.state.msg.concat({m})
    });
  }

  render() {

    return (
      <Loading visible={this.state.loading}>
        <div className="demo">

          <Swipe>
            <div className="ui-swipe-item">
              <div className="ui-swipe-pic">
                <a href="http://www.baidu.com">
                  <img src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E4%BD%B3%E4%B9%90%E9%94%AD.png" />
                </a>
              </div>
              <div className="ui-swipe-info">
                <div className="ui-swipe-title">百度</div>
              </div>
            </div>
            <div className="ui-swipe-item">
              <div className="ui-swipe-pic">
                <a href="http://www.taobao.com">
                  <img src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E8%96%AF%E7%89%87-0.png" />
                </a>
              </div>
              <div className="ui-swipe-info">
                <div className="ui-swipe-title">淘宝</div>
              </div>
            </div>
            <div className="ui-swipe-item">
              <div className="ui-swipe-pic">
                <a href="http://www.qq.com">
                  <img src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E9%BB%84%E6%B2%B9%E8%96%AF%E7%89%87-0.png" />
                </a>
              </div>
              <div className="ui-swipe-info">
                <div className="ui-swipe-title">腾讯</div>
              </div>
            </div>
          </Swipe>
        
          <span>Form</span>
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

          <span>Form inline</span>
          <Form type="inline">
            <Form.Item
              className="col-sm-4"
              label="类型">
              <Input placeholder="请输入..." />
            </Form.Item>
            <Form.Item
              className="col-sm-4"
              label="来源">
              <Input placeholder="请输入..." />
            </Form.Item>
            <Form.Item
              className="col-sm-4"
              label="">
              <Button theme="success">查询</Button>
            </Form.Item>
          </Form>

          <span>Form horizontal</span>
          <Form type="horizontal">

            <Form.Item
              label="icon图标" 
              labelCol="col-sm-2"
              controlCol="col-sm-10">
              <Icon type="check" theme="success" style={{fontSize: 30}} />
              <Icon type="check-round" theme="success" style={{fontSize: 30}} />
              <Icon type="check-round-fill" theme="success" style={{fontSize: 30}} />
              <Icon type="close" theme="error" style={{fontSize: 30}} />
              <Icon type="close-round" theme="error" style={{fontSize: 30}} />
              <Icon type="close-round-fill" theme="error" style={{fontSize: 30}} />
              <Icon type="info-round" theme="info" style={{fontSize: 30}} />
              <Icon type="info-round-fill" theme="info" style={{fontSize: 30}} />
              <Icon type="question-round" style={{fontSize: 30}} />
              <Icon type="question-round-fill" style={{fontSize: 30}} />
              <Icon type="warning-round" theme="warning" style={{fontSize: 30}} />
              <Icon type="warning-round-fill" theme="warning" style={{fontSize: 30}} />
              <Icon type="arrow-left" style={{fontSize: 30}} />
              <Icon type="arrow-right" style={{fontSize: 30}} />
              <Icon type="arrow-top" style={{fontSize: 30}} />
              <Icon type="arrow-bottom" style={{fontSize: 30}} />
              <Icon type="add" style={{fontSize: 30}} />
              <Icon type="minus" style={{fontSize: 30}} />
              <Icon type="date" style={{fontSize: 30}} />
              <Icon type="loading" style={{fontSize: 30}} />
            </Form.Item>

            <Form.Item
              label="图标按钮"
              labelCol="col-sm-2"
              controlCol="col-sm-10">
              <Button size="xl" circle><Icon type="check" /></Button>
              <Button size="lg" circle><Icon type="check" /></Button>
              <Button circle><Icon type="check" /></Button>
              <Button size="sm" circle><Icon type="check" /></Button>
              <Button size="xs" circle><Icon type="check" /></Button>
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
              <Button><Icon type="check" loading /> 带图标的按钮</Button>
              <Button disabled>禁用状态</Button>
              <Button disabled loading>加载中的按钮</Button>
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
              }}><Icon type="add" />添加标签</Button>
            </Form.Item>

            <Form.Item
              label="文字提示"
              labelCol="col-sm-2"
              controlCol="col-sm-10">
              {
                ['left', 'right', 'top', 'bottom', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map((item, index) => {
                  let title = '这是一个' + item + '的Tooltip';
                  return (
                    <Tooltip key={index} title={title} direction={item} tipStyle={{width: 200}} style={{marginRight : 10}}>
                      <Button style={{marginRight: 0}}>{item}</Button>
                    </Tooltip>
                  );
                })
              }（待完善）
            </Form.Item>

            <Form.Item
              label="面包屑" 
              labelCol="col-sm-2"
              controlCol="col-sm-10">
              <Breadcrumb>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/page2">模块</Link></Breadcrumb.Item>
                <Breadcrumb.Item>应用</Breadcrumb.Item>
              </Breadcrumb>
              <Breadcrumb separator=">">
                <Breadcrumb.Item><Icon type="check" /> 首页</Breadcrumb.Item>
                <Breadcrumb.Item href="">模块</Breadcrumb.Item>
                <Breadcrumb.Item>应用</Breadcrumb.Item>
              </Breadcrumb>
            </Form.Item>

            <Form.Item
              label="标签页" 
              labelCol="col-sm-2"
              controlCol="col-sm-10">
              <Tab.Group onChange={(i) => console.log(i)}>
                <Tab title="选项卡1">
                  这是选项卡1的文字
                </Tab>
                <Tab title="选项卡2">
                  这是选项卡2的文字
                </Tab>
                <Tab title="选项卡3" selected>
                  这是选项卡3的文字
                </Tab>
              </Tab.Group>
            </Form.Item>

            <Form.Item
              label="步骤条" 
              labelCol="col-sm-2"
              controlCol="col-sm-10">
                <Step current={3}>
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
              label="普通输入框"
              labelCol="col-sm-2"
              controlCol="col-sm-10"
              help="写点提示信息吧">
              <Input placeholder="请输入..." id="title" />
            </Form.Item>

            <Form.Item
              required
              label="错误提示的输入框"
              labelCol="col-sm-2"
              controlCol="col-sm-10"
              help="我是错误信息"
              theme="error">
              <Input type="password" placeholder="请输入..." id="password" />
            </Form.Item>

            <Form.Item
              label="警告样式的输入框"
              labelCol="col-sm-2"
              controlCol="col-sm-10"
              help="我是警告信息"
              theme="warning">
              <Input type="email" placeholder="请输入..." />
            </Form.Item>

            <Form.Item
              label="数字输入框"
              labelCol="col-sm-2"
              controlCol="col-sm-10">
              <Input type="number" defaultValue={0} />
            </Form.Item>

            <Form.Item
              label="文本框"
              labelCol="col-sm-2"
              controlCol="col-sm-10"
              help="请输入内容">
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
              <Switch isCheckedText="是" unCheckedText="否" defaultValue={true} /> 设定默认值为true
              <br />
              <Switch disabled /> 禁用状态
              <br />
              <Switch size="sm" value={this.state.switchValue} onChange={(value) => {
                console.log(value)
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
              <Checkbox.Group value={this.state.checkboxValue} onChange={(values) => {
                  console.log('Checkbox to ' + values);
                  this.setState({
                    checkboxValue: values
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
              controlCol="col-sm-10">
              <Select radius placeholder="请选择" style={{width: 120}} value={this.state.selectValue} onChange={(data) => {
                console.log(data)
                this.setState({
                  selectValue : data.value,
                });
              }}>
                <Select.Option value="a">我是A</Select.Option>
                <Select.Option value="b" disabled>我是B</Select.Option>
                <Select.Option value="c">我是C</Select.Option>
                <Select.Option value="d">我是D</Select.Option>
              </Select>

              <Select disabled placeholder="请选择" style={{width: 120}} defaultValue={this.state.selectValue} value={this.state.selectValue}>
                <Select.Option value="a">我是A</Select.Option>
                <Select.Option value="b">我是B</Select.Option>
                <Select.Option value="c">我是C</Select.Option>
                <Select.Option value="d">我是D</Select.Option>
              </Select>

              <Select
                radius
                search
                style={{width: 120}}
                placeholder="请选择"
                searchPlaceholder="输入关键字"
                onSearchChange={(value) => {
                  console.log(value)
                }}
                onChange={(data) => {
                  this.setState({
                    selectValue: data.value
                  });
                }}>
                <Select.Option value="a">我是A</Select.Option>
                <Select.Option value="b">我是B</Select.Option>
                <Select.Option value="c">我是C</Select.Option>
                <Select.Option value="d">我是D</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="多选穿梭框"
              labelCol="col-sm-2"
              controlCol="col-sm-10"
              theme="error"
              help={`您选择了( ${this.state.mulSelectRight.length}项 )`}>
                <div style={{verticalAlign: 'middle'}}>

                  <Select.Multiple radius style={{width: 180, height: 200}} value={this.state.mulSelectLeftValue} onChange={(selectedRows, row) => {
                    this.setState({ mulSelectLeftValue: selectedRows });
                  }}>
                    {
                      this.state.mulSelectLeft.map((option, index) => {
                        return <Select.Option key={index} value={option.value}>{option.name}</Select.Option>
                      })
                    }
                  </Select.Multiple>

                  <span style={{margin: '-10px 10px 0 10px', textAlign: 'center', verticalAlign: 'middle', display: 'inline-block'}}>
                    <Button
                      radius
                      style={{float: 'left', clear: 'both'}}
                      isDisabled={this.state.mulSelectLeftValue.length == 0}
                      onClick={() => {
                        const mulSelectLeft = [...this.state.mulSelectLeft].filter(item => (this.state.mulSelectLeftValue.indexOf(item.value) < 0) && item); 
                        let selected = [...this.state.mulSelectLeft].filter(item => (this.state.mulSelectLeftValue.indexOf(item.value) > -1) && item);
                        let mulSelectRight = this.state.mulSelectRight.concat(selected);
                        this.setState({ 
                          mulSelectLeft, 
                          mulSelectRight,
                          mulSelectLeftValue: [],
                          mulSelectRightValue: []
                      });
                    }}><Icon type="add" /></Button>
                    <Button
                      radius
                      style={{float: 'left', clear: 'both', marginTop: 10}} 
                      isDisabled={this.state.mulSelectRightValue.length == 0}
                      onClick={()=> {
                        const mulSelectRight = [...this.state.mulSelectRight].filter(item => (this.state.mulSelectRightValue.indexOf(item.value) < 0) && item); 
                        let selected = [...this.state.mulSelectRight].filter(item => (this.state.mulSelectRightValue.indexOf(item.value) > -1) && item);
                        let mulSelectLeft = this.state.mulSelectLeft.concat(selected);
                        this.setState({
                          mulSelectLeft,
                          mulSelectRight,
                          mulSelectLeftValue: [],
                          mulSelectRightValue: []
                      });
                    }}><Icon type="minus" /></Button>
                  </span>

                  <Select.Multiple radius style={{width: 180, height: 200}} value={this.state.mulSelectRightValue} onChange={(selectedRows, row) => {
                    this.setState({ mulSelectRightValue: selectedRows });
                  }}>
                    {
                      this.state.mulSelectRight.map((option, index) => {
                        return <Select.Option key={index} value={option.value}>{option.name}</Select.Option>
                      })
                    }
                  </Select.Multiple>
                </div>
            </Form.Item>

            <Form.Item
              label="日历"
              labelCol="col-sm-2"
              controlCol="col-sm-10">
              <Calendar
                style={{display: 'inline-block'}}
                value={this.state.date}
                onChange={(date) => {
                  console.log(date)
                  this.setState({date});
                }}
              />
            </Form.Item>

            <Form.Item
              label="日期选择器"
              labelCol="col-sm-2"
              controlCol="col-sm-10">
              <DatePicker
                radius
                style={{width: 120}}
                // value={this.state.date}
                placeholder="请选择日期"
                onChange={(date) => {
                  console.log(date)
                  this.setState({date});
                }}
              />
            </Form.Item>

            <Form.Item
              label="上传" 
              labelCol="col-sm-2"
              controlCol="col-sm-10">
              <Upload
                style={{marginBottom: 10}}
                multiple
                fileExt=".gif, .jpg, .png"
                startUpload={this.state.startUpload}
                url="http://www.xxx.com"
                data={{
                  attachmentType: 2,
                  policyCategory: 1,
                  objectId      : '20040006',
                  remark        : null
                }}
                onSelect={ file => {
                  console.log(file)
                }}
                onComplete={(file, cb) => {
                  let data = cb.result;
                  let uploadDataSource = this.state.uploadDataSource;
                  uploadDataSource.push({
                    id: data.attachmentId,
                    name: data.attachmentName,
                    url: 'http://www.xxx.com',
                    size: file.size,
                  });
                  this.setState({uploadDataSource});
                }}>
                <Button radius>选择文件并上传</Button>
              </Upload>

              <Upload
                multiple
                fileExt=".gif, .jpg, .png"
                autoUpload={false}
                startUpload={this.state.startUpload}
                url="http://www.xxx.com"
                data={{
                  attachmentType: 2,
                  policyCategory: 1,
                  objectId      : '20040006',
                  remark        : null
                }}
                onSelect={ file => {
                  console.log(file)
                }}
                onComplete={(file, cb) => {
                  let data = cb.result;
                  let uploadDataSource = this.state.uploadDataSource;
                  uploadDataSource.push({
                    id: data.attachmentId,
                    name: data.attachmentName,
                    url: 'http://www.xxx.com',
                    size: file.size,
                  });
                  this.setState({
                    uploadDataSource,
                    startUpload: false
                  });
                }}>
                <div style={{float: 'left', border:'1px dotted #ccc', textAlign: 'center', width: 120, marginRight: 10}}><Icon type="add" />选择文件</div>
              </Upload>

              <Button isLoading={this.state.startUpload} isDisabled={this.state.startUpload} onClick={() => {
                this.setState({
                  startUpload: true
                });
              }}>上传</Button>

              <Upload.List
                radius
                inline
                type="picture"
                dataSource={this.state.uploadDataSource} 
                onDelete={(item) => {
                  let uploadDataSource = [...this.state.uploadDataSource].filter(file => file && (file.id != item.id));
                  this.setState({uploadDataSource});
                }} />
            </Form.Item>

            <Form.Item
              label="滑动输入条"
              labelCol="col-sm-2"
              controlCol="col-sm-10">
              <Slider round min={0} max={300} step={1} defaultValue={80} />
            </Form.Item>

            <Form.Item
              label="进度条"
              labelCol="col-sm-2"
              controlCol="col-sm-10">
              <Progress round percent="30" size="xl" />
              <Progress radius percent="30" theme="warning" size="lg" />
              <Progress percent={this.state.percent} theme="success"
                render={(percent) => {
                  return <div>已处理{percent}项</div>;
                }} />
              <Progress percent="30" theme="info" size="sm" />
              <Progress percent="30" theme="error" size="xs" />
              （待完善）
            </Form.Item>

            <Form.Item
              label="模态框"
              labelCol="col-sm-2"
              controlCol="col-sm-10">
              <Button onClick={() => this._toggleModal()}>zoom</Button>
              <Button onClick={() => this._toggleModal('door')}>door</Button>
              <Button onClick={() => this._toggleModal('flip')}>flip</Button>
              <Button onClick={() => this._toggleModal('rotate')}>rotate</Button>
              <Button onClick={() => this._toggleModal('slideUp')}>slideUp</Button>
              <Button onClick={() => this._toggleModal('slideDown')}>slideDown</Button>
              <Button onClick={() => this._toggleModal('slideLeft')}>slideLeft</Button>
              <Button onClick={() => this._toggleModal('slideRight')}>slideRight</Button>
              <Button onClick={() => this._toggleModal('moveUp')}>moveUp</Button>
              <Button onClick={() => this._toggleModal('moveDown')}>moveDown</Button>
              <Button onClick={() => this._toggleModal('moveLeft')}>moveLeft</Button>
              <Button onClick={() => this._toggleModal('moveRight')}>moveRight</Button>
            </Form.Item>

            <Form.Item
              label="基础组件"
              labelCol="col-sm-2"
              controlCol="col-sm-10">
              <Button onClick={() => this._onClickOpen('mask')}>遮罩层</Button>
              <Button onClick={() => this._onClickOpen('confirm')}>确认框</Button>
              <Button onClick={() => this._onClickOpen('alert')}>警告框</Button>
              <Button onClick={() => this._onClickOpen('loading')}>加载中</Button>
              <Button onClick={() => this._showMessage('this is message.'+(index++))}>消息提示</Button>
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
                  radius
                  defaultValue={this.state.currentPage}
                  pageSize={10}
                  total={324}
                  onPageChange={(value) => {
                    console.log(`您选择了( 第 ${value} 页 )`);
                  }} />

                <Pagination
                  radius
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
              <Panel radius>
                <Panel.Header>
                  <Panel.Title>头部左侧</Panel.Title>
                  <Panel.More>
                    头部右侧
                  </Panel.More>
                </Panel.Header>
                <Panel.Body>
                  内容
                </Panel.Body>
                <Panel.Footer>
                  <Panel.Title>底部左侧</Panel.Title>
                  <Panel.More>
                    底部右侧
                  </Panel.More>
                </Panel.Footer>
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

          <Panel style={{marginTop: 20}}>
            <Panel.Header>
              <Panel.Title>表格</Panel.Title>
              <Panel.More>
                切换Loading状态：
                <Switch size="sm" value={this.state.tableLoading} onChange={(value) => {
                  this.setState({
                    tableLoading: value
                  });
                }} />
              </Panel.More>
            </Panel.Header>
            <Panel.Body style={{padding: 0}}>
              <Table
                striped
                radius
                hover
                isLoading={this.state.tableLoading}
                dataSource={this.state.dataSource}
                columns={[{
                  dataIndex: 'id',
                  width: 50,
                  render: (value, row, index) => {
                    return index + 1;
                  }
                },{
                  title: '姓名',
                  dataIndex: 'name',
                  width: 100,
                  render: (value, row, index) => {
                    return <a href="javascript:;">{value}</a>;
                  },
                  sorter: (a, b) => {
                    return a.name.localeCompare(b.name);
                  }
                },{
                  title: '部门',
                  dataIndex: 'dept',
                  width: 130,
                  render: (value, row, index) => {
                    return (
                      <Select size="sm" value={value} style={{width: 130}}>
                        <Select.Option value="直营部">直营部</Select.Option>
                        <Select.Option value="健康险事业部">健康险事业部</Select.Option>
                        <Select.Option value="金融信保部">金融信保部</Select.Option>
                        <Select.Option value="人力资源部">人力资源部</Select.Option>
                      </Select>
                    );
                  },
                  sorter: (a, b) => {
                    return a.dept.localeCompare(b.dept);
                  }
                },{
                  title: '年龄',
                  dataIndex: 'age',
                  width: 80,
                  render: (value, row, index) => {
                    return <Input size="sm" style={{width: 40}} defaultValue={value} value={value} maxLength="3" onChange={(e) => {
                      let dataSource = this.state.dataSource;
                      dataSource[index].age = e.target.value;
                      this.setState({dataSource});
                    }}/>;
                  },
                  sorter: (a, b) => {
                    return a.age - b.age;
                  }
                },{
                  title: '住址',
                  dataIndex: 'address'
                },{
                  title: '状态',
                  dataIndex: 'state',
                  width: 100,
                  render: (value, row, index) => {
                    return <Switch size="sm" value={value} />;
                  },
                  sorter: (a, b) => {
                    return a.state - b.state;
                  }
                },{
                  title: '操作',
                  dataIndex: 'op',
                  width: 120,
                  render: (value, row, index) => {
                    return (
                      <div style={{color: '#ccc'}}>
                        <a href="javascript:;" onClick={() => this._onClickOpen('alert')}>编辑</a>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <a href="javascript:;" onClick={() => this._onClickOpen('confirm')}>删除</a>
                      </div>
                    );
                  }
                }]}
                rowSelection={{
                  // value: this.state.tableSelection,
                  onSelect: (selected, row, selectedRows) => {
                    console.log(selected, row, selectedRows);
                    let tableSelection = this.state.tableSelection;
                    tableSelection = selectedRows;
                    this.setState({tableSelection});
                  },
                  onSelectAll: (selected, selectedRows) => {
                    console.log(selected, selectedRows);
                    let tableSelection = this.state.tableSelection;
                    tableSelection = selectedRows;
                    this.setState({tableSelection});
                  }
                }}>
              </Table>
            </Panel.Body>
            <Panel.Footer>
              <Panel.More>
                <Pagination
                  bordered
                  value={this.state.currentPage}
                  pageSize={this.state.pageSize}
                  total={324}
                  style={{marginTop: 10}}
                  addonBefore={`共有324条记录 第${this.state.currentPage}/${Math.ceil(324/this.state.pageSize)}页`}
                  addonAfter={
                    <div style={{lineHeight: 1.5}}>
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
                        跳至
                        <Input style={{width: 50, marginLeft: 5, marginRight: 5}} size="sm" value={this.state.inputPage}
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
                          页
                      </span>
                    </div>
                  }
                  onPageChange={(value) => {
                    this.setState({
                      currentPage : value,
                      inputPage   : value,
                    })
                  }} />
              </Panel.More>
            </Panel.Footer>
          </Panel>

          <Modal {...this.state.modalProps}>
            <Modal.Header title="标题" onClose={() => this._toggleModal()}></Modal.Header>
            <Modal.Body height={400}>
              我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this._toggleModal()}>取消</Button>
              <Button theme="success" onClick={() => { alert('你点击了确定') }}>确定</Button>
            </Modal.Footer>
          </Modal>

          <Confirm
            visible={this.state.confirm}
            message="确定要删除吗？"
            onOk={() => this._onClickOpen('alert')}
            onCancel={() => this._onClickClose('confirm')} />

          <Alert
            theme="warning"
            visible={this.state.alert}
            message="这是一个警告框！"
            onClose={() => this._onClickClose('alert')} />

          <Message msg={this.state.msg} duration={1000} theme="success" />

          <Mask
            visible={this.state.mask}
            onClose={() => this._onClickClose('mask')} />
      
        </div>
      </Loading>
    );
  }
}

export default Page1;