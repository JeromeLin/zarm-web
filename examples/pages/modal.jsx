import Markdown from '../components/markdown';
import '../../components/Modal/style';
import '../../components/Button/style';


export default class Modal extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/modal.md');
  }
}
