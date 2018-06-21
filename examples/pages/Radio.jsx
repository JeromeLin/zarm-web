import Markdown from '../components/markdown';
import '../../components/Radio/style';

export default class Radio extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/radio.md');
  }
}
