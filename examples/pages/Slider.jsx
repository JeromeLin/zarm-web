import Markdown from '../components/markdown';
import '../../components/slider/style';

export default class Slider extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/slider.md');
  }
}
