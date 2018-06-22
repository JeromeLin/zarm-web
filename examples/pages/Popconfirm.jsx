import Markdown from '../components/markdown';
import '../../components/Popconfirm/style';
import '../../components/Button/style';

export default class Popconfirm extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/popconfirm.md');
  }
}
