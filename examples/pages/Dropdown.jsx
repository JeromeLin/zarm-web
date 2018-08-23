import Markdown from '../components/markdown';
import '../../components/menu/style';
import '../../components/dropdown/style';
import '../../components/button/style';
import '../../components/checkbox/style';

export default class Dropdown extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/dropdown.md');
  }
}

