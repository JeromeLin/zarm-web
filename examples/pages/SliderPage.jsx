import React, { Component, PropTypes } from 'react';
import Slider from '../../components/Slider';

import '../../styles/index.scss';

class SliderPage extends Component{

	render(){
		return(
			<div>
				<SliderContainer />
			</div>
		)
	}
}

class SliderContainer extends Component{

	render(){
		return(
			<div>
			 <Slider/>
			</div>
		)
	}
}

export default SliderPage