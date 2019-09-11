import React, { PureComponent, ReactElement, createRef } from 'react';
import PropTypes from 'prop-types';
import Schema from 'async-validator';
import classnames from 'classnames';
import { FormContext, FormItemContext } from './createContext';
import Icon from '../icon';
import { noop } from '../utils';
import Transition from '../transition';
import { ItemProps, triggerType } from './PropsType';

Schema.warning = noop;

class FormItem extends PureComponent<ItemProps, any> {
  static contextType = FormContext;

  static defaultProps = {
    prefixCls: 'za-form',
    required: false,
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    required: PropTypes.bool,
  };

  private initialData;

  private validateMessage: string;

  private formItemInstance: any;

  constructor(props) {
    super(props);

    this.formItemInstance = createRef<HTMLDivElement>();
    this.validateMessage = '';
    this.state = {
      validateStatus: '',
    };
  }

  componentDidMount() {
    this.initialData = this.recordInitialData();
    this.addFormItem();
  }

  componentWillUnmount() {
    this.removeFormItem();
  }

  get fieldValue() {
    const { model } = this.context;
    const { prop } = this.props;
    const propArr = prop!.split('.');

    return propArr.length > 1 ? model[propArr[0]][propArr[1]] : model[prop!];
  }

  getRules() {
    const { rules, prop } = this.props;
    const { rules: contextRules } = this.context;
    let formRules = contextRules;
    const formItemRules = rules;

    formRules = formRules ? formRules[prop!] : [];
    return [].concat(formItemRules || formRules || []);
  }

  getFilteredRules(trigger: triggerType) {
    const rules = this.getRules();
    const filteredRules = rules.filter((rule: any) => !rule.trigger || rule.trigger.includes(trigger));
    return filteredRules;
  }

  getId() {
    const { children } = this.props;
    if ((children as ReactElement<any>).props) {
      return (children as ReactElement<any>).props.id;
    }
  }

  getControlNode() {
    return this.formItemInstance.current;
  }

  handleFieldBlur = () => {
    Promise.resolve('blur').then(this.validateItem.bind(this));
  };

  handleFieldChange = () => {
    Promise.resolve('change').then(this.validateItem.bind(this));
  };

  validateItem(trigger: triggerType, callback: (messge: string) => void = () => {}) {
    const { prop } = this.props;
    const rules = this.getFilteredRules(trigger);

    if (!rules || rules.length === 0) { return true; }
    const descriptor = { [prop!]: rules };
    const validator = new Schema(descriptor);
    const model = { [prop!]: this.fieldValue };
    validator.validate(model, { firstFields: true }, (errors) => {
      this.validateMessage = errors ? errors[0].message : '';
      this.setState({
        validateStatus: !errors ? 'success' : 'error',
      }, () => {
        callback(this.validateMessage);
      });
    });
  }

  resetItem() {
    const { prop } = this.props;
    const { model } = this.context;

    this.setState({
      validateStatus: '',
    });
    this.validateMessage = '';

    if (Array.isArray(this.fieldValue) && this.fieldValue.length > 0) {
      model[prop!] = [];
    } else {
      model[prop!] = this.initialData;
    }
  }

  recordInitialData() {
    const { model } = this.context;
    if (!model) { return; }
    const { prop } = this.props;
    const value = model[prop!];

    return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
  }

  addFormItem() {
    const { fields } = this.context;
    if ((this.props as ItemProps).prop) {
      fields.push(this);
    }
  }

  removeFormItem() {
    const { fields } = this.context;
    if ((this.props as ItemProps).prop) {
      const index = fields.indexOf(this);
      fields.splice(index, 1);
    }
  }

  renderLabel() {
    const { id, label, prefixCls, prop, rules, required } = this.props;
    const { labelWidth } = this.context;
    const styleObj: any = {};
    const star = (required || prop || rules) ? (
      <span className={`${prefixCls}-item--required`}>
        <Icon type="required" />
      </span>
    ) : null;
    if (labelWidth) { styleObj.width = parseInt(labelWidth, 10); }

    return 'label' in this.props
      ? (
        <label className="za-form-item__label" style={{ ...styleObj }} htmlFor={id || this.getId()}>
          {star}
          {label}
        </label>
      ) : null;
  }

  render() {
    const { validateStatus } = this.state;
    const { className, children, style, prefixCls } = this.props;
    const cls = classnames({
      [`${prefixCls}-item`]: true,
      'has-error': validateStatus === 'error',
      [className!]: !!className,
    });
    const controlCls = classnames({
      [`${prefixCls}-item__control`]: true,
    });

    return (
      <FormItemContext.Provider value={this}>
        <div className={cls} style={style} ref={this.formItemInstance}>
          {this.renderLabel()}
          <div className={controlCls} onBlur={this.handleFieldBlur} onChange={this.handleFieldChange}>
            {children}
            <Transition name="scaleDown" visible={validateStatus === 'error'}>
              <div className={`${prefixCls}-item__error`}>{this.validateMessage}</div>
            </Transition>
          </div>
        </div>
      </FormItemContext.Provider>
    );
  }
}

export default FormItem;
