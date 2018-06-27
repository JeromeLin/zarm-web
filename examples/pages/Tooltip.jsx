import Markdown from '../components/markdown';
import '../../components/Tooltip/style';

export default class Tooltip extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/tooltip.md');
  }
}
