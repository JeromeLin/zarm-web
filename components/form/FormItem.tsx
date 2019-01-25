import React, { PureComponent, ReactElement } from 'react';
import PropTypes from 'prop-types';
import Schema from 'async-validator';
import classnames from 'classnames';
import { FormContext, FormItemContext } from './createContext';
import Icon from '../icon';
import { noop } from '../utils';
import { ItemProps, triggerType } from './PropsType';

Schema.warning = noop;

class FormItem extends PureComponent<ItemProps, any> {
  static contextType = FormContext;
  static defaultProps = {
    prefixCls: 'ui-form',
  };
  static propTypes = {
    prop: PropTypes.string,
    rules: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    label: PropTypes.string,
    required: PropTypes.bool,
    isRequired: PropTypes.bool,
  };

  state = {
    validateStatus: '',
    validateMessage: '',
  };

  private initialData;

  componentDidMount () {
    this.initialData = this.recordInitialData();
    this.addFormItem();
  }

  componentWillUnmount () {
    this.removeFormItem();
  }

  recordInitialData () {
    if (!this.context.model) { return; }
    const { prop } = this.props;
    const { model }  = this.context;
    const value = model[prop!];

    return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
  }

  get fieldValue () {
    const { model } = this.context;
    const { prop } = this.props;
    const propArr = prop!.split('.');

    return propArr.length > 1 ? model[propArr[0]][propArr[1]] : model[prop!];
  }

  addFormItem () {
    if ((this.props as ItemProps).prop) {
      this.context.fields.push(this);
    }
  }

  removeFormItem () {
    if ((this.props as ItemProps).prop) {
      const index = this.context.fields.indexOf(this);
      this.context.fields.splice(index, 1);
    }
  }

  getRules () {
    const { rules, prop } = this.props;
    let formRules = this.context.rules;
    let formItemRules = rules;

    formRules = formRules ? formRules[prop!] : [];
    return [].concat(formItemRules || formRules || []);
  }

  getFilteredRules (trigger: triggerType) {
    const rules = this.getRules();
    const filteredRules = rules.filter((rule: any) => !rule.trigger || rule.trigger.includes(trigger));
    return filteredRules;
  }

  validateItem (trigger: triggerType, callback = _ => {}) {
    const { prop } = this.props;
    const rules = this.getFilteredRules(trigger);

    if (!rules || rules.length === 0) { return true; }
    const descriptor = { [prop!]: rules };
    const validator = new Schema(descriptor);
    const model = { [prop!]: this.fieldValue };
    validator.validate(model, { firstFields: true }, errors => {
      this.setState({
        validateStatus: !errors ? 'success' : 'error',
        validateMessage: errors ? errors[0].message : '',
      }, () => {
        callback(this.state.validateMessage);
      });
    });
  }

  resetItem () {
    const { prop } = this.props;

    this.setState({
      validateStatus: '',
      validateMessage: '',
    });

    if (Array.isArray(this.fieldValue) && this.fieldValue.length > 0) {
      this.context.model[prop!] = [];
    } else {
      this.context.model[prop!] = this.initialData;
    }
  }

  getId() {
    const { children } = this.props;
    if ((children as ReactElement<any>).props) {
      return (children as ReactElement<any>).props.id;
    }
  }

  renderLabel() {
    const { id, label, isRequired, prefixCls, prop, rules } = this.props;
    const { labelWidth, labelPosition } = this.context;
    const styleObj: any = {};
    const star =
      ('required' in this.props || isRequired || prop || rules) ? (
        <span className={`${prefixCls}-item-required`}>
          <Icon type="required" />
        </span>
      ) : null;
    if (labelWidth) { styleObj.width = parseInt(labelWidth, 10); }
    if (labelPosition) { styleObj.textAlign = labelPosition; }

    return 'label' in this.props
      ? <label style={{ ...styleObj }} htmlFor={id || this.getId()}>{star}{label}</label> : null;
  }

  renderItemError() {
    const { prefixCls } = this.props;
    const { validateStatus, validateMessage } = this.state;
    const showError = validateStatus === 'error';
    const error = showError ? <div className={`${prefixCls}-item-error`}>{validateMessage}</div> : null;

    return error;
  }

  handleFieldBlur = () => {
    Promise.resolve('blur').then(this.validateItem.bind(this));
  }

  handleFieldChange = () => {
    Promise.resolve('change').then(this.validateItem.bind(this));

  }

  render() {
    const { props, state } = this;
    const { validateStatus } = state;
    const { className, children, style, prefixCls } = props;
    const cls = classnames({
      [`${prefixCls}-item`]: true,
      'has-error': validateStatus === 'error',
      [className!]: !!className,
    });
    const controlCls = classnames({
      [`${prefixCls}-item-control`]: true,
    });

    return (
      <FormItemContext.Provider value={this}>
        <div className={cls} style={style}>
          {this.renderLabel()}
          <div className={controlCls} onBlur={this.handleFieldBlur} onChange={this.handleFieldChange}>
            {children}
            {this.renderItemError()}
          </div>
        </div>
      </FormItemContext.Provider>
    );
  }
}

export default FormItem;
