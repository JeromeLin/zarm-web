import Markdown from '../components/markdown';
import '../../components/numberInput/style';
import '../../components/icon/style';

export default class NumberInput extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/numberinput.md');
  }
}

