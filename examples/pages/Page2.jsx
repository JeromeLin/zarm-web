
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import {
  Step
} from '../../components';

import '../styles/pages/Page2.scss';

class Page2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    }
  }

  componentDidMount() {
    let dataSource = this.state.dataSource;
    for (var i = 0; i < 1000; i++) {
      dataSource.push(i);
    }
    
    setTimeout(() => {
      this.setState({dataSource});
    }, 1000);
  }

  render() {
    return (
      <div>
        <p>This is Page2</p>
        <p><Link to="/page1">=> Goto Page1</Link></p>
        <p><a href="#" onClick={() => { this.props.history.goBack() }}>GoBack</a></p>

        <Step current={3}>
          <Step.Item>投保单基本信息</Step.Item>
          <Step.Item>投保单位录入</Step.Item>
          <Step.Item>产品选择</Step.Item>
          <Step.Item>总单险种定义</Step.Item>
          <Step.Item>计划创建</Step.Item>
          <Step.Item>被保人清单导入</Step.Item>
          <Step.Item>录入完成</Step.Item>
        </Step>
        <div>
          {
            this.state.dataSource.map((item, index) => {
              return <div key={index}>1111</div>;    
            })
          }
        </div>
      </div>
    );
  }
}

export default Page2;