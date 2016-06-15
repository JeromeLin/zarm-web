import React, { Component, PropTypes } from 'react';
import domUtil from '../utils/dom';
export default class Slider extends Component{
	constructor(props){
		super(props)
    this.state = {
      currentValue : 0
    }

    this.onHandleDown = this.onHandleDown.bind(this)
    this.onHandleMove = this.onHandleMove.bind(this)
    this.onHandleUp = this.onHandleUp.bind(this)

    this.draggingPayload  = {
    	isDragging: false,
    	prevX : 0
    }
	}

	componentDidMount(){		
		setTimeout(() => {
			const { min, max, defaultValue } = this.props
			const initValue = defaultValue < min ? min : 
												(defaultValue > max ?
													max : defaultValue
												)
			this.setState({
				currentValue:initValue
			})
		},0)

		this.offsetLeft = domUtil.getLeft(this.refs.sliderBody)
	}

	onHandleDown(e){
		e.stopPropagation()
		e.preventDefault()
		document.body.addEventListener('mousemove', this.onHandleMove , false)
		document.body.addEventListener('mouseup', this.onHandleUp , false)

		this.draggingPayload.isDragging  = true
		this.draggingPayload.prevX = e.clientX
	}

	onHandleMove(e){
		e.stopPropagation()
		e.preventDefault()
		if(this.draggingPayload.isDragging){
			
			const {min, max, step, styleWidth, getValue} = this.props
			const mouseLeft = e.clientX - this.offsetLeft
			const percent = mouseLeft / (styleWidth || 200)
			const realPercent = percent > 1 ? 1 : 
								(percent < 0 ? 0 : percent)
			if( percent < 1.05 && percent > -0.05 ){
				const value = Math.floor(realPercent * (max - min)) + min
				if (value % step == 0){
					this.setState({
						currentValue:value
					})
					getValue && getValue(this.state.currentValue)
				}
			}
		}
	}

	onHandleUp(e){
		e.stopPropagation()
		e.preventDefault()
		document.body.removeEventListener('mousemove', this.onHandleMove , false)
		document.body.removeEventListener('mouseup', this.onHandleUp , false)

		this.draggingPayload.prevX = e.clientX
		this.draggingPayload.isDragging  = false
	}

	render(){
		const {min, max, step, defaultValue, styleWidth} = this.props
		const percent = (this.state.currentValue - min) / (max - min) * 100 

		//console.log(this.state.currentValue)
		const styleObj = {
			width : (styleWidth || 200) + 'px' 
		}
		return(
			<div className='ui-slider-wraper'>
				<div className='ui-slider-horizontal' style={styleObj} ref='sliderBody'>
					<span className='ui-slider-handle' 
								style={{left:`${percent}%`}}
								onMouseDown = {this.onHandleDown}
								onMouseMove = {this.onHandleMove} 
								onMouseUp = {this.onHandleUp} >
					</span>
					<div className='ui-slider-back' style={{width:`${percent}%`}}></div>
				</div>
			</div>
		)
	}
}

Slider.propTypes = {
	min : PropTypes.number,
	max : PropTypes.number.isRequired,
	step : PropTypes.number,
	defaultValue : PropTypes.number,
	styleWidth: PropTypes.number,
	getValue:PropTypes.func
}

Slider.defaultProps = {
	min : 0,
	step : 1,
	defaultValue : 0
}
