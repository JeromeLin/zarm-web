import Markdown from '../components/markdown';
import '../../components/message/style';
import '../../components/button/style';

export default class Message extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/message.md');
  }
}
