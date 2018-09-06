import Markdown from '../components/markdown';
import '../../components/alert/style';
import '../../components/button/style';
import '../../components/icon/style';

export default class Alert extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/alert.md');
  }
}

