import Markdown from '../components/markdown';
import '../../components/grid/style';
import '../styles/pages/grid.scss';

export default class Grid extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/grid.md');
  }
}

