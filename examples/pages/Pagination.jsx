import Markdown from '../components/markdown';
import '../../components/Pagination/style';
import '../../components/Select/style';

export default class Pagination extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/pagination.md');
  }
}
