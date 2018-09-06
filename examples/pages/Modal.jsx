import Markdown from '../components/markdown';
import '../../components/modal/style';
import '../../components/button/style';

export default class Modal extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/modal.md');
  }
}
