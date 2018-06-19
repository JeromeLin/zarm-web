import Markdown from '../components/markdown';
import '../../components/Button/style';
import '../../components/Icon/style';

export default class Button extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/button.md');
  }
}
