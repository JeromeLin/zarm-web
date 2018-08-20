import Markdown from '../components/markdown';
import '../../components/breadcrumb/style';

export default class Breadcrumb extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/breadcrumb.md');
  }
}
