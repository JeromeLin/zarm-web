import Markdown from '../components/markdown';
import '../../components/checkbox/style';
import '../../components/tree/style/index';
import Checkbox from '../../components/checkbox'; // eslint-disable-line

export default class Mask extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/tree.md');
  }
}
