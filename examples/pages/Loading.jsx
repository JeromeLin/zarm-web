import Markdown from '../components/markdown';
import '../../components/button/style';
import '../../components/loading/style';

export default class Loading extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/loading.md');
  }
}
