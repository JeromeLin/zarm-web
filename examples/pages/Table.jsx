import Markdown from '../components/markdown';
import '../../components/table/style';
import '../../components/select/style';
import '../../components/input/style';
import '../../components/switch/style';
import '../../components/popover/style';

export default class Table extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/table.md');
  }
}
