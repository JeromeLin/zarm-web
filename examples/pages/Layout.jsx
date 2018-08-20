import Markdown from '../components/markdown';
import '../../components/layout/style';

export default class Layout extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/layout.md');
  }
}
