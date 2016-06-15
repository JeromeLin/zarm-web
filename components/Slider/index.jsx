import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
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
    this.clickhandler = this.clickhandler.bind(this)

    this.draggingPayload  = {
    	isDragging: false,
    	prevX : 0,
    	isThreshhold : false // 是否到达阈值
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
		}, 0)

		this.offsetLeft = domUtil.getLeft(this.refs.sliderBody)
	}

	onHandleDown(e){
		e.stopPropagation()
		e.preventDefault()
		document.body.addEventListener('mousemove', this.onHandleMove , false)
		document.body.addEventListener('mouseup', this.onHandleUp , false)
		// 移除初始化时的transition效果，否则会影响slider的推动
		this.removeTransition = true 

		this.draggingPayload.isDragging  = true
		this.draggingPayload.prevX = e.clientX
	}

	onHandleMove(e){
		e.stopPropagation()
		e.preventDefault()
		if(this.draggingPayload.isDragging){
			
			const {min, max, step, styleWidth, getValue} = this.props
			const mouseMovedDist = e.clientX - this.draggingPayload.prevX
			const percent = mouseMovedDist / (styleWidth || 200)
			const value = percent * ( max - min )
			if( Math.abs(value) >= step ){
				const closestStepToValue = Math.round(value/step) * step
				const newValue = this.state.currentValue + closestStepToValue
				//console.log(newValue)

				if( newValue <= max  && newValue >= min ){
					getValue && getValue(this.state.currentValue + closestStepToValue)
					this.draggingPayload.prevX = e.clientX
					this.draggingPayload.isThreshhold = false
					this.setState({
						currentValue:this.state.currentValue + closestStepToValue
					})
				}else if( newValue > max && !this.draggingPayload.isThreshhold){
					getValue && getValue(max)
					this.draggingPayload.prevX = e.clientX
					this.draggingPayload.isThreshhold = true
					this.setState({
						currentValue: max
					})
				}else if( newValue < min && !this.draggingPayload.isThreshhold ){
					getValue && getValue(min)
					this.draggingPayload.prevX = e.clientX
					this.draggingPayload.isThreshhold = true
					this.setState({
						currentValue: min
					})
				}
			}
		}
	}

	onHandleUp(e){
		e.stopPropagation()
		e.preventDefault()
		document.body.removeEventListener('mousemove', this.onHandleMove , false)
		document.body.removeEventListener('mouseup', this.onHandleUp , false)

		this.draggingPayload.isDragging  = false
	}

	clickhandler(e){
		e.stopPropagation()
		e.preventDefault()
		this.removeTransition = false

		const {min, max, step, styleWidth, getValue} = this.props
		const mouseLeft = e.clientX - this.offsetLeft
		if( mouseLeft < 0 || mouseLeft > (styleWidth || 200) ) return
		const percent = mouseLeft / (styleWidth || 200)
		const value = Math.floor(percent * (max - min)) + min
		const delta = value - this.state.currentValue
		if ( Math.abs(delta) >= step ){
			const closestStepToDelta = Math.round(delta/step) * step

			getValue && getValue(this.state.currentValue + closestStepToDelta)
			this.setState({
				currentValue:this.state.currentValue + closestStepToDelta
			})
		}
	}

	render(){
		const {min, max, step, defaultValue, styleWidth, showTip, tipAlwayShow, customCls} = this.props
		const percent = (this.state.currentValue - min) / (max - min) * 100 

		const styleWidthObj = {
			width : (styleWidth || 200) + 'px' 
		}
		const tipClass = classnames({
			'ui-slider-tip' : true,
			'ui-slider-tip-show' : tipAlwayShow
		})
		const customClass = classnames({
			'ui-slider-wraper' : true,
			[customCls] : customCls
		})

		const tip = (<em className={tipClass}>{this.state.currentValue}</em>)
		const transitionArray = ['WebkitTransition', 'MozTransition', 'msTransition', 'OTransition', 'Transition']
		const styleObj = {
			handle : { left: `${percent}%` },
			back : { width: `${percent}%` },
		}

		if(!this.removeTransition){
			transitionArray.forEach(( transition ) => {
				styleObj.handle[ transition ] = 'left 0.6s ease-out'
				styleObj.back[ transition ] = 'width 0.6s ease-out'
			})
		}

		return(
			<div className={customClass}>
				<div className='ui-slider-horizontal' style = { styleWidthObj } ref='sliderBody' onClick = { this.clickhandler }>
					<span className='ui-slider-handle' style = { styleObj.handle }
								onMouseDown = { this.onHandleDown }
								onMouseMove = { this.onHandleMove } 
								onMouseUp = { this.onHandleUp } 
								onClick = {(e) => e.stopPropagation()}>
					{showTip && tip}
					</span>
					<div className='ui-slider-back' style = { styleObj.back }></div>
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
	getValue : PropTypes.func,
	showTip : PropTypes.bool,
	tipAlwayShow : PropTypes.bool,
	customCls : PropTypes.string
}

Slider.defaultProps = {
	min : 0,
	step : 1,
	defaultValue : 0,
	showTip : true,
	tipAlwayShow: true
}
