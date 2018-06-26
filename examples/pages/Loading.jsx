import Markdown from '../components/markdown';
import '../../components/Button/style';
import '../../components/Loading/style';

export default class Loading extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/loading.md');
  }
}
