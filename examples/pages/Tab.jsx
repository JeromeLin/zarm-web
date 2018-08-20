import Markdown from '../components/markdown';
import '../../components/tab/style';

export default class Tab extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/tab.md');
  }
}
