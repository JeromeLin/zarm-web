import Markdown from '../components/markdown';
import '../../components/menu/style';
import '../../components/icon/style';
import '../../components/button/style';
import '../../components/tooltip/style';

export default class Menu extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/menu.md');
  }
}
