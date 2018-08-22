import Markdown from '../components/markdown';
import '../../components/checkbox/style';
import '../../components/tree/style';
import Checkbox from '../../components/checkbox';

export default class Mask extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/Tree.md');
  }
}
