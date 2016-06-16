"use strict";

const domUtil = {

	//获取元素的纵坐标（相对于窗口）
	getTop: (e) => {
	    let offset = e.offsetTop;
	    if(e.offsetParent != null) offset += domUtil.getTop(e.offsetParent);
	    return offset;
	},

	//获取元素的横坐标（相对于窗口）
	getLeft: (e) => {
	    let offset = e.offsetLeft;
	    if(e.offsetParent != null) offset += domUtil.getLeft(e.offsetParent);
	    return offset;
	}
}

export default domUtil