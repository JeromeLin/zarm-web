import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import domUtil from '../utils/dom';
export default class Slider extends Component{

	constructor(props){
		super(props)
		const {HandleAmount} = this.props
		let states = {}, prevXs = {}, i = 0
		while(i < HandleAmount){
			states = Object.assign(states,{[`currentValue${i}`] : 0})
			i++
		}
    this.state = states

    this.onHandleDown = this.onHandleDown.bind(this)
    this.onHandleMove = this.onHandleMove.bind(this)
    this.onHandleUp = this.onHandleUp.bind(this)
    this.clickhandler = this.clickhandler.bind(this)

    this.draggingPayload  = {
    	isDragging: false,
    	prevX : 0,
    	isThreshhold : false, // 是否到达阈值
    	handleMove : undefined, //记录匿名函数的指针
    	handleUp : undefined, //记录匿名函数的指针
    }
	}

	componentDidMount(){		
		setTimeout(() => {
			const { min, max, HandleAmount, defaultValue } = this.props
			let states = {}, i = 0
			const dv = this.isArray(defaultValue) ? defaultValue : [defaultValue]
			
			while( i < HandleAmount ){
				if(dv[i] === undefined) dv[i] = min
				states[`currentValue${i}`] = this.validateDefault(dv[i], min, max)
				i++
			}
			this.setState( states )
		}, 0)

		this.offsetLeft = domUtil.getLeft(this.refs.sliderBody)
		this.isTouchSuported = domUtil.probTouch()
	}

	onHandleDown(i){
		return (e) => {
			e.stopPropagation()
			e.preventDefault()
			this.draggingPayload.handleMove = this.onHandleMove(i)
			this.draggingPayload.handleUp = this.onHandleUp(i)
			if(!this.isTouchSuported){
				document.body.addEventListener('mousemove', this.draggingPayload.handleMove , false)
				document.body.addEventListener('mouseup', this.draggingPayload.handleUp , false)
			}else{
				document.body.addEventListener('touchmove', this.draggingPayload.handleMove , false)
				document.body.addEventListener('touchend', this.draggingPayload.handleUp , false)
			}
			// 移除初始化时的transition效果，否则会影响slider的推动
			this.removeTransition = true 

			this.draggingPayload.isDragging  = true
			this.draggingPayload.prevX = this.isTouchSuported ? e.touches[0].clientX : e.clientX
		}
	}

