import Markdown from '../components/markdown';
import '../../components/pagination/style';
import '../../components/select/style';

export default class Pagination extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/pagination.md');
  }
}
