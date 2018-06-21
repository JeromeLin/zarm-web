import Markdown from '../components/markdown';
import '../../components/Slider/style';

export default class Slider extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/slider.md');
  }
}
