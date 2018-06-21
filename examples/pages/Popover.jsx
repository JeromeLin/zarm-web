import Markdown from '../components/markdown';
import '../../components/Popover/style';
import '../../components/Button/style';

export default class Popover extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/popover.md');
  }
}
