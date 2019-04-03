import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormContext } from './createContext';
import PropsType, { ItemProps } from './PropsType';

class Form extends PureComponent<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-form',
    type: 'horizontal',
    className: null,
    labelPosition: 'right',
  };
  static propTypes = {
    type: PropTypes.oneOf(['horizontal', 'inline']),
    labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    labelPosition: PropTypes.oneOf(['left', 'right']),
    rules: PropTypes.object,
    model: PropTypes.object,
  };

  state = {
    fields: [],
  };

  validate (callback) {
    const { fields } = this.state;
    const fieldsLength = fields.length;

    return new Promise(resolve => {
      let validateResult = true;
      let count = 0;

      fields.forEach((field: any) => {
        field.validateItem('', errors => {
          if (errors) {
            validateResult = false;
          }
          if (++count === fieldsLength) {
            resolve(validateResult);
            if (callback instanceof Function) {
              callback(validateResult);
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

  onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  render() {
    const { type, className, children, style, prefixCls, labelWidth, labelPosition } = this.props;
    const cls = classnames({
      [prefixCls!]: true,
      [`${prefixCls}-${type}`]: 'type' in this.props,
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
