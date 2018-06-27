import Markdown from '../components/markdown';
import '../../components/Form/style';
import '../../components/Input/style';

export default class Form extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/form.md');
  }
}

