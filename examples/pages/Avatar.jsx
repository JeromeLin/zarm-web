import Markdown from '../components/markdown';
import '../../components/avatar/style';

export default class Avatar extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/avatar.md');
  }
}
