import Markdown from '../components/markdown';
import '../../components/Confirm/style';
import '../../components/Button/style';

export default class Confirm extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/confirm.md');
  }
}
