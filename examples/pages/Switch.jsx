import Markdown from '../components/markdown';
import '../../components/Switch/style';

export default class Switch extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/switch.md');
  }
}
