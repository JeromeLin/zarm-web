import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormContext } from './createContext';
import PropsType, { ItemProps } from './PropsType';
import { noop } from '../utils';

class Form extends PureComponent<PropsType, any> {
  static defaultProps = {
    prefixCls: 'za-form',
    className: null,
    labelPosition: 'right',
    scrollToError: false,
    onSubmit: noop,
  };
  static propTypes = {
    labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    labelPosition: PropTypes.oneOf(['left', 'right', 'top']),
    rules: PropTypes.object,
    model: PropTypes.object,
    scrollToError: PropTypes.bool,
    onSubmit: PropTypes.func,
  };

  state = {
    fields: [],
  };

  validate (callback) {
    const { fields } = this.state;
    const { scrollToError } = this.props;
    const fieldsLength = fields.length;

    return new Promise(resolve => {
      let validateResult = true;
      let count = 0;
      let errorsArr: Array<object> = [];

      fields.forEach((field: any) => {
        field.validateItem('', errors => {
          if (errors) {
            validateResult = false;
            errorsArr.push(field);
          }
          if (++count === fieldsLength) {
            resolve(validateResult);
            if (callback instanceof Function) {
              callback(validateResult);
            }
            if (scrollToError && !validateResult) {
              this.scrollToError(errorsArr[0]);
            }
          }
        });
      });
    });
  }

  validateField (prop, callback) {
    const field: any = this.state.fields.filter((field: ItemProps & { props: ItemProps }) => field.props.prop === prop)[0];

    if (!field) {
      throw new Error('please check a exist prop for validateField function');
    }

    field.validateItem('', callback);
  }

  resetField () {
    const { fields } = this.state;
    fields.forEach((field: any) => field.resetItem());
  }

  scrollToError (field) {
    const fieldNode = field.getControlNode();
    const nodeBound = (fieldNode as Element).getBoundingClientRect();
    const y = nodeBound.top + window.scrollY;
    const x = nodeBound.left + window.scrollX;
    scroll(x, y);
  }

  onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    const { onSubmit } = this.props;
    event.preventDefault();
    if (typeof onSubmit === 'function') {
      onSubmit(event);
    }
  }

  render() {
    const { className, children, style, prefixCls, labelWidth, labelPosition } = this.props;
    const cls = classnames({
      [prefixCls!]: true,
      [`${prefixCls}--label-${labelPosition}`]: labelPosition,
      [className!]: !!className,
    });
    const contextValue = {
      fields: this.state.fields,
      rules: this.props.rules,
      model: this.props.model,
      labelWidth,
      labelPosition,
    };

    return (
      <FormContext.Provider value={contextValue}>
        <form className={cls} style={style} onSubmit={this.onSubmit}>
          {children}
        </form>
      </FormContext.Provider>
    );
  }
}

export default Form;
