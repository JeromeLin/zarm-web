import Markdown from '../components/markdown';
import '../../components/mask/style';
import '../../components/button/style';

export default class Mask extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/mask.md');
  }
}
