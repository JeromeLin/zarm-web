import Markdown from '../components/markdown';
import '../../components/menu/style';

export default class Menu extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/menu.md');
  }
}
