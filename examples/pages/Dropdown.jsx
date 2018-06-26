import Markdown from '../components/markdown';
import '../../components/Dropdown/style';
import '../../components/Button/style';
import '../../components/Menu/style';
import '../../components/Checkbox/style';

export default class Dropdown extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/dropdown.md');
  }
}

