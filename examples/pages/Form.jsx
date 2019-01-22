import Markdown from '../components/markdown';
import '../../components/form/style';
import '../../components/select/style';
import '../../components/input/style';
import '../../components/button/style';

export default class Form extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/form.md');
  }
}

