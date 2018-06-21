import Markdown from '../components/markdown';
import '../../components/Tag/style';
import '../../components/Icon/style';

export default class Alert extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/tag.md');
  }
}
