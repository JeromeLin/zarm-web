import Markdown from '../components/markdown';
import '../../components/Upload/style';
import '../../components/Button/style';

export default class Alert extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/upload.md');
  }
}
