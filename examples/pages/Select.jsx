import Markdown from '../components/markdown';
import '../../components/Select/style';

export default class Select extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/select.md');
  }
}
