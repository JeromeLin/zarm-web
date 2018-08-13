import Markdown from '../components/markdown';
import '../../components/input/style';

export default class Input extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/input.md');
  }
}
