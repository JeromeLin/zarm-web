import { Radio as zarmRadio } from 'zarm';

const Radio = zarmRadio;
Radio.defaultProps.prefixCls = 'zw-radio';
Radio.Group.defaultProps.prefixCls = 'zw-radio-group';
Radio.Group.defaultProps.compact = true;
// Radio.Group.defaultProps.ghost = true;
Radio.Group.defaultProps.size = 'md';

export default Radio;
