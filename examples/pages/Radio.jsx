import Markdown from '../components/markdown';
import '../../components/radio/style';

export default class Radio extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/radio.md');
  }
}
