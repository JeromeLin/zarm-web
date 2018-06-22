import Markdown from '../components/markdown';
import '../../components/Panel/style';

export default class Panel extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/panel.md');
  }
}