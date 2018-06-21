import Markdown from '../components/markdown';
import '../../components/Message/style';
import '../../components/Button/style';

export default class Message extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/message.md');
  }
}
