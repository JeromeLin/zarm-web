import Markdown from '../components/markdown';
import '../../components/Mask/style';
import '../../components/Button/style';


export default class Mask extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/mask.md');
  }
}
