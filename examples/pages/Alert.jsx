import Markdown from '../components/markdown';
import '../../components/Alert/style';
import '../../components/Button/style';
import '../../components/Icon/style';

export default class Alert extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/alert.md');
  }
}

