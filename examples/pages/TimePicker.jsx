import Markdown from '../components/markdown';
import '../../components/form/style';
import '../../components/time-picker/style';

export default class TimePicker extends Markdown {
  // eslint-disable-next-line
  document () {
    return require('../docs/timepicker.md');
  }
}
