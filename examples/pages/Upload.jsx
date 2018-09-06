import Markdown from '../components/markdown';
import '../../components/upload/style';
import '../../components/button/style';

export default class Alert extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/upload.md');
  }
}
