import Markdown from '../components/markdown';
import '../../components/notification/style';
import '../../components/button/style';
import '../../components/icon/style';

export default class Notification extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/notification.md');
  }
}

