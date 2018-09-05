import Markdown from '../components/markdown';
import '../../components/popover/style';
import '../../components/button/style';

export default class Popover extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/popover.md');
  }
}
