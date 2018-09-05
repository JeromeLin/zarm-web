import Markdown from '../components/markdown';
import '../../components/step/style';

export default class Step extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/step.md');
  }
}
