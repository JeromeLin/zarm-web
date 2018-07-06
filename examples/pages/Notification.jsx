import Markdown from '../components/markdown';
import '../../components/Notification/style';
import '../../components/Button/style';
import '../../components/Icon/style';

export default class Notification extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/notification.md');
  }
}

