import Markdown from '../components/markdown';
import '../../components/Transfer/style';

export default class Transfer extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/transfer.md');
  }
}
