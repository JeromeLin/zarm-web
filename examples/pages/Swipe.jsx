import Markdown from '../components/markdown';
import '../../components/swipe/style';

export default class Swipe extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/swipe.md');
  }
}