	onHandleMove(i){
		return (e) => {
			e.stopPropagation()
			e.preventDefault()
			if(this.draggingPayload.isDragging){
				
				const {min, max, step, styleWidth, getValue} = this.props
				const mouseMovedDist = ((this.isTouchSuported && e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX) - this.draggingPayload.prevX
				const percent = mouseMovedDist / (styleWidth || 200)
				const value = percent * ( max - min )
				if( Math.abs(value) >= step ){
					//寻找最接近value的step倍数
					const closestStepToValue = Math.round(value/step) * step
					const newValue = this.state[`currentValue${i}`] + closestStepToValue
					//console.log(newValue)

					if( newValue <= max  && newValue >= min ){
						getValue && getValue(this.state[`currentValue${i}`] + closestStepToValue, i)
						this.draggingPayload.prevX = (this.isTouchSuported && e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX
						this.draggingPayload.isThreshhold = false
						this.setState({
							[`currentValue${i}`]:this.state[`currentValue${i}`] + closestStepToValue
						})
					}else if( newValue > max && !this.draggingPayload.isThreshhold){
						getValue && getValue(max, i)
						this.draggingPayload.prevX = (this.isTouchSuported && e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX
						this.draggingPayload.isThreshhold = true
						this.setState({
							[`currentValue${i}`]: max
						})
					}else if( newValue < min && !this.draggingPayload.isThreshhold ){
						getValue && getValue(min, i)
						this.draggingPayload.prevX = this.isTouchSuported ? e.touches[0].clientX : e.clientX
						this.draggingPayload.isThreshhold = true
						this.setState({
							[`currentValue${i}`]: min
						})
					}
				}
			}
		}
	}

	onHandleUp(i){
		return (e) => {
			e.stopPropagation()
			e.preventDefault()
			if(!this.isTouchSuported){
				document.body.removeEventListener('mousemove', this.draggingPayload.handleMove , false)
				document.body.removeEventListener('mouseup', this.draggingPayload.handleUp, false)
			}else{
				document.body.removeEventListener('touchmove', this.draggingPayload.handleMove , false)
				document.body.removeEventListener('touchend', this.draggingPayload.handleUp, false)
			}
			this.draggingPayload.isDragging  = false
		}
	}

	clickhandler(e){
		e.stopPropagation()
		e.preventDefault()
		this.removeTransition = false

		const {min, max, step, styleWidth, getValue} = this.props
		//此处用pageX,兼容有x轴滚动条的情况
		const mouseLeft = e.pageX - this.offsetLeft
		if( mouseLeft < 0 || mouseLeft > (styleWidth || 200) ) return
		const percent = mouseLeft / (styleWidth || 200)
		const value = Math.floor(percent * (max - min)) + min
		//寻找最接近的handle的value值
		const closestHandleValue = this.findClosestHandle(this.state, value)
		const handleIndex = this.findHandleIndex(this.state, closestHandleValue )

		const delta = value - closestHandleValue
		if ( Math.abs(delta) >= step ){
			const closestStepToDelta = Math.round(delta/step) * step
			getValue && getValue(this.state[`currentValue${handleIndex}`] + closestStepToDelta, handleIndex)
			this.setState({
				[`currentValue${handleIndex}`] : this.state[`currentValue${handleIndex}`] + closestStepToDelta
			})
		}
	}

	validateDefault(defaultValue, min, max){
		return defaultValue < min ? min : 
												(defaultValue > max ?
													max : defaultValue
												)
	}

	isArray(ele){
		return Object.prototype.toString.call(ele) === '[object Array]'
	}

	findClosestHandle(state, value){
		let states = Object.keys(state)
		states = states.map((v) => {
			return this.state[v]
		})
		return states.reduce((pre, cur, index) => {
			return value > Math.max( pre, cur ) ? Math.max( pre, cur ) : 
					(	value < Math.min( pre, cur ) ? Math.min( pre, cur ) : (
						Math.abs(value - pre ) < Math.abs(value -cur ) ? pre : cur
					)
			)
		}, this.state[`currentValue${0}`])
	}

	findHandleIndex(state, v){
		let states = Object.keys(state)
		states = states.map((v) => {
			return this.state[v]
		})
		return states.indexOf(v)
	}

	render(){
		const {min, max, step, defaultValue, styleWidth, showTip, tipAlwayShow, customCls, theme, HandleAmount, defaultRange} = this.props
		
		const dv = this.isArray(defaultValue) ? defaultValue : [defaultValue]
		const percentArr = [], styleObjArr = [] , handles = [], tipArr = []

		const styleWidthObj = {
			width : (styleWidth || 200) + 'px' 
		}
		const tipClass = classnames({
			'ui-slider-tip' : true,
			'ui-slider-tip-show' : tipAlwayShow
		})
		const customClass = classnames({
			'ui-slider-wraper' : true,
			[customCls] : customCls,
			[theme] : theme
		})

		const transitionArray = ['WebkitTransition', 'MozTransition', 'msTransition', 'OTransition', 'Transition']

		let i = 0
		while(i < HandleAmount){
			let percent = (this.state[`currentValue${i}`] - min) / (max - min) * 100
			percentArr.push( percent ) 

			styleObjArr.push({
				handle : { left: `${percent}%` },
				back : { width: `${percent}%` },
			})
			if(!this.removeTransition){
				transitionArray.forEach(( transition ) => {
					styleObjArr[i].handle[ transition ] = 'left 0.6s ease-out'
					styleObjArr[i].back[ transition ] = 'width 0.6s ease-out'
				})
			}
			tipArr.push( (<em className={tipClass}>{this.state[`currentValue${i}`]}</em>) )
			handles.push(
				<span key = {`handleKey${i}`} className='ui-slider-handle' style = { styleObjArr[i].handle }
								onMouseDown = { !this.isTouchSuported && this.onHandleDown(i) }
								onMouseMove = { !this.isTouchSuported && this.onHandleMove(i) } 
								onMouseUp = { !this.isTouchSuported && this.onHandleUp(i) } 
								onClick = {(e) => e.stopPropagation()}
								onTouchStart = {this.isTouchSuported && this.onHandleDown(i)}
								onTouchMove =  {this.isTouchSuported && this.onHandleMove(i)}
								onTouchEnd = {this.isTouchSuported && this.onHandleMove(i)}>
					{showTip && tipArr[i]}
				</span>
			)
			i++
		}
		
		return(
			<div className={customClass}>
				<div className='ui-slider-horizontal' style = { styleWidthObj } ref='sliderBody' onClick = { this.clickhandler }>
				{handles}
				{!this.isArray(defaultValue) && <div className='ui-slider-back' style = { styleObjArr[0].back }></div>}
				</div>
			</div>
		)
	}
}

Slider.propTypes = {
	min : PropTypes.number,
	max : PropTypes.number.isRequired,
	step : PropTypes.number,
	defaultValue : PropTypes.oneOfType([
										PropTypes.number, 
										PropTypes.array]),
	styleWidth: PropTypes.number,
	getValue : PropTypes.func,
	showTip : PropTypes.bool,
	tipAlwayShow : PropTypes.bool,
	customCls : PropTypes.string,
	theme : PropTypes.string,
	HandleAmount : PropTypes.number,
}

Slider.defaultProps = {
	min : 0,
	step : 1,
	defaultValue : 0,
	showTip : true,
	tipAlwayShow: true,
	HandleAmount : 1,
}
