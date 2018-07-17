import Markdown from '../components/markdown';
import '../../components/NumberInput/style';
import '../../components/Icon/style';

export default class NumberInput extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/numberinput.md');
  }
}

