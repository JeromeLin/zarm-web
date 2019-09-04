import React, { HTMLAttributes, PureComponent } from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormContext } from './createContext';
import PropsType, { ItemProps } from './PropsType';
import FormItem from './FormItem';

class Form extends PureComponent<PropsType & HTMLAttributes<HTMLDivElement>> {
  static Item: typeof FormItem;
  static defaultProps = {
    prefixCls: 'ui-form',
    type: 'horizontal',
    labelPosition: '',
    scrollToError: false,
    onSubmit: () => {},
    labelWidth: '',
    rules: null,
    model: null,
  };
  static propTypes = {
    prefixCls: PropTypes.string,
    type: PropTypes.oneOf(['horizontal', 'inline']),
    labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    labelPosition: PropTypes.oneOf(['left', 'right', '']),
    rules: PropTypes.instanceOf(Object),
    model: PropTypes.instanceOf(Object),
    onSubmit: PropTypes.func,
  };

  static scrollToError(field) {
    const fieldNode = field.getControlNode();
    const nodeBound = (fieldNode as Element).getBoundingClientRect();
    const y = nodeBound.top + window.scrollY;
    const x = nodeBound.left + window.scrollX;
    window.scroll(x, y);
  }

  state = {
    fields: [],
  };

  validate(callback) {
    const { fields } = this.state;
    const { scrollToError } = this.props;
    const fieldsLength = fields.length;

    return new Promise((resolve) => {
      let validateResult = true;
      let count = 0;
      const errorsArr: Array<object> = [];

      fields.forEach((field: any) => {
        field.validateItem('', (errors) => {
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
              Form.scrollToError(errorsArr[0]);
            }
          }
        });
      });
    });
  }

  validateField(prop, callback) {
    const { fields } = this.state;
    const field: any = fields.filter((fieldItem: ItemProps & { props: ItemProps }) => fieldItem.props.prop === prop)[0];

    if (!field) {
      throw new Error('please check a exist prop for validateField function');
    }

    field.validateItem('', callback);
  }

  resetField() {
    const { fields } = this.state;
    fields.forEach((field: any) => field.resetItem());
  }

  onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    const { onSubmit } = this.props;
    event.preventDefault();
    if (typeof onSubmit === 'function') {
      onSubmit(event);
    }
  };

  render() {
    const { type, className, children, style, prefixCls, labelWidth, labelPosition } = this.props;
    const cls = classnames(className, prefixCls, {
      [`${prefixCls}-${type}`]: 'type' in this.props,
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
