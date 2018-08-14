import Markdown from '../components/markdown';
import '../../components/popconfirm/style';
import '../../components/button/style';

export default class Popconfirm extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/popconfirm.md');
  }
}
