import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import Slider from '../../components/Slider';

import '../../styles/index.scss';
import '../styles/pages/Slider.scss';

class SliderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value1: 180,
      value2: 220,
      value3: 50,
      value4: 150
    };
    this.getValue1 = this.getValue1.bind(this);
    this.getValue2 = this.getValue2.bind(this);
    this.getValue3 = this.getValue3.bind(this);
  }
  getValue1(v) {
    this.setState({
      value1: v
    });
  }

  getValue2(v) {
    this.setState({
      value2: v
    });
  }

  getValue3(v, index) {
    index == 0
      ? this.setState({
          value3: v
        })
      : this.setState({
          value4: v
        });
  }

  render() {
    return (
      <div style={{ margin: '20px 20px 0 50px' }}>
        <SliderContainer max={200} />
        max=200, 默认(min=0, defaultValue=0, step =1)
        <SliderContainer
          min={0}
          max={300}
          step={1}
          defaultValue={80}
          round={true}
        />
        min=0, max=300, step=1, defaultValue=80, round=true
        <SliderContainer
          min={40}
          max={400}
          step={5}
          defaultValue={this.state.value1}
          getValue={this.getValue1}
          showTip={false}
          solid={true}
        />
        <Button>{this.state.value1}</Button>
        <div>
          配合其他component显示当前value: min=40, max=600, step=5,
          defaultValue=180, showTip=false, solid=true
        </div>
        <SliderContainer
          min={60}
          max={600}
          step={1}
          defaultValue={this.state.value2}
          getValue={this.getValue2}
          styleWidth={800}
          tipAlwayShow={false}
          round={true}
        />
        <Button>{this.state.value2}</Button>
        <div>
          min=60, max=600, step=1, defaultValue=220, styleWidth=800,
          tipAlwayShow=false
        </div>
        <SliderContainer
          min={0}
          max={10000}
          step={500}
          defaultValue={0}
          styleWidth={300}
        />
        <div>
          有较大step的slider： min=0, max=10000, step=500, defaultValue=0,
          styleWidth=300
        </div>
        <SliderContainer min={-100} max={300} step={1} defaultValue={-50} />
        带负值的slider: min=-100, max=300, step=1, defaultValue=80
        <SliderContainer
          min={-100}
          max={300}
          step={1}
          defaultValue={[50, 150]}
          HandleAmount={2}
          isRange={true}
          getValue={this.getValue3}
        />
        <Button>{this.state.value3}</Button>{' '}
        <Button>{this.state.value4}</Button>
        <div>
          选择范围: min=-100, max=300, step=1, defaultValue=[50, 150],{' '}
          <b>isRange = true</b>, HandleAmount=2
        </div>
        <div>
          <b>范围选择器需设置isRange = true 才会显示中间段的颜色</b>, (better to
          set defaultValue in ascending order)
        </div>
        <SliderContainer
          min={-20}
          max={100}
          step={1}
          defaultValue={[20, 60]}
          HandleAmount={2}
          isRange={true}
          isPass={false}
        />
        <div>min=-20, max=100, step=1, defaultValue=[20, 60]</div>
        <b>
          如需handle之间不越界，除了设置 isRange = true 之外还需设 isPass =
          false 保证handle之间不越界{' '}
        </b>
        <SliderContainer
          min={-100}
          max={800}
          step={1}
          defaultValue={[50, 150, 300, 350, 600, 700]}
          HandleAmount={6}
          styleWidth={800}
          isPass={false}
        />
        多点选择: min=-100, max=800, step=1, defaultValue=[50, 150, 300, 350,
        600, 700], HandleAmount=7, isPass=false
        <div>
          多点选择时handle的数量以HandleAmount为准.
          defaultValue的长度不足的默认为min,多余的将被忽略
        </div>
        <div>better to set defaultValue in ascending order</div>
        <SliderContainer
          min={-100}
          max={800}
          step={1}
          defaultValue={[50, 150, 300, 450, 600]}
          HandleAmount={5}
          isRange={true}
          rangeColors={['blue', 'green', 'yellow', 'orange', 'red']}
          styleWidth={400}
        />
        多点选择: min=-100, max=800, step=1, defaultValue=[50, 150, 300, 450,
        600], HandleAmount=7
        <div>
          isRange = true, rangeColors=['blue', 'green', 'yellow', 'orange',
          'red']
        </div>
        <SliderContainer
          min={-100}
          max={800}
          step={1}
          defaultValue={[50, 150, 300, 450, 600]}
          HandleAmount={5}
          isRange={true}
          isPass={false}
          rangeColors={['#fff', 'orange', 'orange', 'orange', 'orange']}
          styleWidth={400}
        />
        多点选择: min=-100, max=800, step=1, defaultValue=[50, 150, 300, 450,
        600], HandleAmount=7
        <div>
          isRange = true, rangeColors=['#fff', 'orange', 'orange', 'orange',
          'orange']
        </div>
        <SliderContainer
          max={200}
          defaultValue={50}
          theme={'default'}
          round={true}
        />
        theme default: max=200, min=0, defaultValue=50, step =1, round=true
        <SliderContainer
          max={200}
          defaultValue={50}
          theme={'info'}
          solid={true}
        />
        theme info: max=200, min=0, defaultValue=50, step =1, solid=true
        <SliderContainer
          max={200}
          defaultValue={50}
          theme={'success'}
          round={true}
        />
        theme success: max=200, min=0, defaultValue=50, step =1, round=true
        <SliderContainer
          max={200}
          defaultValue={100}
          theme={'warning'}
          solid={true}
          round={true}
        />
        theme warning: max=200, min=0, defaultValue=100, step =1, solid=true,
        round=true
        <SliderContainer max={200} defaultValue={150} theme={'error'} />
        theme error: max=200, min=0, defaultValue=150, step =1,
        <SliderContainer
          min={-300}
          max={300}
          step={1}
          defaultValue={-100}
          customCls="mySlider"
        />
        自定义样式: min=-300, max=300, step=1, defaultValue=-100,
        customCls='mySlider'
      </div>
    );
  }
}

const SliderContainer = ({ ...params }) => {
  return (
    <div style={{ margin: '50px 0 10px' }}>
      <Slider {...params} />
    </div>
  );
};

export default SliderPage;
