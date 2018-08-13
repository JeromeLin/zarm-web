import Markdown from '../components/markdown';
import '../../components/checkbox/style';

export default class Checkbox extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/checkbox.md');
  }
}
