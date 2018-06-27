import Markdown from '../components/markdown';
import '../../components/Progress/style';

export default class Progress extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/progress.md');
  }
}
