import Markdown from '../components/markdown';
import CollapseTransition from '../../components/utils/collapseTransition'
import '../../components/button/style';
import '../../components/icon/style';
import '../../components/transition/style';
import '../../components/grid/style';

export default class Transition extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/transition.md');
  }
}

