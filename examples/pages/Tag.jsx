import Markdown from '../components/markdown';
import '../../components/tag/style';
import '../../components/icon/style';

export default class Alert extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/tag.md');
  }
}
