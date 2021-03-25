import Popconfirm from './Popconfirm';
import PopconfirmProps, { PopconfirmDirection } from './PropsType';
import ConfigReceiver from '../config-receiver';

export { PopconfirmProps, PopconfirmDirection };

export default ConfigReceiver('Popconfirm')(Popconfirm);
