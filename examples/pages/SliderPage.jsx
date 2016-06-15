import React, { Component, PropTypes } from 'react';
import Button from '../../components/Button';
import Slider from '../../components/Slider';

import '../../styles/index.scss';

class SliderPage extends Component{
	constructor(props){
		super(props)
		this.state = {
			value1:0,
			value2:0
		}
		this.getValue1 = this.getValue1.bind(this)
		this.getValue2 = this.getValue2.bind(this)
	}
	getValue1(v){
		this.setState({
			value1:v
		})
	}

	getValue2(v){
		this.setState({
			value2:v
		})
	}

	componentDidMount(){

	}

	render(){
		return(
			<div style={{margin:'20px 20px 0 50px'}}>

				max = 200, 默认(min = 0, defaultValue = 0, step =1)
				<SliderContainer max = {200}/>
				min = 0, max = 300, step = 1, defaultValue = 80
				<SliderContainer min = {0} max = {300} step = {1} defaultValue = {80} />
				<div>min = 40, max = 600, step = 10, defaultValue = 180</div>
				<SliderContainer min = {40} max = {400} step = {10} defaultValue = {180} getValue = {this.getValue1}/>
				<Button>{this.state.value1}</Button>
			
				<div>min = 40, max = 600, step = 1, defaultValue = 220, styleWidth = 800</div>
				<SliderContainer min = {40} max = {600} step = {1} defaultValue = {220} 
													getValue = {this.getValue2} styleWidth={800}/>
				<Button>{this.state.value2}</Button>
			</div>
		)
	}
}

const SliderContainer = ({
	...params
}) => {
	return(
		<div>
		 <Slider {...params}/>
		</div>
	)
}

export default SliderPage