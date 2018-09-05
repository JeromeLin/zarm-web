import Markdown from '../components/markdown';
import '../../components/button/style';
import '../../components/icon/style';

export default class Button extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/button.md');
  }
}
