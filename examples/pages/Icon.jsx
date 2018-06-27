import Markdown from '../components/markdown';
import '../../components/Icon/style';

export default class Icon extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/icon.md');
  }
}
