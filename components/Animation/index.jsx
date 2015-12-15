
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Animation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShow    : false,
      isClosing : false,
    };
  }

  // componentWillMount() {
  //   console.log('componentWillMount');
  // }

  componentDidMount() {
    // console.log('componentDidMount');
    // console.log(this.refs.dialog);
    window.addEventListener("webkitAnimationEnd", () => {
      if (this.state.isClosing) {
        this.setState({
          isShow : false,
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setState({
        isShow    : true,
        isClosing : false,
      });
    } else {
      this.setState({
        isClosing : true,
      });
    }
  }

  render () {
    const props = this.props;
    const { visible, animationType, animationDuration, children, ...others } = props;


    const classes =  classnames({
      [animationType + '-enter'] : visible,
      [animationType + '-leave'] : !visible,
    });

    const style = {
      WebkitAnimationDuration : animationDuration + 'ms',
      MozAnimationDuration    : animationDuration + 'ms',
      msAnimationDuration     : animationDuration + 'ms',
      OAnimationDuration      : animationDuration + 'ms',
      animationDuration       : animationDuration + 'ms',
    };

    // children.props.className = "ui-modal-container"
    // console.log(children.props.className);
    // console.log(React.Children.only(children));
    var a = React.Children.only(children);
    return a;
  }

}

Animation.propTypes = { 
  animationType     : PropTypes.oneOf(['fade', 'scale', 'slide', 'rotate']),
  animationDuration : PropTypes.number,
};

Animation.defaultProps = {
  animationType     : 'scale',
  animationDuration : 300,
};

export default Animation;

