import Markdown from '../components/markdown';
import '../../components/confirm/style';
import '../../components/button/style';

export default class Confirm extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/confirm.md');
  }
}
