import Markdown from '../components/markdown';
import '../../components/datePicker/style';

export default class DatePicker extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/datepicker.md');
  }
}
