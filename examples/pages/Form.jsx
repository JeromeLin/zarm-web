import Markdown from '../components/markdown';
import '../../components/form/style';
import '../../components/input/style';

export default class Form extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/form.md');
  }
}

